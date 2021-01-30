package com.deadenddev.NotEatYet01.controllers;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.deadenddev.NotEatYet01.auth.Utente;

@RestController
@RequestMapping("/accountmanager")
public class AccountController {

	
	@GetMapping
	public String get() { 
		
		return "/home_azienda.html"; 
		
	}
	
	@GetMapping("/detail")
	public Utente test(@AuthenticationPrincipal Utente utente) { 
	    return utente; 	
    }
	
}
