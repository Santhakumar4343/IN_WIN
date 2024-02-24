package com.os.inwin.serviceImpl;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.os.inwin.entity.Gold;
import com.os.inwin.entity.Stock;
import com.os.inwin.goldapi.MetalPriceApiResponse;
import com.os.inwin.repository.GoldRepository;
import com.os.inwin.service.GoldService;

import lombok.Value;

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

	
	
}
