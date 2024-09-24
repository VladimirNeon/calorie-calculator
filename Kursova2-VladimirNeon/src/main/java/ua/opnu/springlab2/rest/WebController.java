package ua.opnu.springlab2.rest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller

public class WebController {
    @GetMapping("/login")
    public String loginPage(){
        return "login.html";
    }
    @GetMapping("/register")
    public String registerPage(){
        return "register.html";
    }
    @GetMapping("/index")
    public String indexPage(){
        return "main.html";
    }
}
