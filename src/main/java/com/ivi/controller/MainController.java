package com.ivi.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(path = "/")
public class MainController {

    /**
     * Method to get index page
     */
    @RequestMapping(method = RequestMethod.GET)
    public String index() {
        return "index";
    }


}
