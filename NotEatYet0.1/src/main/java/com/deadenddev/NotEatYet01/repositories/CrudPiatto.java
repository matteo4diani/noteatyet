package com.deadenddev.NotEatYet01.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.deadenddev.NotEatYet01.entities.Piatto;

@Repository
public interface CrudPiatto extends CrudRepository<Piatto, Long>{
	
	public List<Piatto> findByRistoranteId(Long idRistorante);
}
