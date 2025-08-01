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

    public Map<String, Object> sendPathsToFlask(String frontPath, String backPath) {
        String flaskUrl = "http://192.168.16.1:5000/phone/api/grade";

        Map<String, String> payload = Map.of(
                "front", frontPath,
                "back", backPath
        );

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

