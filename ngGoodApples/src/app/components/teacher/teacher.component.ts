import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Classroom } from 'src/app/models/classroom';
import { Student } from 'src/app/models/student';
import { User } from 'src/app/models/user';
import { Report } from 'src/app/models/report';
import { AuthService } from 'src/app/services/auth.service';
import { ClassroomService } from 'src/app/services/classroom.service';
import { ReportService } from 'src/app/services/report.service';
import { StudentService } from 'src/app/services/student.service';
import { Behavior } from 'src/app/models/behavior';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css'],
})
export class TeacherComponent {
  loggedInUser: User = new User();
  classes: Classroom[] = [];

  selectedStudents: Student[] | null = null;
  selectedStudent: Student | null = null;

  createdClass: Classroom = new Classroom();
  selectedClass: Classroom = new Classroom();

  studentReports: Report[] = [];
  selectedReport: Report | null = null;

  behaviors : Behavior[] = [];

  newReport : Report = new Report();
  editReport : Report = new Report();

  constructor(
    private auth: AuthService,
    private router: Router,
    private modalService: NgbModal,
    private classroomService: ClassroomService,
    private studentService: StudentService,
    private reportService: ReportService,
    private teacherService: TeacherService
  ) {}

  //what the component does right away
  ngOnInit() {
    if (!this.auth.checkLogin()) {
      this.router.navigateByUrl('mustBeLoggedIn');
    }
    this.loadAllClasses();

    this.auth.getLoggedInUser().subscribe({
      next: (user) => {
        this.loggedInUser = user;
      },
      error: (oops) => {
        console.error(
          'TeacherComponent.getLoggedInUser() failed getting logged in user'
        );
        console.error(oops);
      },
    });

    this.loadAllBehaviors();

  }

  // this method is for the add class modal
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  //classroomService methods
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
        this.selectedReport = report;
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
        this.newReport = new Report();
        this.loadAllReportsForStudent(report.student.id);
      },

    })
  }

//behavior methods start here
  loadAllBehaviors() {
    this.reportService.indexBehaviors().subscribe({
      next: bs => {
        this.behaviors = bs;
        console.log(bs);
      },
      error: whoops => console.error("Teacher component. load behaviors . " + whoops)
    }
    )
  }

  //this method helps check the behaviors we need for the edit form
  haveBehavior(behaviorId: number, report: Report): boolean {
    return report.behaviors.some((b) => b.id === behaviorId);
  }

  toggleReportBehavior(behaviorId: number, event: Event, reportId: number) {
    console.log(behaviorId)
    console.log(event)
    console.log(typeof event.target)
    let isChecked = (<HTMLInputElement>event.target).checked
    console.log(isChecked);

    if(isChecked) {
      this.teacherService.addBehaviorToReport(reportId, behaviorId).subscribe({
        next: (report) => {
          console.log(report);
        },
        error: (oopsie) => console.error("Teacher component. toggle behavior: on . " + oopsie)
      })
    }
    if(!isChecked) {
      this.teacherService.removeBehaviorFromReport(reportId, behaviorId).subscribe({
        next: () => {
          //maybe something here?
        },
        error: (oopsie) => console.error("Teacher component. toggle behavior: off . " + oopsie)
      })
    }
  }
}
