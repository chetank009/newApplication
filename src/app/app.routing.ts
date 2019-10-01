import { Routes, RouterModule } from "@angular/router";
import { EmployeeComponent } from './employee/employee.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

const arr : Routes=[
  {path:'',component:HomeComponent},
  {path:'employee', component:EmployeeComponent},
  {path:'about', component:AboutComponent}

];

export const routing=RouterModule.forRoot(arr);
