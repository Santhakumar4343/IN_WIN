package com.os.inwin.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.os.inwin.entity.AlphaVantageResponse;

@Service
public class StockMarketApiService {
    @Autowired
    private RestTemplate restTemplate;
    private static final String BASE_URL = "https://www.alphavantage.co";
    private static final String API_KEY = "8KDJJO5RROTYI7A"; 

    public double getCurrentPrice(String symbol) {
        String apiUrl = BASE_URL + "/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey=" + API_KEY;
        AlphaVantageResponse response = restTemplate.getForObject(apiUrl, AlphaVantageResponse.class);
        if (response != null && response.getGlobalQuote() != null) {
            return response.getGlobalQuote().getPrice();
        } else {
            return 0.0;
        }
    }
}

