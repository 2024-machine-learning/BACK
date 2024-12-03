package SongProject.domain.ai.service;

import SongProject.domain.ai.dto.AIRequestDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class AIService {
    private final RestTemplate restTemplate = new RestTemplate();
    private final String fastApiUrl = "http://localhost:8000/recommend";


    /*노래 추천 결과 반환 */
    public ResponseEntity getMusicSeggestion(AIRequestDto requestDto) {
        try {

            /* fast api 호출 */
            ResponseEntity<String> response = restTemplate.postForEntity(fastApiUrl, requestDto, String.class);

            /* fast api 응답 반환 */
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(response.getBody());

        } catch (Exception e){

            /* 응답 생성에 실패한 경우, 에러 메시지 반환 */
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "추천 요청 중 문제가 발생했습니다."));

        }
    }
}















