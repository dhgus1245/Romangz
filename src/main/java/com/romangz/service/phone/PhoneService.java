package com.romangz.service.phone;

import com.romangz.entity.phone.EstimatedPhone;
import com.romangz.entity.phone.PbtiTest;
import com.romangz.repository.phone.EstimatedPhoneRepository;
import com.romangz.repository.phone.PbtiTestRepository;
import com.romangz.repository.phone.PhoneModelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

@Service
public class PhoneService {

    @Autowired
    private PbtiTestRepository pbtiTestRepository;
    @Autowired
    private PhoneModelRepository phoneModelRepository;
    @Autowired
    private EstimatedPhoneRepository estimatedPhoneRepository;

    //휴대폰 견적 분석 - 기기정보
    public List<Object[]> getEstimanteMenuInfo(String key, String value) {
        List<Object[]> result = new ArrayList<>();
        if (Objects.equals(key, "company")){
            result = phoneModelRepository.getEstiamteMenuCompany();
        }else if(Objects.equals(key, "series")){
            result = phoneModelRepository.getEstiamteMenuSeries(Short.parseShort(value));
        }else if(Objects.equals(key, "model")){
            result = phoneModelRepository.getEstiamteMenuModel(value);
        }else if(Objects.equals(key, "volume")){
            result = phoneModelRepository.getEstiamteMenuVolume(Integer.parseInt(value));
        }
        return result;
    }

    //pbti
    public Map<String, Object> getPbtiResult(String pcode) {
        Map<String, Object> resultMap = new HashMap<>();
        Optional<PbtiTest> pbtiObj = pbtiTestRepository.findFirstByCodeContaining(pcode);

        if (pbtiObj.isPresent()) {
            PbtiTest pbti = pbtiObj.get();
            String idxStr = pbti.getIdx_str();

            List<Object[]> resultModel = pbtiTestRepository.getPbtiPhoneByRaw(idxStr);
            resultMap.put("pbti", pbti);
            resultMap.put("resultModel", resultModel);
        } else {
            // 없을 경우 빈 데이터 또는 에러 메시지 등을 넣을 수 있음
            resultMap.put("pbti", null);
            resultMap.put("resultModel", Collections.emptyList());
        }

        return resultMap;
    }

    public void insertEstimatedPhone(Map<String, Object> data){
        //System.out.println("이 지옥에서 꺼내줘 : " + data);
        EstimatedPhone phone = new EstimatedPhone();

        // model
        Object modelObj = data.get("model");
        int modelInt = 0;
        if (modelObj instanceof Integer) {
            modelInt = (Integer) modelObj;
        } else if (modelObj instanceof String) {
            modelInt = Integer.parseInt((String) modelObj);
        } else {
            throw new IllegalArgumentException("model 값이 올바르지 않습니다.");
        }
        phone.setEpPmIdx(modelInt);
        phone.setEpGradeFront(data.get("front").toString());
        phone.setEpGradeBack(data.get("back").toString());
        phone.setEpGrade(data.get("grade").toString());
        phone.setEpVolume(data.get("volume").toString());
        phone.setEpImgFront(data.get("frontImg").toString());
        phone.setEpImgback(data.get("backImg").toString());

        // price 처리
        Map<String, Object> priceMap = (Map<String, Object>) data.get("price");
        if(priceMap != null && priceMap.get("avg") != null){
            double avgPrice = 0.0;
            Object avgObj = priceMap.get("avg");
            if(avgObj instanceof Double){
                avgPrice = (Double) avgObj;
            } else if(avgObj instanceof String){
                avgPrice = Double.parseDouble((String) avgObj);
            }
            phone.setEpPrice(BigDecimal.valueOf(avgPrice));
        } else {
            phone.setEpPrice(BigDecimal.ZERO);
        }
        estimatedPhoneRepository.save(phone);
    }

    public Map<String, Object> getModelPriceAvg(String model, String volume) {
        List<Object[]> list = phoneModelRepository.getModelPriceAvg(Integer.parseInt(model), volume);
        Map<String, Object> modelAvg = new HashMap<>();

        if (list != null && !list.isEmpty()) {
            Object[] row = list.get(0);  // 첫 번째 행만 사용
            // row 배열 인덱스에 맞게 데이터 넣기 (예시)
            modelAvg.put("A", row[0]);
            modelAvg.put("B", row[1]);
            modelAvg.put("C", row[2]);
            modelAvg.put("X", row[3]);
        } else {
            // 결과가 없을 때 기본값 처리 가능
            modelAvg.put("A", null);
            modelAvg.put("B", null);
            modelAvg.put("C", null);
            modelAvg.put("X", null);
        }
        return modelAvg;
    }
}