package com.example.LMS.Project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.LMS.Project.service.OtpService;

@RestController
@RequestMapping("/auth")
@CrossOrigin("http://localhost:3000")
public class OtpController {

	@Autowired
	private OtpService otpService;

	@PostMapping("/verify-otp")
	public String verifyOtp(@RequestParam String email, @RequestParam String otp) {

		boolean valid = otpService.verifyOtp(email, otp);

		return valid ? "SUCCESS" : "INVALID_OTP";
	}

	@PostMapping("/resend-otp")
	public String resendOtp(@RequestParam String email) {
		otpService.sendOtp(email);
		return "OTP_RESENT";
	}
}