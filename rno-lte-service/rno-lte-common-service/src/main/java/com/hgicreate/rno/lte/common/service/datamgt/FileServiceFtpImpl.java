package com.hgicreate.rno.lte.common.service.datamgt;

import com.hgicreate.rno.lte.common.model.datamgt.DataRecordCond;
import com.hgicreate.rno.lte.common.model.datamgt.FileCond;
import com.hgicreate.rno.lte.common.model.datamgt.FileContainer;
import com.hgicreate.rno.lte.common.model.datamgt.FileSaveResult;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.net.ftp.FTPClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.UUID;

@Slf4j
@Service
@ConditionalOnProperty(name = "rno.file-handler", havingValue = "ftp")
public class FileServiceFtpImpl implements FileService {
    @Value("${rno.ftp-host:192.168.6.70}")
    private String host;
    @Value("${rno.ftp-port:21}")
    private int port;
    @Value("${rno.ftp-username:anonymous}")
    private String username;
    @Value("${rno.ftp-password:}")
    private String password;
    @Value("${rno.ftp-dir:/data/test}")
    private String dir;

    @Override
    public FileSaveResult save(long jobId, FileCond<DataRecordCond> fileCond) {
        log.debug("使用ftp方式保存文件，jobId={},fileCond={}", jobId, fileCond);
        FileSaveResult fileSaveResult = new FileSaveResult();
        fileSaveResult.setResult(false);
        FileContainer fileContainer = fileCond.getFileContainer();
        DataRecordCond cond = fileCond.getCond();
        if (null != fileContainer && null != fileContainer.getFileBody() && fileContainer.getFileLength() == fileContainer.getFileBody().length) {
            FTPClient ftpClient = new FTPClient();
            try {
                ftpClient.connect(host, port);
                ftpClient.login(username, password);
//                String realDir = "anonymous".equalsIgnoreCase(username) ? dir : "/home/" + username + "/" + dir;
//                String realDir = Paths.get(dir, cond.getDataType()).toString();
                String realDir = dir + "/" + cond.getDataType();
                ftpClient.changeWorkingDirectory(realDir);
                String filename = "IMPORT-" + jobId + "-" + UUID.randomUUID().toString() + ".tmp";
                log.debug("filename={}", filename);
                boolean bool = ftpClient.storeFile(filename, new ByteArrayInputStream(fileContainer.getFileBody()));

                if (bool) {
                    log.debug("文件保存成功。");
                    fileSaveResult.setResult(true);
                    fileSaveResult.setMsg("文件保存成功。");
                    fileSaveResult.setOriFilename(fileContainer.getFilename());
                    fileSaveResult.setNewFilename(filename);
                    fileSaveResult.setFileSize(fileContainer.getFileLength());
                    String fullPath = "ftp:///" + username + ":" + password + "@" + host + ":" + port + "/" + realDir + "/" + filename;
                    fileSaveResult.setPath(fullPath);
                } else {
                    log.error("文件保存失败。");
                    fileSaveResult.setMsg("文件保存失败。");
                }
            } catch (IOException e) {
                e.printStackTrace();
                fileSaveResult.setMsg("文件保存出错。");
            } finally {
                if (ftpClient.isConnected()) {
                    try {
                        ftpClient.disconnect();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        } else {
            fileSaveResult.setMsg("数据不存在，无法保存。");
        }
        return fileSaveResult;
    }
}
