package ewha._4.machineLearning.SongProject.domain.ai.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class AIResponseDto {
    private String title;
    private String artist;

    public static AIResponseDto of(String title, String artist){
        return AIResponseDto.builder()
                .title(title)
                .artist(artist)
                .build();
    }


}
