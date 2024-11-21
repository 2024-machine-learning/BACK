package ewha._4.machineLearning.SongProject.domain.ai.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import ewha._4.machineLearning.SongProject.domain.ai.dto.AIRequestDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.security.Escape;
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

            /* FastApi 로 전달할 요청 데이터 생성 : json 타입으로 */
            ObjectMapper mapper = new ObjectMapper();
            String requestJson = mapper.writeValueAsString(Map.of("content", requestDto.getNovelContent()));

            /* json 형식으로 요청을 보낼 것임. */
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<String> requestEntity = new HttpEntity<>(requestJson, headers);

            /* fast api 호출 */
            ResponseEntity<String> response = restTemplate.exchange(
                    fastApiUrl, HttpMethod.POST, requestEntity, String.class);

            /* fast api 응답 반환 */
            return ResponseEntity.ok(mapper.readValue(response.getBody(), Object.class));

        } catch (Exception e){

            /* 응답 생성에 실패한 경우, 에러 메시지 반환 */
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "추천 요청 중 문제가 발생했습니다."));

        }
    }
}















