package com.deadenddev.NotEatYet01.entities;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Ingrediente {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	private String nome;
	private boolean allergene = false;
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="piatto_id", nullable=false)
	@JsonIgnore
	Piatto piatto;
	
	public Ingrediente(String nome, boolean allergene, Piatto piatto) {
		super();
		this.nome = nome;
		this.allergene = allergene;
		this.piatto = piatto;
	}
	
	public Ingrediente() {
		super();
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public boolean isAllergene() {
		return allergene;
	}

	public void setAllergene(boolean allergene) {
		this.allergene = allergene;
	}

	public Piatto getPiatto() {
		return piatto;
	}

	public void setPiatto(Piatto piatto) {
		this.piatto = piatto;
	}
	
	
	
	
	
	

}
