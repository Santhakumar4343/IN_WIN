package com.os.inwin.serviceImpl;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.os.inwin.entity.Stock;
import com.os.inwin.repository.StockRepository;
import com.os.inwin.service.StockService;

@Service
public class StockServiceImpl implements StockService {

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private StockMarketApiService stockMarketApiService;

    @Override
    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    @Override
    public Stock saveStock(Stock stock) {
        stock.setLastUpdateDate(LocalDate.now());
        return stockRepository.save(stock);
    }

    @Override
    public void updateStockPrices() {
        List<Stock> stocks = stockRepository.findAll();
        for (Stock stock : stocks) {
            double currentPrice = stockMarketApiService.getCurrentPrice(stock.getSymbol());
            stock.setCurrentPrice(currentPrice);
            stock.setLastUpdateDate(LocalDate.now());
            stockRepository.save(stock);
        }
    }

	@Override
	public List<Stock> getStocksByUserName(String userName) {
		
		return stockRepository.findByUserName(userName);
	}
}

