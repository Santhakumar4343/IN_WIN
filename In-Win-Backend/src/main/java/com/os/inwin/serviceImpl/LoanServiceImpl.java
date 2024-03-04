package com.os.inwin.serviceImpl;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.os.inwin.entity.Loan;
import com.os.inwin.repository.LoanRepository;
import com.os.inwin.service.LoanService;

@Service
public class LoanServiceImpl implements LoanService {

	@Autowired
	private LoanRepository loanRepository;

	public double calculateTotalCurrentValue(String userName) {
	    Iterable<Loan> loans = loanRepository.findByUserName(userName);
	    double totalValue = 0.0;

	    LocalDate currentDate = LocalDate.now();

	    for (Loan loan : loans) {
	        LocalDate buyDate = loan.getBuyDate();
	        int tenureInYears = loan.getTenureInYears();
	        double monthlyEMI = loan.getMonthlyEMI();

	       
	        long monthsRemaining = ChronoUnit.MONTHS.between(currentDate, buyDate.plusYears(tenureInYears));
	        System.out.println(monthsRemaining);
	        if (monthsRemaining > 0) {
	            
	            totalValue += monthlyEMI * monthsRemaining;
	        }
	    }

	    return totalValue;
	}
	
	
	
	
	
	
	@Override
	public Loan saveLoan(Loan loan) {
		loan.setLastUpdateDate(LocalDate.now());
		return loanRepository.save(loan);
	}

	@Override
	public Loan updateLoan(Long id, Loan loan) {
		Optional<Loan> optionalLoan = loanRepository.findById(id);
		if (optionalLoan.isPresent()) {
			Loan existingLoan = optionalLoan.get();
			existingLoan.setBankName(loan.getBankName());
			existingLoan.setLoanType(loan.getLoanType());
			existingLoan.setLoanName(loan.getLoanName());
			existingLoan.setTenureInYears(loan.getTenureInYears());
			existingLoan.setLoanAmount(loan.getLoanAmount());
			existingLoan.setRateOfInterest(loan.getRateOfInterest());
			existingLoan.setMonthlyEMI(loan.getMonthlyEMI());
			existingLoan.setBuyDate(loan.getBuyDate());
			existingLoan.setLastUpdateDate(LocalDate.now());
			return loanRepository.save(existingLoan);

		}
		return null;
	}

	@Override
	public boolean deleteLoan(Long id) {
		Optional<Loan> optionalLoan = loanRepository.findById(id);
		if (optionalLoan.isPresent()) {
			loanRepository.deleteById(id);
			return true;
		} else
			return false;

	}

	@Override
	public List<Loan >getLoansByUser(String  userName) {
		
		return loanRepository.findByUserName(userName);
	}

	@Override
	public List<Loan> getAllLoans() {
		
		return loanRepository.findAll();
	}

}
