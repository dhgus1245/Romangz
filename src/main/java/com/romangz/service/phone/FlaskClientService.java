package com.romangz.service.phone;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.HashMap;
import java.util.Map;

@Service
public class FlaskClientService {

    private final RestTemplate restTemplate = new RestTemplate();

    public Map<String, Object> sendPathsToFlask(Map<String, String> flaskJson) {
        String flaskUrl = "http://192.168.16.1:5000/phone/api/grade";

        // 모든 값 포함해서 payload 생성
        Map<String, String> payload = new HashMap<>();
        payload.put("front_path", flaskJson.get("frontPath"));
        payload.put("back_path", flaskJson.get("backPath"));
        payload.put("model", flaskJson.get("model"));
        payload.put("volume", flaskJson.get("volume"));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, String>> request = new HttpEntity<>(payload, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(flaskUrl, request, String.class);

        try {
            // JSON 문자열 → Map으로 변환
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(response.getBody(), HashMap.class);
        } catch (Exception e) {
            e.printStackTrace();
            return Map.of("error", "파싱 실패");
        }
    }
}
