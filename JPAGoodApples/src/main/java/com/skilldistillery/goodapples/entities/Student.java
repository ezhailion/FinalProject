package com.skilldistillery.goodapples.entities;

import java.util.List;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

@Entity
public class Student {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	//TODO json_ignore for behavior
	//TODO add and remove methods
	@ManyToMany
	@JoinTable(name = "student_has_class", 
				joinColumns=@JoinColumn(name = "student_id"),
				inverseJoinColumns=@JoinColumn(name = "classroom_id"))
	private List<Classroom> classrooms;
	
	//TODO json_ignore for behavior
	//TODO add and remove methods
	@ManyToMany
	@JoinTable(name = "parent_has_student", 
				joinColumns=@JoinColumn(name = "student_id"),
				inverseJoinColumns=@JoinColumn(name = "parent_id"))
	private List<User> parents;
	
	
	private String accommodations;
	
	private String nickname;

	public Student() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
	

	public List<User> getParents() {
		return parents;
	}

	public void setParents(List<User> parents) {
		this.parents = parents;
	}

	public List<Classroom> getClassrooms() {
		return classrooms;
	}

	public void setClassrooms(List<Classroom> classrooms) {
		this.classrooms = classrooms;
	}

	
	
	

	public String getAccommodations() {
		return accommodations;
	}

	public void setAccommodations(String accommodations) {
		this.accommodations = accommodations;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
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
		Student other = (Student) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "Student [id=" + id + ", accomodations=" + accommodations + ", nickname=" + nickname + "]";
	}
	
	
}
