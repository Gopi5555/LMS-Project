package com.example.LMS.Project.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class OtpService {

	@Autowired
	private JavaMailSender mailSender;

	private Map<String, String> otpStore = new HashMap<>();
	private Map<String, LocalDateTime> expiry = new HashMap<>();

	public String generateOtp() {
		return String.valueOf(100000 + new Random().nextInt(900000));
	}

	public void sendOtp(String email) {
		String otp = generateOtp();
		otpStore.put(email, otp);
		expiry.put(email, LocalDateTime.now().plusMinutes(5));
		
		SimpleMailMessage msg = new SimpleMailMessage();
		msg.setTo(email);
		msg.setFrom("gopikrishnak93941849@gmail.com");
		msg.setSubject("OTP Login");
		msg.setText("Your OTP is: " + otp);

		mailSender.send(msg);
	}

	public boolean verifyOtp(String email, String userOtp) {

		if (!otpStore.containsKey(email))
			return false;

		if (LocalDateTime.now().isAfter(expiry.get(email)))
			return false;

		return otpStore.get(email).equals(userOtp);
	}
}
