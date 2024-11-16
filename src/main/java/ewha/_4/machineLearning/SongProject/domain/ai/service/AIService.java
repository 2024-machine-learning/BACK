package ewha._4.machineLearning.SongProject.domain.ai.service;

import ewha._4.machineLearning.SongProject.domain.ai.dto.AIRequestDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class AIService {


    /*노래 추천 결과 반환 */
    public ResponseEntity getMusicSeggestion(AIRequestDto requestDto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("노래 결과");
    }
}
