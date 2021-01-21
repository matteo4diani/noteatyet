package com.deadenddev.NotEatYet01.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.deadenddev.NotEatYet01.entities.Ristorante;

@Repository
public interface CrudRistorante extends CrudRepository<Ristorante, Long>{
	
	public Ristorante findByRagionesociale(String ragionesociale);

}
