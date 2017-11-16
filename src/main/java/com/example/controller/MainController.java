package com.example.controller;


import org.apache.commons.compress.utils.IOUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
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
    public @ResponseBody void sendWAV(@RequestBody byte[] wav, HttpServletResponse servletResponse) throws IOException {
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
            InputStream responseStream = new BufferedInputStream(httpConn.getInputStream());
            byte[] bytes = getByteArrayFromInputStream(responseStream);
            IOUtils.copy(new ByteArrayInputStream(bytes), servletResponse.getOutputStream());
            servletResponse.flushBuffer();
        }
    }

    private static byte[] getByteArrayFromInputStream(InputStream is) throws IOException {
        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        int nRead;
        byte[] data = new byte[16384];
        while ((nRead = is.read(data, 0, data.length)) != -1) {
            buffer.write(data, 0, nRead);
        }
        buffer.flush();
        return buffer.toByteArray();
    }
}
