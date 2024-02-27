package com.os.inwin.serviceImpl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.os.inwin.entity.Loan;
import com.os.inwin.repository.LoanRepository;
import com.os.inwin.service.LoanService;
@Service
public class LoanServiceImpl implements LoanService {

	@Autowired
	private LoanRepository loanRepository;
	@Override
	public Loan saveLoan(Loan loan) {
		loan.setLastUpdateDate(LocalDate.now());
		return loanRepository.save(loan);
	}

	@Override
	public Loan updateLoan(Long id, Loan loan) {
		
		return null;
	}

	@Override
	public void deleteLoan(Long id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Loan getLoansByUser(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Loan> getAllLoans() {
		// TODO Auto-generated method stub
		return null;
	}

}
