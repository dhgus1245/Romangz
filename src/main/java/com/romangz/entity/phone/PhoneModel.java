package com.romangz.entity.phone;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "phone_model")
public class PhoneModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pm_idx")
    private Integer idx;

    @Column(name = "pm_model", length = 100, nullable = false)
    private String model;

    @Column(name = "pm_model_ko", length = 100, nullable = false)
    private String model_ko;

    @Column(name = "pm_serise", length = 20)
    private String serise;

    @Column(name = "pm_gen")
    private String gen;

    @Column(name = "pm_tier")
    private String tier;

    @Column(name = "pm_img", length = 100)
    private String img;

    //기본생성자
    public PhoneModel() {}
    
    //생성자
    public PhoneModel(String serise, Integer idx, String model, String model_ko, String gen, String tier, String img, String reg_dt) {
        this.serise = serise;
        this.idx = idx;
        this.model = model;
        this.model_ko = model_ko;
        this.gen = gen;
        this.tier = tier;
        this.img = img;
    }
}
