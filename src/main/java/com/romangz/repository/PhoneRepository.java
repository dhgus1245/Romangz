package com.romangz.repository;

import com.romangz.entity.phone.TradePhone;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PhoneRepository extends JpaRepository<TradePhone, Long> {
    List<TradePhone> findByModelContaining(String keyword);

    /*쿼리쓸거면 이렇게~
    @Query("SELECT t FROM TradePhone t WHERE t.model LIKE %:keyword%")
    List<TradePhone> getTradePhoneList(@Param("keyword") String keyword);
     */
}
