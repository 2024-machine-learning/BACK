package SongProject.domain.ai.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access =  AccessLevel.PROTECTED)
public class AIRequestDto {
    private String novelTitle;
    private String novelContent;

}
