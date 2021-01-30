package com.deadenddev.NotEatYet01.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.deadenddev.NotEatYet01.entities.Ingrediente;

@Repository
public interface CrudIngrediente extends CrudRepository<Ingrediente, Long>{
	
	public List<Ingrediente> findByPiattoId(long id);

}
