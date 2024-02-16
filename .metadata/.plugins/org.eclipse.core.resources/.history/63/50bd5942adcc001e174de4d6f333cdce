package com.os.inwin.serviceImpl;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.os.inwin.entity.User;
import com.os.inwin.repository.UserRepository;
import com.os.inwin.service.UserService;

import jakarta.security.auth.message.AuthException;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private JavaMailSender javaMailSender;

	@Override
	public User createUser(User user) {
		return userRepository.save(user);
	}

	@Override
	public User getUser(long id) {
		Optional<User> user = userRepository.findById(id);
		return user.orElse(null);
	}

	@Override
	public List<User> getAllUser() {

		return userRepository.findAll();
	}

	@Override
	public User UpdateUser(long id, User user) {
		Optional<User> optionalUser = userRepository.findById(id);
		if (optionalUser.isPresent()) {
			User existingUser = optionalUser.get();
			existingUser.setUserName(user.getUserName());
			existingUser.setEmail(user.getEmail());
			existingUser.setPassword(user.getPassword());
			existingUser.setMobileNumber(user.getMobileNumber());
			existingUser.setUserType(user.getUserType());
			existingUser.setCountry(user.getCountry());
			existingUser.setCurrency(user.getCurrency());
			return userRepository.save(existingUser);

		}
		return null;
	}

	@Override
	public void deleteUser(long id) {
		Optional<User> optionalUser = userRepository.findById(id);
		if (optionalUser.isPresent()) {
			userRepository.deleteById(id);
		} else {
			// If the user with the given ID is not present
			throw new NoSuchElementException("User with ID " + id + " not found");
		}
	}

	private final Map<String, String> otpCache = new ConcurrentHashMap<>();

	public String generateOtpAndSendEmail(User user) {
		try {
			// Generate a random 6-digit OTP
			String otp = String.format("%06d", new Random().nextInt(1000000));

			// Save the OTP to the cache
			otpCache.put(user.getUserName(), otp);

			// Log the generated OTP for debugging (you can remove this in production)
			System.out.println("Generated OTP for user " + user.getUserName() + ": " + otp);

			// Return the generated OTP
			return otp;
		} catch (Exception e) {
			e.printStackTrace();
			return null; // Handle the case where OTP generation fails
		}
	}

	public void sendOtpToSuperUser(User user) {
		// Retrieve the SuperUser's email from your database or configuration
		String superUserEmail = "santhakumar6787@gmail.com"; // Replace with actual SuperUser's email

		// Generate a random 6-digit OTP and save it to the cache
		String otp = generateOtpAndSendEmail(user);

		// Send the OTP via email to the SuperUser
		sendOtpEmail(superUserEmail, user.getUserName(), otp);
	}

	private void sendOtpEmail(String to, String username, String otp) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(to);
		message.setSubject("OTP Verification");
		message.setText("Hello " + username + ",\n\nThe requested OTP is: " + otp);
		javaMailSender.send(message);
	}

	public ResponseEntity<String> verifyOtp(User user, String enteredOtp) {
		try {
			// Retrieve the stored OTP from the cache
			String storedOtp = otpCache.get(user.getUserName());

			// Check if the storedOtp is null or empty
			if (storedOtp == null || storedOtp.isEmpty()) {
				return new ResponseEntity<>("Invalid OTP (Cache is empty)", HttpStatus.BAD_REQUEST);
			}

			// Compare the entered OTP with the stored OTP
			if (storedOtp.equals(enteredOtp)) {
				// If OTP matches, remove it from the cache
				otpCache.remove(user.getUserName());

				// OTP verification successful
				System.out.println("OTP verified successfully for user: " + user.getUserName());
				return new ResponseEntity<>("OTP verified successfully", HttpStatus.OK);
			} else {
				// OTP verification failed
				System.out.println("Invalid OTP (Mismatch)");
				return new ResponseEntity<>("Invalid OTP (Mismatch)", HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("OTP verification failed");
			return new ResponseEntity<>("Failed to verify OTP", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public User login(String userName, String password) throws AuthException {
		// Authenticate the user
		User user = userRepository.findByUserNameAndPassword(userName, password);

		if (user != null) {

			return user;
		} else {
			throw new AuthException("Invalid login credentials");
		}
	}

}
