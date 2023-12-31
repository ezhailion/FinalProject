
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { ParentComponent } from './components/parent/parent.component';
import { StudentComponent } from './components/student/student.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EditAccountDetailsComponent } from './components/edit-account-details/edit-account-details.component';
import { AboutComponent } from './components/about/about.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { MessagesComponent } from './components/messages/messages.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'teacher', component: TeacherComponent },
  { path: 'parent', component: ParentComponent },
  { path: 'student', component: StudentComponent },
  { path: 'editAccount', component: EditAccountDetailsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'resources', component : ResourcesComponent},
  { path: 'messages', component : MessagesComponent },
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
