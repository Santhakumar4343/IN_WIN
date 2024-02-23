package com.os.inwin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.os.inwin.entity.User;
import com.os.inwin.serviceImpl.UserServiceImpl;

import jakarta.security.auth.message.AuthException;

@RestController
@RequestMapping("/api/users")
public class UserController {
	@Autowired
	private UserServiceImpl userService;
	private final Map<String, User> userMap = new HashMap<>();

	@PostMapping("/save")
	public ResponseEntity<String> createUser(@RequestBody User user) {

		if (user != null) {
			userService.createUser(user);
			return new ResponseEntity<>("user create successfully", HttpStatus.CREATED);
		} else {
			return new ResponseEntity<>("user cant be null", HttpStatus.BAD_REQUEST);
		}
	}

//  
	@PostMapping("/send-otp")
	public ResponseEntity<String> sendOtp(@RequestBody User user) {
		if (user != null) {
			// Store the user data temporarily
			userMap.put(user.getUserName(), user);

			// Generate OTP and send it
			String otp = userService.generateOtpAndSendEmail(user);

			return ResponseEntity.ok("OTP sent successfully: " + otp);
		} else {
			return new ResponseEntity<>("User data cannot be null", HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/verify-otp")
	public ResponseEntity<String> verifyOtpAndSaveUser(@RequestParam String otp) {
		// Iterate over all users in temporary storage
		for (Map.Entry<String, User> entry : userMap.entrySet()) {
			String username = entry.getKey();
			User user = entry.getValue();

			// Call the verifyOtp method with the entered OTP for each user
			ResponseEntity<String> otpVerificationResult = userService.verifyOtp(user, otp);

			// If OTP verification succeeds, save the user data and remove it from temporary
			// storage
			if (otpVerificationResult.getStatusCode() == HttpStatus.OK) {
				userService.createUser(user);
				userMap.remove(username); // Remove the user data from temporary storage
				return new ResponseEntity<>("User created successfully", HttpStatus.CREATED);
			}
		}

		// If no matching OTP is found in temporary storage, OTP verification fails
		return new ResponseEntity<>("Invalid OTP", HttpStatus.BAD_REQUEST);
	}

	@GetMapping("/getUser/{id}")
	public ResponseEntity<User> getUserById(@PathVariable long id) {
		User user = userService.getUser(id);
		if (user != null) {
			return new ResponseEntity<>(userService.getUser(id), HttpStatus.OK);
		} else
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);

	}

	@GetMapping("/getAllUsers")
	public ResponseEntity<List<User>> getAllUsers() {

		List<User> users = userService.getAllUser();
		if (users != null) {
			return new ResponseEntity<>(users, HttpStatus.OK);

		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PutMapping("/updateUser/{id}")
	public ResponseEntity<String> updateUser(@PathVariable long id, @RequestBody User user) {
		User updateUser = userService.UpdateUser(id, user);

		return updateUser != null ? new ResponseEntity<>("User Updated Successfully", HttpStatus.OK)
				: new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteUser(@PathVariable Long id) {
		try {
			userService.deleteUser(id);
			return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<>("User not found: " + e.getMessage(), HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			return new ResponseEntity<>("Error deleting user: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/login")
	public ResponseEntity<User> login(@RequestParam String userName, @RequestParam String password) {
	    try {
	        User authenticatedUser = userService.login(userName, password);
	        return new ResponseEntity<>(authenticatedUser, HttpStatus.OK);
	    } catch (AuthException e) {
	        if (e.getMessage().equals("Invalid username")) {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Username not found
	        } else {
	            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED); // Incorrect password
	        }
	    }
	}

	

}
