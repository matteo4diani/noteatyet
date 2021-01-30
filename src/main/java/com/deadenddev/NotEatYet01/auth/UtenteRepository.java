package com.deadenddev.NotEatYet01.auth;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository                                                       // il tipo dell'ID
public interface UtenteRepository extends CrudRepository<Utente , Long>, UserDAO{

	Optional<Utente> findByUsername(String username); 
	
}
