package com.skilldistillery.goodapples.entities;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Behavior {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	// TODO json_ignore for report
	// TODO add and remove methods
	
	@JsonIgnore
	@ManyToMany(mappedBy = "behaviors")
	private List<Report> reports;

	@JsonIgnore
	@OneToMany(mappedBy = "behavior")
	private List<Resource> resources;

	private String description;

	private String name;

	@ManyToOne
	@JoinColumn(name = "behavior_type_id")
	private BehaviorType behaviorType;

	public Behavior() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public List<Resource> getResources() {
		return resources;
	}

	public void setResources(List<Resource> resources) {
		this.resources = resources;
	}

	public List<Report> getReports() {
		return reports;
	}

	public void setReports(List<Report> reports) {
		this.reports = reports;
	}

	public String getDescription() {
		return description;
	}

	public BehaviorType getBehaviorType() {
		return behaviorType;
	}

	public void setBehaviorType(BehaviorType behaviorType) {
		this.behaviorType = behaviorType;
	}

	public void setDescription(String description) {
		this.description = description;
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

	public void addReport(Report report) {
		if (reports == null) {
			reports = new ArrayList<>();
		}
		if (!reports.contains(report)) {
			reports.add(report);
			report.addBehavior(this);
		}
	}

	public void removeReport(Report report) {
		if (reports != null && reports.contains(report)) {
			reports.remove(report);
			report.removeBehavior(this);
		}
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Behavior other = (Behavior) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "Behavior [id=" + id + ", description=" + description + ", name=" + name + "]";
	}

}
