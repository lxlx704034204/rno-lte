package com.hgicreate.rno.lte.common.service.datamgt;

import com.hgicreate.rno.lte.common.model.datamgt.DataRecordCond;
import com.hgicreate.rno.lte.common.model.datamgt.FileCond;
import com.hgicreate.rno.lte.common.model.datamgt.FileContainer;
import com.hgicreate.rno.lte.common.model.datamgt.FileSaveResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

@Slf4j
@Service
@ConditionalOnProperty(name = "rno.file-handler", havingValue = "local")
public class FileServiceLocalImpl implements FileService {
    @Value("${rno.file-dir-local:tmp/import}")
    private String fileDir;

    @Override
    public FileSaveResult save(long jobId, FileCond<DataRecordCond> fileCond) {
        log.debug("使用本地方式保存文件，jobId={},fileCond={}", jobId, fileCond);
        FileSaveResult fileSaveResult = new FileSaveResult();
        FileContainer fileContainer = fileCond.getFileContainer();
        if (null != fileContainer && null != fileContainer.getFileBody() && fileContainer.getFileLength() == fileContainer.getFileBody().length) {
            try {
                Files.createDirectories(Paths.get(fileDir));
                Path filePath = Files.createTempFile(Paths.get(fileDir), "import-" + jobId + "-", ".tmp");
                filePath = Files.write(filePath, fileContainer.getFileBody(), StandardOpenOption.TRUNCATE_EXISTING);
                fileSaveResult.setResult(true);
                fileSaveResult.setMsg("文件保存成功。");
                fileSaveResult.setOriFilename(fileContainer.getFilename());
                fileSaveResult.setNewFilename(filePath.getFileName().toString());
                fileSaveResult.setFileSize(fileContainer.getFileLength());
                fileSaveResult.setPath(filePath.toString());
            } catch (Exception e) {
                e.printStackTrace();
                fileSaveResult.setMsg("文件保存出错。");
            }
        } else {
            fileSaveResult.setMsg("数据不存在，无法保存。");
        }
        return fileSaveResult;
    }
}
