package com.romangz.repository.phone;

import com.romangz.entity.phone.PhoneModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PhoneModelRepository extends JpaRepository<PhoneModel, Long> {

    //pbti 결과 가져오기
    @Query(value =
            "SELECT PT_CODE AS code, PT_CODE_NM AS code_nm, PT_DESC AS desc, PT_PHONE_STR AS phone_str " +
            "FROM pbti_test WHERE PT_CODE = :pcode",
            nativeQuery = true)
    Object[] getPbtiByRaw(@Param("pcode") String pcode);

    @Query(value =
            "SELECT *" +
            "FROM ( " +
            "   SELECT pl_name, pl_name_ko, min(pl_price) as min_prc, max(pl_price) as max_prc, min(pl_reg_dt) " +
            "   FROM phone_list " +
            "   WHERE pl_name LIKE CONCAT('%', :phone_str, '%') " +
            "   GROUP BY pl_name, pl_name_ko " +
            " ) PHONE LIMIT 3", nativeQuery = true)
    List<Object[]> getPbtiPhoneByRaw(@Param("phone_str") String phone_str);
}

