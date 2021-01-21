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
import com.deadenddev.NotEatYet01.entities.Piatto;
import com.deadenddev.NotEatYet01.entities.Ristorante;
import com.deadenddev.NotEatYet01.repositories.CrudCategoria;
import com.deadenddev.NotEatYet01.repositories.CrudIngrediente;
import com.deadenddev.NotEatYet01.repositories.CrudPiatto;
import com.deadenddev.NotEatYet01.repositories.CrudRistorante;

@RestController
@RequestMapping("/piatti")
public class ControllerPiatto {
	
	@Autowired
	private CrudRistorante dbristoranti;
	
	@Autowired
	private CrudPiatto dbpiatti;
	
	@Autowired
	private CrudIngrediente dbingredienti;
	
	@Autowired
	private CrudCategoria dbcategorie;
	
	@GetMapping
	public Iterable<Piatto> get() {
		return dbpiatti.findAll();
	}
	
	@GetMapping("/{id}")
	public Piatto get(@PathVariable long id) {
		Piatto p = dbpiatti.findById(id).orElse(null);
		p.setIngredienti(dbingredienti.findByPiattoId(id));
		return p;
	}
	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable long id) {
		
		dbpiatti.deleteById(id);

		
	}
	
	@PostMapping("/ristoranti/{ristoranteId}/{categoriaId}")
    public void addPiatto(@PathVariable Long ristoranteId, @PathVariable Long categoriaId, @RequestBody Piatto piatto) {
        
		Categoria c = dbcategorie.findById(categoriaId).orElse(null);
		piatto.setCategoria(c);
        Ristorante r = dbristoranti.findById(ristoranteId).orElse(null);
        piatto.setRistorante(r);
        piatto.setCategoria(c);
        dbpiatti.save(piatto);
    }
	
	@PutMapping("/ristoranti/{ristoranteId}/{categoriaId}")
	public void update(@PathVariable Long ristoranteId,@PathVariable Long categoriaId, @RequestBody Piatto piatto) {
		if (dbpiatti.findById(piatto.getId()).isPresent()) {
			Categoria c = dbcategorie.findById(categoriaId).orElse(null);
			piatto.setCategoria(c);
			Ristorante r = dbristoranti.findById(ristoranteId).orElse(null);
			piatto.setRistorante(r);
			dbpiatti.save(piatto);
		}
	}
	
	
	
	
	
	

}
