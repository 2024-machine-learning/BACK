package ewha._4.machineLearning.SongProject.domain.ai.controller;

import ewha._4.machineLearning.SongProject.domain.ai.dto.AIRequestDto;
import ewha._4.machineLearning.SongProject.domain.ai.service.AIService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ai")
@RequiredArgsConstructor
public class AIController {
    private final AIService aiService;

    @GetMapping
    public ResponseEntity getMusicSuggestion(@RequestBody AIRequestDto requestDto){
        return aiService.getMusicSeggestion(requestDto);
    }
}
