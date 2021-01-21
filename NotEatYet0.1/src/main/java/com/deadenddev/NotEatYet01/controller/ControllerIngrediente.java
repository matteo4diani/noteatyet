package com.deadenddev.NotEatYet01.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.deadenddev.NotEatYet01.entities.Ingrediente;
import com.deadenddev.NotEatYet01.repositories.CrudCategoria;
import com.deadenddev.NotEatYet01.repositories.CrudIngrediente;
import com.deadenddev.NotEatYet01.repositories.CrudPiatto;
import com.deadenddev.NotEatYet01.repositories.CrudRistorante;

@RestController
@RequestMapping("/ingredienti")
public class ControllerIngrediente {
	
	@Autowired
	private CrudRistorante dbristoranti;
	
	@Autowired
	private CrudPiatto dbpiatti;
	
	@Autowired
	private CrudIngrediente dbingredienti;
	
	@Autowired
	private CrudCategoria dbcategorie;
	
	@GetMapping
	public Iterable<Ingrediente> get() {
		return dbingredienti.findAll();
	}
	
	@GetMapping("/{id}")
	public Ingrediente get(@PathVariable long id) {
		Ingrediente i = dbingredienti.findById(id).orElse(null);
		return i;
	}
	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable long id) {
		
		dbingredienti.deleteById(id);

		
	}
	
	@PostMapping("/piatti/{id}")
	public void post(@PathVariable long id, @RequestBody Ingrediente ingrediente) {
		if (dbpiatti.findById(id).isPresent())
			dbingredienti.save(ingrediente);
	}
	
	@PutMapping
	public void put(@RequestBody Ingrediente ingrediente) {
		if (dbingredienti.findById(ingrediente.getId()).isPresent())
			dbingredienti.save(ingrediente);
	}

}
