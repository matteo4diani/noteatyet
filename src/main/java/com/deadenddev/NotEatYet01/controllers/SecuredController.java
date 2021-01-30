package com.deadenddev.NotEatYet01.controllers;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.deadenddev.NotEatYet01.auth.Utente;

@RestController
@RequestMapping("secured")
public class SecuredController {

	
	@GetMapping
	public Utente detail(@AuthenticationPrincipal Utente utente) { 
		System.out.println(utente.toString());
		return utente; 
		
	}
}
