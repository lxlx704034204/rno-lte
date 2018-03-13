package com.hgicreate.rno.lte.web.tool;

import com.hgicreate.rno.lte.web.model.Page;
import com.hgicreate.rno.lte.web.model.PageResultBody;
import com.hgicreate.rno.lte.web.model.SubmitResult;
import com.hgicreate.rno.lte.web.model.datamgt.FileResult;
import com.hgicreate.rno.lte.web.model.datamgt.FileSaveResult;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;

public class ClientTool {
    public static PageResultBody emptyResultBody(Page page, String msg) {
        PageResultBody resultBody = new PageResultBody();
        resultBody.setResult("fail");
        resultBody.setMsg(msg);
        resultBody.setPage(page);
        resultBody.setData(new ArrayList<>());
        return resultBody;
    }

    public static SubmitResult submitTaskFail(String msg) {
        SubmitResult submitResult = new SubmitResult();
        submitResult.setFlag(false);
        submitResult.setResult(msg);
        return submitResult;
    }

    public static FileResult downloadFileFail(String msg) {
        FileResult fileResult = new FileResult();
        fileResult.setResult(false);
        fileResult.setMsg(msg);
        fileResult.setStatusCode(HttpStatus.BAD_GATEWAY.value());
        return fileResult;
    }

    public static FileSaveResult saveFileFail(String msg) {
        FileSaveResult fileSaveResult = new FileSaveResult();
        fileSaveResult.setResult(false);
        fileSaveResult.setMsg(msg);
        return fileSaveResult;
    }
}
