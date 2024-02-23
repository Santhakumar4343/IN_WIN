package com.os.inwin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.os.inwin.entity.Gold;
import com.os.inwin.serviceImpl.GoldPriceService;
import com.os.inwin.serviceImpl.GoldServiceImpl;


@RestController
@RequestMapping("/api/gold")
public class GoldController {
   @Autowired
   private GoldPriceService goldPriceService;
	
  @Autowired
   private GoldServiceImpl goldService;
   
   
   
   @PostMapping("/save")
   public ResponseEntity<Gold> saveGold(@RequestBody Gold gold) {
       Gold savedGold = goldService.saveGold(gold);
       if (savedGold != null) {
           return new ResponseEntity<>(savedGold, HttpStatus.CREATED);
       } else {
           return new ResponseEntity<>(HttpStatus.NOT_FOUND);
       }
   }

   
   @PostMapping("/updateAllPrices")
   public String updateAllGoldPrices() {
	   goldPriceService.updateAllGoldPrices();
       return "All gold prices updated successfully";
   }
}
