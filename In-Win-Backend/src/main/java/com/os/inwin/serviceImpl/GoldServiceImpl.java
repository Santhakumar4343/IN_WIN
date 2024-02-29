package com.os.inwin.serviceImpl;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.os.inwin.entity.Gold;
import com.os.inwin.goldapi.GoldPriceResponse;
import com.os.inwin.repository.GoldRepository;
import com.os.inwin.service.GoldService;

@Service
public class GoldServiceImpl implements GoldService{

	
	@Autowired
	private GoldRepository goldRepository;
	
	
	@Override
	public List<Gold> getAllGolds() {
		
		return goldRepository.findAll();
	}

	@Override
	public Gold saveGold(Gold gold) {
		gold.setLastUpdateDate(LocalDate.now());
	        return  goldRepository.save(gold);
	}

	@Override
	public void updateGoldPrices() {	
	}

	@Override
	public List<Gold> getGoldByUserName(String userName) {
		
		return goldRepository.findByUserName(userName);
	}

	@Override
	public Gold updateGold(Long id, Gold gold) {
		 Optional<Gold> optionalGold = goldRepository.findById(id);
		    if (optionalGold.isPresent()) {
		        Gold existingGold= optionalGold.get();
		        existingGold.setName(gold.getName());
		        existingGold.setQuantity(gold.getQuantity());
		        existingGold.setBuyDate(gold.getBuyDate());
		        existingGold.setPurchasePrice(gold.getPurchasePrice());
		        existingGold.setSymbol(gold.getSymbol());
		        return goldRepository.save(existingGold);
		    }
		    return null;
	}

	@Override
	public boolean deleteGold(long id) {
		 Optional<Gold> optionalGold= goldRepository.findById(id);
		    if (optionalGold.isPresent()) {
		    	goldRepository.deleteById(id);
		        return true; 
		    } else {
		        return false; 
		    }
	}
	 public String getGoldPricePerGramInHyderabad() {
	        String url = "http://www.goldpriceindia.com/gold-price-hyderabad.php";
	        try {
	            // Fetch the HTML content of the URL
	            Document doc = Jsoup.connect(url).get();
	            // Extract the table containing gold prices
	            Element table = doc.select("table").get(0); // Assuming the first table on the page contains the prices
	            // Extract the rows of the table
	            Elements rows = table.select("tr");
	            // Find the row containing the gold price per gram
	            Element row = null;
	            for (Element r : rows) {
	                if (r.text().contains("1 gram")) {
	                    row = r;
	                    break;
	                }
	            }
	            // Extract the columns of the row
	            Elements columns = row.select("td");
	            // Extract the price from the second column (index 1)
	            String priceString = columns.get(1).text().replaceAll("[^\\d.]+", "");
	            double price = Double.parseDouble(priceString);
	            // Create a JSON object
	            ObjectMapper mapper = new ObjectMapper();
	            return mapper.writeValueAsString(new GoldPriceResponse(price));
	        } catch (IOException e) {
	            throw new RuntimeException("Error fetching gold price", e);
	        }
	    }

	
}
