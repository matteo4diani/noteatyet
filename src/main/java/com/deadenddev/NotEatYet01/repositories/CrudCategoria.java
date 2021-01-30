package com.deadenddev.NotEatYet01.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.deadenddev.NotEatYet01.entities.Categoria;

@Repository
public interface CrudCategoria extends CrudRepository<Categoria, Long>{
	
	public Categoria findByNome(String nome);

}
