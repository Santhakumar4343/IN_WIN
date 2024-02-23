package com.os.inwin.goldapi;


import com.fasterxml.jackson.annotation.JsonProperty;

public class MetalPriceData {
    
    @JsonProperty("gold")
    private Metal gold;

    public Metal getGold() {
        return gold;
    }

    public void setGold(Metal gold) {
        this.gold = gold;
    }
}

