package com.skilldistillery.goodapples.entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
public class Report {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	// TODO json_ignore for behavior
	// TODO add and remove methods
	@ManyToMany
	@JoinTable(name = "report_has_behavior", joinColumns = @JoinColumn(name = "report_id"), inverseJoinColumns = @JoinColumn(name = "behavior_id"))

	private List<Behavior> behaviors;

	private String notes;

	@CreationTimestamp
	@Column(name = "create_date")
	private LocalDateTime createDate;

	@UpdateTimestamp
	@Column(name = "last_update")
	private LocalDateTime lastUpdate;

	private Boolean enabled;

	@ManyToOne
	@JoinColumn(name = "teacher_id")
	private User teacher;

	@ManyToOne
	@JoinColumn(name = "student_id")
	private Student student;

	public Report() {
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

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public LocalDateTime getCreateDate() {
		return createDate;
	}

	public void setCreateDate(LocalDateTime createDate) {
		this.createDate = createDate;
	}

	public LocalDateTime getLastUpdate() {
		return lastUpdate;
	}

	public void setLastUpdate(LocalDateTime lastUpdate) {
		this.lastUpdate = lastUpdate;
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	public User getTeacher() {
		return teacher;
	}

	public void setTeacher(User teacher) {
		this.teacher = teacher;
	}

	public Student getStudent() {
		return student;
	}

	public void setStudent(Student student) {
		this.student = student;
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
		Report other = (Report) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "Report [id=" + id + ", notes=" + notes + ", createDate=" + createDate + ", lastUpdate=" + lastUpdate
				+ ", enabled=" + enabled + "]";
	}

	public void addBehavior(Behavior behavior) {
		if (behaviors == null) {
			behaviors = new ArrayList<>();
		}
		if (!behaviors.contains(behavior)) {
			behaviors.add(behavior);
			behavior.addReport(this);
		}
	}

	public void removeBehavior(Behavior behavior) {
		if (behaviors != null && behaviors.contains(behavior)) {
			behaviors.remove(behavior);
			behavior.removeReport(this);
		}
	}

}
