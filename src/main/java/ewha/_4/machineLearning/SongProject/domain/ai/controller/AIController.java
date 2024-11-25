package ewha._4.machineLearning.SongProject.domain.ai.controller;

import ewha._4.machineLearning.SongProject.domain.ai.dto.AIRequestDto;
import ewha._4.machineLearning.SongProject.domain.ai.service.AIService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ai/song")
@RequiredArgsConstructor
public class AIController {
    private final AIService aiService;

    @PostMapping
    public ResponseEntity getMusicSuggestion(@RequestBody AIRequestDto requestDto){
        return aiService.getMusicSeggestion(requestDto);
    }
}

