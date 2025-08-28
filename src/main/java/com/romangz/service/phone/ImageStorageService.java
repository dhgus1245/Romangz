package com.romangz.service.phone;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.time.Year;
import java.util.UUID;

@Service
public class ImageStorageService {

    private static final String BASE_DIR = "/app/data/images/estimate";

    public String saveImage(MultipartFile file, String type) throws IOException {
        // type은 "front" 또는 "end"
        if (!type.equals("front") && !type.equals("end")) {
            throw new IllegalArgumentException("지원하지 않는 이미지 타입입니다.");
        }

        // 현재 연도
        String year = String.valueOf(Year.now().getValue());

        // 디렉토리 경로 생성
        String dirPath = Paths.get(BASE_DIR, year, type).toString();

        File dir = new File(dirPath);
        if (!dir.exists()) {
            boolean created = dir.mkdirs();
            if (!created) {
                throw new IOException("디렉토리 생성 실패: " + dirPath);
            }
        }

        // 파일 이름 생성 (UUID로 유일하게)
        String extension = getFileExtension(file.getOriginalFilename());
        String filename = UUID.randomUUID().toString() + extension;
        File savedFile = new File(dir, filename);

        // 파일 저장
        file.transferTo(savedFile);

        // 반환 경로 (예: /analyze/2025/front/uuid.jpg)
        return "/estimate/" + year + "/" + type + "/" + filename;
    }

    // 파일 확장자 추출
    private String getFileExtension(String originalFilename) {
        if (originalFilename == null || !originalFilename.contains(".")) {
            return ".jpg"; // 기본 확장자
        }
        return originalFilename.substring(originalFilename.lastIndexOf("."));
    }
}
