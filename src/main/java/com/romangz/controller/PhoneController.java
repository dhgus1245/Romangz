package com.romangz.controller;

import com.romangz.service.phone.FlaskClientService;
import com.romangz.service.phone.ImageStorageService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.romangz.service.phone.PhoneService;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"localhost:8080", "localhost:3000"})
@Controller
@RequestMapping("/phone")
public class PhoneController {

    @Autowired
    private PhoneService phoneService;

    @Autowired
    private FlaskClientService flaskClientService ;

    @GetMapping
    public String forwardPhoneRoot() {
        return "forward:/index.html";
    }

    @GetMapping("/{path:[^.]*}")
    public String forwardReactRoutes() {
        return "forward:/index.html";
    }

    @GetMapping("/estimate_menu")
    public ResponseEntity<List<Object[]>> getEstimanteInfo(@RequestParam String key, @RequestParam String value) {
        List<Object[]> result = phoneService.getEstimanteMenuInfo(key, value);
        return ResponseEntity.ok(result);
    }


    @GetMapping ("/pbti")
    public ResponseEntity<Map<String, Object>> getPbti(@RequestParam String pcode) {
        Map<String, Object> result = phoneService.getPbtiResult(pcode);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/estimate")
    public ResponseEntity<Map<String, Object>> analyzePhone(
            @RequestParam("frontImage") MultipartFile frontImage,
            @RequestParam("backImage") MultipartFile backImage,
            @RequestParam("model") String model,
            @RequestParam("volume") String volume
    ) throws IOException {

        //이미지 저장
        ImageStorageService phoneImgStorageService = new ImageStorageService();
        String frontPath = phoneImgStorageService.saveImage(frontImage, "front");
        String backPath = phoneImgStorageService.saveImage(backImage, "end");
        //json에 수납
        Map<String, String> flaskJson = new HashMap<>();
        flaskJson.put("frontPath", frontPath);
        flaskJson.put("backPath", backPath);
        flaskJson.put("model", model);
        flaskJson.put("volume", volume);

        //플라스크로 이미지 전송
        Map<String, Object> result = flaskClientService.sendPathsToFlask(flaskJson);
        result.put("frontImg", frontPath);
        result.put("backImg", backPath);

        //결과를 받았을 경우에만 데이터 INSERT
        if(result.get("result").equals("succ")){
            //결과 데이터 insert
            phoneService.insertEstimatedPhone(result);

            //해당 모델의 평균 값 가져오기
            Map<String, Object> modelAvg = phoneService.getModelPriceAvg(model, volume);
            result.put("modelAvg",modelAvg);
        }

        return ResponseEntity.ok(result);
    }

}
