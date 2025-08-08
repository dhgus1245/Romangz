package com.romangz.service.phone;

import com.romangz.entity.phone.PbtiTest;
import com.romangz.entity.phone.TradePhone;
import com.romangz.repository.phone.PbtiTestRepository;
import com.romangz.repository.phone.PhoneModelRepository;
import com.romangz.repository.phone.TradePhoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PhoneService {

    @Autowired
    private TradePhoneRepository tradephoneRepository;
    @Autowired
    private PbtiTestRepository pbtiTestRepository;
    @Autowired
    private PhoneModelRepository phoneModelRepository;

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

    //거래된 폰 정보
    public List<TradePhone> getTradePhoneList(String keyword) {
        return tradephoneRepository.findByModelContaining(keyword);
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
}