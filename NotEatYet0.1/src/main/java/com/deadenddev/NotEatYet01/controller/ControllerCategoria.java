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

import com.deadenddev.NotEatYet01.entities.Categoria;
import com.deadenddev.NotEatYet01.entities.Ingrediente;
import com.deadenddev.NotEatYet01.entities.Ristorante;
import com.deadenddev.NotEatYet01.repositories.CrudCategoria;
import com.deadenddev.NotEatYet01.repositories.CrudIngrediente;
import com.deadenddev.NotEatYet01.repositories.CrudPiatto;
import com.deadenddev.NotEatYet01.repositories.CrudRistorante;

@RestController
@RequestMapping("/categorie")
public class ControllerCategoria {
	
	@Autowired
	private CrudRistorante dbristoranti;
	
	@Autowired
	private CrudPiatto dbpiatti;
	
	@Autowired
	private CrudIngrediente dbingredienti;
	
	@Autowired
	private CrudCategoria dbcategorie;
	
	@GetMapping
	public Iterable<Categoria> get() {
		return dbcategorie.findAll();
	}
	
	@GetMapping("/{id}")
	public Categoria get(@PathVariable long id) {
		Categoria c = dbcategorie.findById(id).orElse(null);
		return c;
	}
	
	@PostMapping
	public void add(@RequestBody Categoria categoria) {
		dbcategorie.save(categoria);
	}
	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable long id) {
		
		dbcategorie.deleteById(id);

		
	}
	
	@PutMapping
	public void update(@RequestBody Categoria categoria) {
		if (dbcategorie.findById(categoria.getId()).isPresent())
			dbcategorie.save(categoria);
	}

}
