package com.deadenddev.NotEatYet01.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration 
// SpringSecurity obbliga a criptare le password. Usiamo questa classe di configurazione
// per andare a definire quale crittografia andiamo ad utilizzare
public class PasswordConfig {

	@Bean // oggetto che verrà fornito con Autowired se serve
	public PasswordEncoder passwordEncoder() { 
		return new BCryptPasswordEncoder(); 
	    // ho scelto questo tipo di criptografia 
	}
	
}
