import { Routes } from '@angular/router';
import { AddEmployeesComponent } from './components/add-employees/add-employees.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', redirectTo: 'register', pathMatch: 'full' },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            { path: '', redirectTo: 'employees', pathMatch: 'full' },
            { path: 'employees', component: EmployeesComponent },
            { path: 'add', component: AddEmployeesComponent },
            { path: 'edit/:id', component: AddEmployeesComponent }
        ]
    }

];
