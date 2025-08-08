package com.romangz.repository.phone;

import com.romangz.entity.phone.PbtiTest;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PbtiTestRepository extends JpaRepository<PbtiTest, Long> {
    Optional<PbtiTest> findFirstByCodeContaining(String pcode);

    @Query(value =
        "SELECT pm_idx, pm_model, pm_model_ko, pm_img " +
        "FROM phone_model " +
        "WHERE POSITION('^' || pm_idx || '^' IN :idxStr) > 0 ",
        nativeQuery = true)
    List<Object[]> getPbtiPhoneByRaw(@Param("idxStr") String idxStr);

}

