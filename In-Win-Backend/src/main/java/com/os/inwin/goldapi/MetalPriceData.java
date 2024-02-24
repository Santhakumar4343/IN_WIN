
package com.os.inwin.goldapi;
import com.fasterxml.jackson.annotation.JsonProperty;

public class MetalPriceData {
    
    @JsonProperty("rates")
    private MetalRates rates;

    public MetalRates getRates() {
        return rates;
    }

    public void setRates(MetalRates rates) {
        this.rates = rates;
    }
}
