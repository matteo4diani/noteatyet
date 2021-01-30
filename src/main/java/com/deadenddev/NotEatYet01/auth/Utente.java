package com.deadenddev.NotEatYet01.auth;

import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.deadenddev.NotEatYet01.security.Roles;

@Entity                        // UserDetails è l'interfaccia, offerta da Spring Security 
                               // per avere una gestione con permessi di livelli differenti 
public class Utente implements UserDetails{  

	
	private static final Map<String, Collection<? extends GrantedAuthority>> AUTHORITIES = new HashMap<>(); 
	
	{
		AUTHORITIES.put(Roles.ADMIN, Arrays.asList(new GrantedAuthority[] { new SimpleGrantedAuthority("ROLE_ADMIN"), 
			new SimpleGrantedAuthority("management"), }));
		AUTHORITIES.put(Roles.USER, Arrays.asList(new GrantedAuthority[] { new SimpleGrantedAuthority("ROLE_USER") }));
	}
	
	
	public static Collection<? extends GrantedAuthority> getAuthorityOfRole(String role) { 
		return AUTHORITIES.get(role);
	}
	
	
	
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id; 
	@Column(unique = true) // non possono esserci due utenti con la stessa mail 
	private String email;
	@Column(unique = true)
	private String username; // non possono esserci due utenti con lo stesso user
	private String password; 
	private String ruolo;
	
	
    public Utente(String email, String username, String password, String ruolo) {
		super();
		this.email = email;
		this.username = username;
		this.password = password;
		this.ruolo = ruolo;
	}


	public Utente() {
		super();
	}


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	

	public void setUsername(String username) {
		this.username = username;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRuolo() {
		return ruolo;
	}

	public void setRuolo(String ruolo) {
		this.ruolo = ruolo;
	}

	
	 // Permessi per ogni utente. 
	 // Gestiremo i livelli di accesso a seconda degli utenti
	
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		
		return getAuthorityOfRole(this.ruolo);
	}


	@Override 
	public String getPassword() { 
		return password;
	}
	
	@Override 
	public String getUsername() { 
		return username; 
	}
	
	
	
	// metodi richiesti dall'interfaccia, nel nostro caso li impostiamo a true. 
	
	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}


	@Override
	public String toString() {
		return "Utente [id=" + id + ", email=" + email + ", username=" + username + ", password=" + password
				+ ", ruolo=" + ruolo + "]";
	} 
	
	
}
