package com.deadenddev.NotEatYet01.auth;

import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;

public interface UserDAO {

	// questo metodo dovrà essere implementato da tutti i Dao per trovare un utente 
	// attraverso l'username e servirà a SpringSecurity per verificare le credenziali 
	Optional<? extends UserDetails> findByUsername(String username); 
	
}


