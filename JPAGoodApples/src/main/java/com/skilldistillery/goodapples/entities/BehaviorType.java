package com.skilldistillery.goodapples.entities;

import java.util.List;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "behavior_type")
public class BehaviorType {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@JsonIgnore
	@OneToMany(mappedBy="behaviorType")
	private List<Behavior> behaviors;
	
	private String name;

	public BehaviorType() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	
	public List<Behavior> getBehaviors() {
		return behaviors;
	}

	public void setBehaviors(List<Behavior> behaviors) {
		this.behaviors = behaviors;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		BehaviorType other = (BehaviorType) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "BehaviorType [id=" + id + ", name=" + name + "]";
	}
	
	
	
}
