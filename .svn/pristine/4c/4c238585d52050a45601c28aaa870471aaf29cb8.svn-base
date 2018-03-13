package com.hgicreate.rno.lte.intermatrix.service;


import com.hgicreate.rno.lte.intermatrix.client.InterMatrixTaskRestClient;
import com.hgicreate.rno.lte.intermatrix.model.InterMatrixTask;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class InterMatrixTaskRestServiceImpl implements InterMatrixTaskRestService {

    private final InterMatrixTaskRestClient interMatrixTaskRestClient;

    public InterMatrixTaskRestServiceImpl(InterMatrixTaskRestClient interMatrixTaskRestClient) {
        this.interMatrixTaskRestClient = interMatrixTaskRestClient;
    }

    @Override
    public void updateOwnProgress(long jobId, String jobStatus) {
        interMatrixTaskRestClient.updateTaskStatus(jobId, jobStatus);
    }

    @Override
    public InterMatrixTask queryTaskRecordByJobId(long jobId) {
        return interMatrixTaskRestClient.queryTaskRecordByJobId(jobId);
    }
}
