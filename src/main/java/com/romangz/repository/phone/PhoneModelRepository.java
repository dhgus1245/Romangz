package com.romangz.repository.phone;

import com.romangz.entity.phone.PhoneModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PhoneModelRepository extends JpaRepository<PhoneModel, Long> {

    //휴대폰 분석 메뉴 - 제조사
    @Query(value =
        "SELECT pc_idx as idx, pc_name_ko as company " +
        "FROM prod_company", nativeQuery = true)
    List<Object[]> getEstiamteMenuCompany();

    //휴대폰 분석 메뉴 - 시리즈
    @Query(value =
            "SELECT (ROW_NUMBER() OVER()) AS rownum, pm_serise " +
            "FROM phone_model WHERE pm_com_idx = :value " +
            "GROUP BY pm_serise " +
            "ORDER BY COUNT(pm_serise) DESC ", nativeQuery = true)
    List<Object[]> getEstiamteMenuSeries(@Param("value") int value);

    //휴대폰 분석 메뉴 - 모델
    @Query(value =
        "SELECT pm_idx as idx, pm_model_ko as model " +
        "FROM phone_model WHERE pm_serise = :value ORDER BY pm_reg_dt DESC", nativeQuery = true)
    List<Object[]> getEstiamteMenuModel(@Param("value") String value);

    //휴대폰 분석 메뉴 - 용량
    @Query(value =
        "SELECT pmd_volume " +
        "FROM phone_model_dtl WHERE pmd_idx = :value ORDER BY pmd_price ASC", nativeQuery = true)
    List<Object[]> getEstiamteMenuVolume(@Param("value") int value);
}

