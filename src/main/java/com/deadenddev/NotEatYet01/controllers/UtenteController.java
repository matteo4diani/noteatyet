package com.deadenddev.NotEatYet01.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.deadenddev.NotEatYet01.auth.AuthService;
import com.deadenddev.NotEatYet01.auth.Utente;

@RestController
@RequestMapping("/user")
public class UtenteController {

	@Autowired
	public AuthService auth; 
	
	
	
	
	@GetMapping("/{userId}")
	public Utente get(@PathVariable Long userId) {
		return auth.findById(userId).orElse(null); 
	}
	
}
