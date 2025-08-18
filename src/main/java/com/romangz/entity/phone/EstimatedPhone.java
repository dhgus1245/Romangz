package com.romangz.entity.phone;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@Table(name = "estimated_phone")
public class EstimatedPhone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // PostgreSQL SERIAL 자동증가용
    @Column(name = "ep_idx")
    private Integer epIdx;

    @Column(name = "ep_pm_idx")
    private Integer epPmIdx;

    @Column(name = "ep_grade_front", length = 1)
    private String epGradeFront;

    @Column(name = "ep_grade_back", length = 1)
    private String epGradeBack;

    @Column(name = "ep_grade", length = 1)
    private String epGrade;

    @Column(name = "ep_volume", length = 10)
    private String epVolume;

    @Column(name = "ep_price")
    private java.math.BigDecimal epPrice;

    @Column(name = "ep_img_front", length = 200)
    private String epImgFront;

    @Column(name = "ep_img_back", length = 200)
    private String epImgback;

    @Column(name = "ep_reg_dt", insertable = false, updatable = false)
    private LocalDateTime epRegDt;

    // 기본 생성자
    public EstimatedPhone() {}

    public EstimatedPhone(String epGradeFront, Integer epIdx, Integer epPmIdx, String epGradeBack, String epGrade, String epVolume, BigDecimal epPrice, String epImgFront, String epImgback, LocalDateTime epRegDt) {
        this.epGradeFront = epGradeFront;
        this.epIdx = epIdx;
        this.epPmIdx = epPmIdx;
        this.epGradeBack = epGradeBack;
        this.epGrade = epGrade;
        this.epVolume = epVolume;
        this.epPrice = epPrice;
        this.epImgFront = epImgFront;
        this.epImgback = epImgback;
        this.epRegDt = epRegDt;
    }
}
