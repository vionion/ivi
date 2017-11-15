package com.example.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.DataOutputStream;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

@Controller
@RequestMapping(path = "/")
public class MainController {

    public static final String UPLOAD_AUDIO_LINK = "https://mirror-chat.mybluemix.net/api/uploadAudio";

    @RequestMapping(method = RequestMethod.GET)
    public String index() {
        return "index";
    }

    @RequestMapping(method = RequestMethod.POST)
    public @ResponseBody String sendWAV(@RequestBody byte[] wav) throws IOException {
        System.out.println(wav != null);
        URL url = new URL(UPLOAD_AUDIO_LINK);
        HttpURLConnection httpConn = (HttpURLConnection) url.openConnection();
        httpConn.setUseCaches(false);
        httpConn.setDoOutput(true); // indicates POST method
        httpConn.setDoInput(true);

        httpConn.setRequestMethod("POST");
        httpConn.setRequestProperty("Connection", "Keep-Alive");
        httpConn.setRequestProperty("Content-Type", "audio/wav");
        DataOutputStream request = new DataOutputStream(httpConn.getOutputStream());
        request.write(wav);
        request.flush();
        request.close();
        int status = httpConn.getResponseCode();
        if (status == HttpURLConnection.HTTP_OK) {
            httpConn.disconnect();
        }
        return "great!";
    }
}
