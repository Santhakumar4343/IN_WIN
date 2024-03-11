package com.os.inwin.serviceImpl;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.os.inwin.entity.Diamond;
import com.os.inwin.entity.ExchangeRateApiResponse;
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
	        String url = "https://www.diamonds.pro/education/diamond-prices/";
	        try {
	            // Fetch the HTML content of the URL
	            Document doc = Jsoup.connect(url).get();
	            // Extract the table containing diamond prices
	            Element table = doc.select("table").first(); // Assuming the first table on the page contains the prices
	            // Extract the rows of the table
	            Elements rows = table.select("tr");
	            // Iterate through each row to extract diamond prices
	            for (Element row : rows) {
	                Elements columns = row.select("td");
	                if (columns.size() >= 3) { // Ensure the row contains necessary data
	                    String carat = columns.get(0).text().trim();
	                    String totalPriceRange = columns.get(2).text().trim();
	                   
	                    // Extract the average price from the total price range
	                    double price = extractAveragePrice(totalPriceRange);
	                    // Update diamond price in the database for the given carat
	                    
	                    updateDiamondPrice(carat, price);
	                }
	            }
	        } catch (IOException e) {
	            throw new RuntimeException("Error fetching diamond prices", e);
	        }
	    }

	    private double extractAveragePrice(String totalPriceRange) {
	        // Extracting the average price from the total price range
	        String[] prices = totalPriceRange.split("–");
	        double lowerBound = Double.parseDouble(prices[0].replaceAll("[^\\d.]+", ""));
	        double upperBound = Double.parseDouble(prices[1].replaceAll("[^\\d.]+", ""));
	        
	        return upperBound;
	    }

	    

	    
//	    @Transactional
//	    public void updateDiamondPrices(double price1, double price2, double price3, double price4, double price5) {
//	        List<Diamond> diamonds = diamondRepository.findAll();
//	        for (Diamond diamond : diamonds) {
//	            String carat = diamond.getCarat();
//	            double price;
//	            // Assign the price based on the carat value
//	            if (carat == "1.0") {
//	                price = price1;
//	            } else if (carat == "2.0") {
//	                price = price2;
//	            } else if (carat == "3.0") {
//	                price = price3;
//	            } else if (carat == "4.0") {
//	                price = price4;
//	            } else if (carat == "5.0") {
//	                price = price5;
//	            } else {
//	                // Handle unknown carat values
//	                continue;
//	            }
//	            // Update the diamond price and last update date
//	            diamond.setCurrentPrice(price);
//	            diamond.setLastUpdateDate(LocalDate.now());
//	            diamondRepository.save(diamond);
//	        }
//	    }
	    
	    
	    
	    
	    
	    
	    
	    
//	    @Transactional
//	    public void updateDiamondPrice(String carat, double price) {
//	        // Retrieve diamonds from the database based on the given carat
//	        List<Diamond> diamonds = diamondRepository.findByCarat(carat);
//	        // Update the current price and last update date for each diamond
//	        for (Diamond diamond : diamonds) {
//	        	System.out.println(price);
//	            diamond.setCurrentPrice(price);
//	            diamond.setLastUpdateDate(LocalDate.now());
//	            diamondRepository.save(diamond);
//	        }
//	    }

}
