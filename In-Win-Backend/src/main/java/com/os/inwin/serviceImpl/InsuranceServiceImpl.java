package com.os.inwin.serviceImpl;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.os.inwin.entity.Insurance;
import com.os.inwin.repository.InsuranceRepository;
import com.os.inwin.service.InsuranceService;
@Service
public class InsuranceServiceImpl implements InsuranceService{
@Autowired
	private InsuranceRepository insuranceRepository;
	@Override
	public List<Insurance> getAllInsurances() {
		return insuranceRepository.findAll();
	}

	@Override
	public Insurance saveInsurance(Insurance insurance) {
		insurance.setLastUpdateDate(LocalDate.now());
		return insuranceRepository.save(insurance);
	}

	@Override
	public List<Insurance> getInsurancesByUserName(String userName) {
		
		return insuranceRepository.findByUserName(userName);
	}

	@Override
	public Insurance updateInsurance(Long id, Insurance insurance) {
		
		Optional <Insurance> optionalInsurance=insuranceRepository.findById(id);
		
		if(optionalInsurance.isPresent()) {
			Insurance existingRealestate=optionalInsurance.get();
			existingRealestate.setPremium(insurance.getPremium());
			existingRealestate.setTotalAmount(insurance.getTotalAmount());
			existingRealestate.setBuyDate(insurance.getBuyDate());
			
			existingRealestate.setLastUpdateDate(LocalDate.now());
			existingRealestate.setName(insurance.getName());
			return insuranceRepository.save(existingRealestate);
			
		}
			return null;
	}

	@Override
	public boolean deleteInsurance(long id) {
		Optional<Insurance> optionalInsurance = insuranceRepository.findById(id);
	    if (optionalInsurance.isPresent()) {
	    	insuranceRepository.deleteById(id);
	        return true; 
	    } else {
	        return false; 
	    }
	}

}
