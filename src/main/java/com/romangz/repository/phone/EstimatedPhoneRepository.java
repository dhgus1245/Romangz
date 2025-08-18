package com.romangz.repository.phone;

import com.romangz.entity.phone.EstimatedPhone;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EstimatedPhoneRepository extends JpaRepository<EstimatedPhone, Integer> {
}