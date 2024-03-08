package com.os.inwin.serviceImpl;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.os.inwin.entity.Diamond;
import com.os.inwin.entity.Gold;
import com.os.inwin.repository.DiamondRepository;
import com.os.inwin.service.DiamondService;
@Service
public class DiamondServiceImpl implements DiamondService{

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
		    	Diamond existingDiamond= optionalDiamond.get();
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
		Optional<Diamond> optionalDiamond= diamondRepository.findById(id);
	    if (optionalDiamond.isPresent()) {
	    	diamondRepository.deleteById(id);
	        return true; 
	    } else {
	        return false; 
	    }
	}

}
