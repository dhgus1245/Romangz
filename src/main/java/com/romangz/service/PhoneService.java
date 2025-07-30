package com.romangz.service;

import com.romangz.entity.phone.TradePhone;
import com.romangz.repository.PhoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PhoneService {

    @Autowired
    private PhoneRepository phoneRepository;

    public List<TradePhone> getTradePhoneList(String keyword) {
        return phoneRepository.findByModelContaining(keyword);
    }
}