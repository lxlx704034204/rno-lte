package com.hgicreate.rno.lte.web.client.datamgt;

import com.hgicreate.rno.lte.web.model.PageCondBody;
import com.hgicreate.rno.lte.web.model.PageResultBody;
import com.hgicreate.rno.lte.web.model.datamgt.DataRecordCond;
import com.hgicreate.rno.lte.web.model.datamgt.FileCond;
import com.hgicreate.rno.lte.web.model.datamgt.FileSaveResult;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@FeignClient(name = "${rno.lte.service.common:rno-lte-common-service}", fallback = DataMgtRestClientFallback.class, path = "/dataMgt")
public interface DataMgtRestClient {
    /**
     * 查询数据记录
     */
    @RequestMapping(value = "/queryDataRecord", method = POST)
    PageResultBody queryDataRecord(@RequestBody PageCondBody<DataRecordCond> condBody);

    /**
     * 导入文件
     */
    @RequestMapping(value = "/importFile", method = POST)
    FileSaveResult importFile(@RequestBody FileCond<DataRecordCond> fileCond);
}
