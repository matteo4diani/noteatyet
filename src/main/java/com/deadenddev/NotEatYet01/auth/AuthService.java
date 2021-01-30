package com.deadenddev.NotEatYet01.auth;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;

import com.deadenddev.NotEatYet01.security.Roles;

@Service

// Service è simile ad una Repository, ma non ha accesso diretto ai dati. 
// Qua implementiamo UserDetailService, l'interfaccia di SpringSecurity 
// che utilizza come oggetto per andare a controllare gli utenti attraverso l'username 
public class AuthService implements UserDetailsService {

	
	private UtenteRepository dao; 
	
	private PasswordEncoder passwordEncoder;

	
	
	@Autowired
	public AuthService(UtenteRepository dao, PasswordEncoder passwordEncoder) {
		this.dao = dao;
		this.passwordEncoder = passwordEncoder;
	}


	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<? extends UserDetails> user = dao.findByUsername(username); 
		System.out.println(user.toString());
		System.out.println(username);
		if (user.isPresent())
			return user.get(); 
		
		throw new UsernameNotFoundException("Nessun utente con l'username: " + username); 
	} 
	
	public void signup(String email, String username, String password)  {
		Utente newUtente = new Utente(); 
//		newUtente.setId(0L);
		newUtente.setEmail(email);
		newUtente.setUsername(username);
		newUtente.setPassword(passwordEncoder.encode(password));
		newUtente.setRuolo(Roles.USER);
		
		try {
			dao.save(newUtente); 
		} catch (Exception e) { 
			e.printStackTrace();
		}
	}
	
    
	public boolean checkUserId(Authentication authentication, Long id) {
		
		Utente utente = dao.findByUsername(authentication.getName()).orElse(null);
		
		if (utente != null) { 
			return (utente.getId() == id); 
		} else {
			return false; 
		}
	}
	
	public Optional<Utente> findById(Long id) { 
		return dao.findById(id); 
	}
	
	
}
