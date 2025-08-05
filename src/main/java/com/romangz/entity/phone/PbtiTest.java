package com.romangz.entity.phone;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "pbti_test")
public class PbtiTest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pt_code")
    private String code;

    @Column(name = "pt_code_nm")
    private String code_nm;

    @Column(name = "pt_color")
    private String color;

    @Column(name = "pt_img")
    private String img;

    @Column(name = "pt_desc")
    private String desc;

    @Column(name = "pt_phone_str")
    private String phone_str;

    // 기본 생성자
    public PbtiTest() {}

    public PbtiTest(String code, String code_nm, String color, String img, String desc, String phone_str) {
        this.code = code;
        this.code_nm = code_nm;
        this.color = color;
        this.img = img;
        this.desc = desc;
        this.phone_str = phone_str;
    }
}
