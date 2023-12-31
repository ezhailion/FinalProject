import { Classroom } from './../../models/classroom';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Student } from 'src/app/models/student';
import { User } from 'src/app/models/user';
import { Report } from 'src/app/models/report';
import { AuthService } from 'src/app/services/auth.service';
import { ClassroomService } from 'src/app/services/classroom.service';
import { ReportService } from 'src/app/services/report.service';
import { StudentService } from 'src/app/services/student.service';
import { Behavior } from 'src/app/models/behavior';
import { TeacherService } from 'src/app/services/teacher.service';
import { Resource } from 'src/app/models/resource';
import { ResourceService } from 'src/app/services/resource.service';
import { Reflection } from 'src/app/models/reflection';



@Component({
  selector: 'app-teacher',
  template: `<highcharts-chart
  [Highcharts]="Highcharts"

  [constructorType]="chartConstructor"
  [options]="chartOptions"
  [callbackFunction]="chartCallback"

  [(update)]="updateFlag"
  [oneToOne]="oneToOneFlag"
  [runOutsideAngular]="runOutsideAngular"

  style="width: 100%; height: 400px; display: block;"
></highcharts-chart>`,
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css'],
})
export class TeacherComponent {
  loggedInUser: User = new User();
  classes: Classroom[] = [];

  editStudent: Student = new Student();
  filteredStudents: Student[] = [];
  newStudent: User = new User();
  selectedStudents: Student[] | null = null;
  selectedStudent: Student | null = null;
  editUser: User = new User();

  editClass: Classroom = new Classroom();
  createdClass: Classroom = new Classroom();
  selectedClass: Classroom = new Classroom();

  studentReports: Report[] = [];
  selectedReport: Report | null = null;

  behaviors : Behavior[] = [];

  newReport : Report = new Report();
  editReport : Report = new Report();

  selectedReportResources : Resource [] = [];
  resources : Resource [] = [];

  studentReflectionList: Reflection[] = [];



  constructor(
    private auth: AuthService,
    private router: Router,
    private modalService: NgbModal,
    private classroomService: ClassroomService,
    private studentService: StudentService,
    private reportService: ReportService,
    private teacherService: TeacherService,
    private resourceService: ResourceService
  ) {}

  //what the component does right away
  ngOnInit() {
    console.log(this.auth.loginUser)


    this.loadAllClasses();

    this.auth.getLoggedInUser().subscribe({
      next: (user) => {
        this.loggedInUser = user;
        if (!this.auth.checkLogin()) {
          this.router.navigateByUrl('mustBeLoggedIn');
        }

        if (this.auth.checkLogin()) {
          if (user.role != "teacher") {
            this.router.navigateByUrl('mustBeATeacher');
          }
        }
      },
      error: (oops) => {
        console.error(
          'TeacherComponent.getLoggedInUser() failed getting logged in user'
        );
        console.error(oops);
      },
    });

    this.loadAllBehaviors();
    this.loadAllResources();
  }

  updateClassroom(classroom: Classroom, classroomId: number) {
    this.teacherService.updateClassroom(classroom, classroomId ).subscribe({
      next: (classroom) => {
        console.log(classroom);
        this.editClass = this.selectedClass;
      }
    })
  }
  setEditUser() {
    this.editUser = Object.assign({}, this.selectedStudent?.whoami);
  }


  editOtherUser(userId: number, studentId: number, user: User){
    this.teacherService.editOtherUserDetails(studentId, userId, user).subscribe({
      next: (user) => {
        this.loadStudentFromClass(this.selectedClass.id, studentId)
      },
      error: (oops) => {
        console.error('TeacherComponent.editOtherUser(): error editing other user' + oops
        );
      }
    })
  }

  // this method is for the add class modal
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  //classroomService methods

  disableClass(classId: number) {
    this.classroomService.disable(classId).subscribe({
      next: () => {
        // pretty sure reload the classroom list *******************
      },
      error: (oops) => {
        console.error(
          'TeacherComponent.disableClass(): error disabling class' + oops
        )
      }
    })
  }

  removeStudentFromClass(classId: number, studentId: number) {
    this.classroomService.removeStudentFromClass(classId, studentId).subscribe({
      next: (classroom) => {
        console.log(classroom)
        this.loadAllStudentsFromClass(classId);
        this.loadAllStudentsFilter();
      },
      error: (oops) => {
        console.error(
          'TeacherComponent.removeStudentFromClass(): error removing student from class' + oops
        );
      }
    })
  }

  addStudentToClass(classId: number, studentId: number) {
    this.classroomService.addStudentToClass(classId, studentId).subscribe({
      next: (classroom) => {
        console.log(classroom)
        this.loadAllStudentsFromClass(classId);
        this.loadAllStudentsFilter();
      },
      error: (oops) => {
        console.error(
          'TeacherComponent.addStudentToClass(): error adding student to class' + oops
        );
      }
    })
  }

  loadAllClasses() {
    this.classroomService.index().subscribe({
      next: (classes) => {
        this.classes = classes;
        this.selectedStudent = null;
        this.selectedStudents = null;
      },
      error: (oops) => {
        console.error(
          'TeacherComponent.loadAllClasses(): error retrieving classes'
        );
        console.error(oops);
      },
    });
  }

  loadSingleClass(classId: number) {
    this.classroomService.show(classId).subscribe({
      next: (clz) => {
        this.selectedClass = clz;
        this.editClass = clz;
      },
      error: (oopsiedaisy) => {
        console.error(
          'TeachComponent.loadSingleClass(): err retriveing' + oopsiedaisy
        );
      },
    });
  }

  createNewClass(classroom: Classroom) {
    this.classroomService.create(classroom).subscribe({
      next: (clz) => {
        this.createdClass = new Classroom();
        this.loadAllClasses();
      },
      error: (oops) =>
        console.error('TeachComponent.createNewClass err ' + oops),
    });
  }

  //studentService methods


  loadAllStudentsFilter() {
    this.studentService.getStudents().subscribe({
      next: (students) => {
        this.filteredStudents = [];
        for(let student of students) {
          let addStudent: boolean = true;
          for(let classroom of student.classrooms) {
            if(classroom.id == this.selectedClass.id) {
              addStudent = false;
            }
          }
          if(addStudent){
            this.filteredStudents.push(student);
          }
        }
      },
      error: (oops) =>
      console.error('TeacherComponent.loadAllStudents err ' + oops),
    });
  }

  loadAllStudentsFromClass(classId: number) {
    this.loadSingleClass(classId);
    this.studentService.indexByClass(classId).subscribe({
      next: (students) => {
        this.selectedStudents = students;
        this.selectedStudent = null;
      },
      error: (oopsies) =>
        console.error('TeachComponent.loadStudents: err retriveing' + oopsies),
    });
  }

  loadStudentFromClass(classId: number, studentId: number) {
    this.studentService.showByClassId(classId, studentId).subscribe({
      next: (student) => {
        this.selectedStudent = student;
        this.selectedStudents = null;
        this.loadAllReportsForStudent(studentId);




      },
      error: (oopsiedoodles) =>
        console.error(
          'Teach Component.loadStudent: retrieval err ' + oopsiedoodles
        ),
    });
  }

  loadAllReflectionsForStudent(studentId: number) {
    this.studentService.indexReflections(studentId).subscribe({
      next: (reflections) => {
        this.studentReflectionList = reflections;
      },
      error: (rickroll) => {
        console.error(
          'Teach Component.loadAllReflectionsForStudent() error getting student reflections ' +
            rickroll
        );
      }
    })
  }

  //reportService methods
  loadAllReportsForStudent(studentId: number) {
    this.reportService.getAllStudentReports(studentId).subscribe({
      next: (reports) => {
        this.studentReports = reports;
      },
      error: (oopz) => {
        console.error(
          'Teach Component.loadAllReportsForStudent() error getting student reports ' +
            oopz
        );
      },
    });
  }

  loadSingleReport(reportId: number) {
    this.reportService.getSingleReport(reportId).subscribe({
      next: (report) => {
        this.selectedReportResources = [];
        this.selectedReport = report;
        for (let behavior of this.selectedReport.behaviors) {
          for (let resource of this.resources) {
            if (behavior?.id === resource.behavior?.id)
            this.selectedReportResources.push(resource);
          }

        }
        this.editReport = this.selectedReport;
      },
      error: (oopsiedaisy) => {
        console.error(
          'TeachComponent.loadSingleReport(): err retriveing report' + oopsiedaisy
        );
      },
    });
  }

  createNewReport(report : Report, studentUserId : number | undefined) {
    this.reportService.create(report, studentUserId).subscribe({
      next: report => {
        this.newReport = report;
        this.loadAllReportsForStudent(report.student.id);
      },

    })
  }

  resetNewReport(id : number) {
    this.newReport = new Report();
    this.loadAllReportsForStudent(id);
  }

//behavior methods start here
  loadAllBehaviors() {
    this.reportService.indexBehaviors().subscribe({
      next: bs => {
        this.behaviors = bs;
      },
      error: whoops => console.error("Teacher component. load behaviors . " + whoops)
    }
    )
  }

  //this method helps check the existing behaviors we need for the edit form
  haveBehavior(behaviorId: number, report: Report): boolean {
    return report.behaviors.some((b) => b.id === behaviorId);
  }

  //this method subscribes to the corresponding add or remove endpoint
  toggleReportBehavior(behaviorId: number, event: Event, reportId: number) {
    let isChecked = (<HTMLInputElement>event.target).checked

    if(isChecked) {
      this.teacherService.addBehaviorToReport(reportId, behaviorId).subscribe({
        next: (report) => {},
        error: (oopsie) => console.error("TeacherComponent. toggle behavior: on . " + oopsie)
      })
    }
    if(!isChecked) {
      this.teacherService.removeBehaviorFromReport(reportId, behaviorId).subscribe({
        next: () => {},
        error: (oopsie) => console.error("TeacherComponent. toggle behavior: off . " + oopsie)
      })
    }
  }

  deleteReport(reportId: number) {
    this.teacherService.deleteReport(reportId).subscribe({
      next: (report) => {
       console.log("report" + report);
       if(this.selectedStudent != null) {
        this.loadAllReportsForStudent(this.selectedStudent.id);
        this.selectedReport = null;
       }
      },
      error: (oopsie) => console.error("Teacher component. remove report. " + oopsie)
    })
  }
  deleteReflection(reflectionId: number) {
    this.teacherService.deleteReflection(reflectionId).subscribe({
      next: (reflection) => {
       console.log("reflection" + reflection);
       if(this.selectedStudent != null) {
        this.loadAllReflectionsForStudent(this.selectedStudent.id);
        this.selectedReport = null;
       }
      },
      error: (oopsie) => console.error("Teacher component.remove reflection. " + oopsie)
    })
  }

  updateReport(report : Report, reportId : number) {
    this.reportService.update(report, reportId).subscribe({
      next : (updated) => {
        if (this.selectedStudent != null) {
          this.loadAllReportsForStudent(this.selectedStudent.id);
          this.selectedReport = null;
        }
      },
      error : ohNO => console.error("error in teacher component, updating report " + ohNO)
    })
  }

  createStudent(user: User, classId: number) {
    this.studentService.createStudent(user, classId).subscribe({
      next: (student) => {
        this.loadAllStudentsFromClass(classId)
        this.newStudent = new User();
      },
      error: oops => console.error("Teacher Component. createStudent err " + oops)
    })
  }

  //RESOURCE METHODS
  loadAllResources() {
    this.resourceService.index().subscribe({
      next: (resources) => {
        this.resources = resources;
      },
       error: (oops) => {
        console.error("TeacherComponent.loadAllResources() err " + oops);
       }
    })
  }
}
