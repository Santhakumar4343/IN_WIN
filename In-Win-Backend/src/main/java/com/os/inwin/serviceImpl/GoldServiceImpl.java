package com.os.inwin.serviceImpl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.os.inwin.entity.Gold;
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
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Gold updateGold(Long id, Gold gold) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean deleteGold(long id) {
		// TODO Auto-generated method stub
		return false;
	}

	
	
}
