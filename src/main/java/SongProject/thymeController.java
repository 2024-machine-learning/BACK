package SongProject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class thymeController {
    @GetMapping("/")
    public String home() {
        return "index";
    }
}



