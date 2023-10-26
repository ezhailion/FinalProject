package com.skilldistillery.goodapples.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.goodapples.entities.Classroom;
import com.skilldistillery.goodapples.entities.User;
import com.skilldistillery.goodapples.repositories.ClassRepository;
import com.skilldistillery.goodapples.repositories.UserRepository;

@Service
public class ClassServiceImpl implements ClassService {

	@Autowired
	private ClassRepository classRepo;

	@Autowired
	private UserRepository userRepo;

	@Override
	public List<Classroom> index(String username) {
		return classRepo.findByTeacher_Username(username);
	}

	@Override
	public Classroom show(String username, int classId) {
		Classroom classroom = classRepo.searchById(classId);
		User teacher = userRepo.findByUsername(username);
		if (teacher != null && teacher.getId() == classroom.getTeacher().getId()) {
			return classroom;
		}
		return null;
	}

	@Override
	public Classroom create(String username, Classroom newClass) {
		User teacher = userRepo.findByUsername(username);
		if (teacher != null) {
			newClass.setTeacher(teacher);
			newClass.setEnabled(true);
			return classRepo.saveAndFlush(newClass);
		}
		return null;
	}

	@Override
	public Classroom update(String username, int classId, Classroom updatedClass) {
		Classroom managedClass = classRepo.searchById(classId);
		User teacher = userRepo.findByUsername(username);
		if (teacher != null && teacher.getId() == managedClass.getTeacher().getId()) {
			if (managedClass != null) {
				managedClass.setName(updatedClass.getName());
				managedClass.setStartTime(updatedClass.getStartTime());
				managedClass.setEndTime(updatedClass.getEndTime());
				managedClass.setEnabled(updatedClass.getEnabled());
				classRepo.saveAndFlush(managedClass);
			}
		}
		return managedClass;
	}

	@Override
	public boolean destroy(String username, int classId) {
		Classroom classToDelete = classRepo.searchById(classId);
		User teacher = userRepo.findByUsername(username);
		if (teacher != null && teacher.getId() == classToDelete.getTeacher().getId()) {
			if (classToDelete != null) {
				classRepo.delete(classToDelete);
				return true;
			}
		}
		return false;
	}

}
