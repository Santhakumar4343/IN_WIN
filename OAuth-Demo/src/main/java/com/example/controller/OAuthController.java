package com.example.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class OAuthController {

	@GetMapping("/get")
	public ResponseEntity<String> greet() {
		
		return  ResponseEntity.ok("Hello mr Santha");
		
	}
	
}
