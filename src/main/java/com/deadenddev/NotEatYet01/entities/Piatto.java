package com.deadenddev.NotEatYet01.entities;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Piatto {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String nome;
	private double prezzo;
	private String descrizione;
	// abbiamo cambiato il fetchtype da LAZY a EAGER perche` POSTMAN dava 500 a get su /piatti
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="categoria_id", nullable=false)
	private Categoria categoria;
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="ristorante_id", nullable=false)
	@JsonIgnore
	private Ristorante ristorante;
	@Transient
	private List<Ingrediente> ingredienti;
	
	public String getDescrizione() {
		return descrizione;
	}
	public void setDescrizione(String descrizione) {
		this.descrizione = descrizione;
	}
	public Piatto(long id, String nome, double prezzo, String descrizione, Categoria categoria, Ristorante ristorante,
			List<Ingrediente> ingredienti) {
		super();
		this.id = id;
		this.nome = nome;
		this.prezzo = prezzo;
		this.descrizione = descrizione;
		this.categoria = categoria;
		this.ristorante = ristorante;
		this.ingredienti = ingredienti;
	}
	public Piatto() {
		super();
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public double getPrezzo() {
		return prezzo;
	}
	public void setPrezzo(double prezzo) {
		this.prezzo = prezzo;
	}
	public Categoria getCategoria() {
		return categoria;
	}
	public void setCategoria(Categoria categoria) {
		this.categoria = categoria;
	}
	public Ristorante getRistorante() {
		return ristorante;
	}
	public void setRistorante(Ristorante ristorante) {
		this.ristorante = ristorante;
	}
	public List<Ingrediente> getIngredienti() {
		return ingredienti;
	}
	public void setIngredienti(List<Ingrediente> ingredienti) {
		this.ingredienti = ingredienti;
	}

	

}
