package com.hgicreate.rno.lte.pciafp.model;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class CellToParameter {
    private List<String> cellList;
    private Map<String, double[]> cellToLonLat;
    private Map<String, Integer> cellToOriPci;
    private Map<String, Integer> cellToEarfcn;
    private Map<String, List<String>> enodebToCells;
    private Map<String, String> cell2Enodeb;

    public boolean isEmpty() {
        return cellList == null || cellList.isEmpty();
    }
}
