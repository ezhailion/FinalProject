import { StudentService } from 'src/app/services/student.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { Student } from 'src/app/models/student';
import { ReportService } from 'src/app/services/report.service';
import { Report } from 'src/app/models/report';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
})
export class ParentComponent {
  newMessage: Message = new Message();
  loggedInUser: User = new User();
  messages : Message [] = [];

  selectedStudent: Student | null = null;
  studentReports: Report[] = [];
  myKiddos : Student[] = [];


  constructor(
    private auth: AuthService,
    private router: Router,
    private messageService: MessageService,
    private studentService: StudentService,
    private reportService: ReportService,
  ) {}

  ngOnInit() {
    if (!this.auth.checkLogin()) {
      this.router.navigateByUrl('mustBeLoggedIn');
    }
    this.auth.getLoggedInUser().subscribe({
      next: (user) => {
        this.loggedInUser = user;
        this.loggedInUser = user;
        if (!this.auth.checkLogin()) {
          this.router.navigateByUrl('mustBeLoggedIn');
        }

        if (this.auth.checkLogin()) {
          if (user.role != "parent") {
            this.router.navigateByUrl('mustBeAParent');
          }
        }

      },
      error: (oops) => {
        console.error(
          'ParentComponent.getLoggedInUser() failed getting logged in user'
        );
        console.error(oops);
      },
    });
    this.loadAllMessages();
    this.loadAllKiddos();
  }

  loadAllMessages() {
    this.messageService.index().subscribe({
      next: (messages) => {
        this.messages = messages;

        console.log("MESSAGES")
        console.log(messages)
      },
      error: (oops) => {
        'ParentComponent.loadAllMessages() failed getting messages' + oops
      }
    })
  }

  createNewMessage(message: Message, recipientId: number) {
    this.messageService.create(message, recipientId).subscribe({
      next: (createdMessage) => {
        this.loadAllMessages();
      },
      error: (oops) => {
        'ParentComponent.createNewMessage() failed creating message' + oops
      }
    })
  }

  loadAllKiddos() {
    this.studentService.getStudentsByParent().subscribe({
      next: (students) => { this.myKiddos = students },
      error: (wat) => console.error("parent component cant load kids " + wat)
    })
  }

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
}
