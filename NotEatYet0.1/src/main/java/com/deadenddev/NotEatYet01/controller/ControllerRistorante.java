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

import com.deadenddev.NotEatYet01.entities.Ristorante;
import com.deadenddev.NotEatYet01.repositories.CrudCategoria;
import com.deadenddev.NotEatYet01.repositories.CrudIngrediente;
import com.deadenddev.NotEatYet01.repositories.CrudPiatto;
import com.deadenddev.NotEatYet01.repositories.CrudRistorante;

@RestController
@RequestMapping("/ristoranti")
public class ControllerRistorante {
	
	@Autowired
	private CrudRistorante dbristoranti;
	
	@Autowired
	private CrudPiatto dbpiatti;
	
	@Autowired
	private CrudIngrediente dbingredienti;
	
	@Autowired
	private CrudCategoria dbcategorie;
	
	@GetMapping
	public Iterable<Ristorante> get() {
		return dbristoranti.findAll();
	}
	
	@GetMapping("/{id}")
	public Ristorante get(@PathVariable long id) {
		Ristorante r = dbristoranti.findById(id).orElse(null);
		r.setMenu(dbpiatti.findByRistoranteId(id));
		return r;
	}
	//Non inserire il menu: null nelle chiamate Post, blocca il Get
	@PostMapping
	public void add(@RequestBody Ristorante ristorante) {
		dbristoranti.save(ristorante);
	}
	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable long id) {
		
		dbristoranti.deleteById(id);

		
	}
	
	@PutMapping
	public void update(@RequestBody Ristorante ristorante) {
		if (dbristoranti.findById(ristorante.getId()).isPresent())
			dbristoranti.save(ristorante);
	}
	
	
	
	

}
