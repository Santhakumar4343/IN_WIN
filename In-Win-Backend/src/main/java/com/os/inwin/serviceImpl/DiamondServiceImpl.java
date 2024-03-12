package com.os.inwin.serviceImpl;



import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.os.inwin.entity.Diamond;
import com.os.inwin.repository.DiamondRepository;
import com.os.inwin.service.DiamondService;

import jakarta.transaction.Transactional;

@Service
public class DiamondServiceImpl implements DiamondService {

	@Autowired
	private DiamondRepository diamondRepository;

	@Override
	public List<Diamond> getAllDiamonds() {
		return diamondRepository.findAll();
	}

	@Override
	public Diamond saveDiamond(Diamond diamond) {
		diamond.setLastUpdateDate(LocalDate.now());
		return diamondRepository.save(diamond);
	}

	@Override
	public List<Diamond> getDiamondByUserName(String userName) {
		return diamondRepository.findByUserName(userName);
	}

	@Override
	public Diamond updateDiamond(Long id, Diamond diamond) {

		Optional<Diamond> optionalDiamond = diamondRepository.findById(id);
		if (optionalDiamond.isPresent()) {
			Diamond existingDiamond = optionalDiamond.get();
			existingDiamond.setName(diamond.getName());
			existingDiamond.setCarat(diamond.getCarat());
			existingDiamond.setQuantity(diamond.getQuantity());
			existingDiamond.setBuyDate(diamond.getBuyDate());
			existingDiamond.setPurchasePrice(diamond.getPurchasePrice());
			existingDiamond.setShape(diamond.getShape());
			existingDiamond.setLastUpdateDate(LocalDate.now());
			return diamondRepository.save(existingDiamond);
		}
		return null;
	}

	@Override
	public boolean deleteDiamond(long id) {
		Optional<Diamond> optionalDiamond = diamondRepository.findById(id);
		if (optionalDiamond.isPresent()) {
			diamondRepository.deleteById(id);
			return true;
		} else {
			return false;
		}
	}


	
	
	
	
	
	
	public void updateDiamondPrices() {
	    // Define the section headers and their associated shapes
	    Map<String, String> sectionToShapeMapping = new HashMap<>();
	    sectionToShapeMapping.put("Round Diamonds", "Round");
	    sectionToShapeMapping.put("Oval Diamonds", "Oval");
	    sectionToShapeMapping.put("Emerald Diamonds", "Emerald");

	    // Iterate over the section headers and their associated prices
	    for (Map.Entry<String, String> entry : sectionToShapeMapping.entrySet()) {
	        String sectionHeader = entry.getKey();
	        String shape = entry.getValue();
	        // Get the prices for the current section
	        Map<Double, Double> prices = getPricesForSection(sectionHeader);
	        // Update diamond prices in the database
	        updateDiamondPricesInDatabase(shape, prices);
	    }
	}

	private Map<Double, Double> getPricesForSection(String sectionHeader) {
	    // Implement logic to extract prices for the given section from the table structure
	    // For this example, assume prices are retrieved from a database or hardcoded
	    Map<Double, Double> prices = new HashMap<>();
	    if (sectionHeader.equals("Round Diamonds")) {
	        prices.put(0.5, 1219.0); // 0.5 ct.
	        prices.put(1.0, 4816.0); // 1 ct.
	        prices.put(2.0, 19051.0); // 2 ct.
	    } else if (sectionHeader.equals("Oval Diamonds")) {
	        prices.put(0.5, 1098.0); // 0.5 ct.
	        prices.put(1.0, 3759.0); // 1 ct.
	        prices.put(2.0, 17505.0); // 2 ct.
	    } else if (sectionHeader.equals("Emerald Diamonds")) {
	        prices.put(0.5, 1026.0); // 0.5 ct.
	        prices.put(1.0, 3868.0); // 1 ct.
	        prices.put(2.0, 16766.0); // 2 ct.
	    }
	    return prices;
	}

	private double fetchExchangeRateFromAPI(String baseCurrency) throws IOException {
	    URL url = new URL("https://api.exchangerate-api.com/v4/latest/" + baseCurrency);
	    HttpURLConnection con = null;
	    try {
	        con = (HttpURLConnection) url.openConnection();
	        con.setRequestMethod("GET");

	        try (BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()))) {
	            String inputLine;
	            StringBuilder response = new StringBuilder();
	            while ((inputLine = in.readLine()) != null) {
	                response.append(inputLine);
	            }

	            // Parse JSON response to get exchange rate
	            JSONObject jsonObject = new JSONObject(response.toString());
	            JSONObject rates = jsonObject.getJSONObject("rates");
	            return rates.getDouble("INR");
	        }
	    } finally {
	        if (con != null) {
	            con.disconnect();
	        }
	    }
	}

	@Transactional
	private void updateDiamondPricesInDatabase(String shape, Map<Double, Double> prices) {
	    try {
	        // Fetch exchange rate
	        double exchangeRate = fetchExchangeRateFromAPI("USD");

	        // Retrieve existing diamond entries from the database based on shape
	        List<Diamond> diamonds = diamondRepository.findByShape(shape);
	        if (diamonds.isEmpty()) {
	            System.out.println("No diamonds found for shape: " + shape);
	            return;
	        }

	        for (Diamond diamond : diamonds) {
	            // Update prices based on carat and convert to INR
	            String caratStr = diamond.getCarat();
	            try {
	                double carat = Double.parseDouble(caratStr);
	                if (prices.containsKey(carat)) {
	                    double priceInUSD = prices.get(carat);
	                    double priceInINR = priceInUSD * exchangeRate;
	                    diamond.setCurrentPrice(priceInINR);
	                    diamond.setLastUpdateDate(LocalDate.now());
	                    // Save the updated diamond entry
	                    diamondRepository.save(diamond);
	                } else {
	                    System.out.println("No price found for carat " + carat + " and shape " + shape);
	                }
	            } catch (NumberFormatException e) {
	                System.out.println("Error parsing carat value for diamond: " + diamond.getId());
	            }
	        }
	    } catch (IOException e) {
	        System.out.println("Error fetching exchange rate from API: " + e.getMessage());
	    }
	}


	
	
	
	
	
	
}
