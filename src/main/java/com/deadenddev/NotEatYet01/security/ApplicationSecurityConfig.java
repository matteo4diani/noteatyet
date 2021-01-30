package com.deadenddev.NotEatYet01.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import com.deadenddev.NotEatYet01.auth.AuthService;


@Configuration
@EnableWebSecurity
// Configurazione di base di Spring Security, la andremo a personalizzare
public class ApplicationSecurityConfig extends WebSecurityConfigurerAdapter{

	// Oggetto che serve per criptografare le password
	private final PasswordEncoder passwordEncoder; 
	// Servizio che ci restituisce gli utenti 
	private final AuthService authService; 
	
	public ApplicationSecurityConfig(PasswordEncoder passwordEncoder, AuthService authService) { 
	this.passwordEncoder = passwordEncoder; 
	this.authService = authService; 
	}

	@Override // click con destro -> source -> Override Method -> configure(HttpSecurity http)
	protected void configure(HttpSecurity http) throws Exception {
		
		http.csrf().disable() // CSRF(Cross-Syte request forgery) 
		                      // è un attacco che forza un utente a svolgere azioni non 
		                      // volute in una web application in cui si è precedentemente 
		                      // registrato.  
		                      // Viene disabilitata se mi serve usare l'app 
                              // anche come sistema rest per applicazioni "esterne".  
		.authorizeRequests().antMatchers("/","/signup", "/login.html", "/login", "/main.css", "/logo3.png", "/bgr2.jpg", "/signup.html", "index.html")// qua inseriamo tutti i percorsi di html/ css/ javascript che mettiamo dentro a static  
	    .permitAll()// tutti potranno accedere a questi percorsi
	    .antMatchers("/user/{userId}").access("@AuthService.checkUserId(authentication,#userId)")
	    .antMatchers("/").hasAnyRole(Roles.ADMIN, Roles.USER) // qua ci mettiamo le informazioni sugli account o altre cose come "aiuto" / "pagina servizio clienti"
	    .antMatchers("/home_ristorante.html").hasAnyRole(Roles.USER)
	    .antMatchers("/home_azienda.html").hasAnyRole(Roles.ADMIN) // solo gli admin accedono a /management/**
 		.anyRequest().authenticated()// tutte le altre richieste richiedono l'autenticazione
        .and()
        .exceptionHandling()
        .accessDeniedPage("/forbidden.html") // qua inseriamo la pagina dell'accesso negato 
        .and()
        // SpringSecurity di base ci fornisce una pagina di default, ma noi ci metteremo la nostra 
        .formLogin()
        .loginPage("/login.html") // indirizzo a cui arriveranno le richieste di login 
        .loginProcessingUrl("/login")
        .permitAll()// tutti devono riuscire ad accedere 
        //.defaultSuccessUrl("/index.html", true) // se riesce ad accedere lo rimando alla pagina 
        
        .failureUrl("/fail.html") // se non riesce ad accedere messaggio di errore 
        .and()
        // configuriamo la pagina del logout
        .logout().logoutUrl("/logout")
       // .logoutSuccessUrl("/logout.html")// la nostra pagina del logout
        .clearAuthentication(true).logoutSuccessUrl("/login.html"); // se il logout ha successo lo riportiamo alla pagina di login. 
 	
	}
	

	@Bean
	// serve a springSecurity per andare a cercare gli utenti da un service 
	public DaoAuthenticationProvider daoAuthenticationProvider() { 
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider(); 
		provider.setPasswordEncoder(passwordEncoder);
		provider.setUserDetailsService(authService);
		return provider; 
	}
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception { 
		auth.authenticationProvider(daoAuthenticationProvider()); 
	}
	
}
