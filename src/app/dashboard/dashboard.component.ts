import { Component } from '@angular/core';

import { RouterModule, Router } from '@angular/router';

import { CommonModule } from '@angular/common';

import { Auth, signOut } from '@angular/fire/auth';

import { inject } from '@angular/core';

@Component({

  selector: 'app-dashboard',

  standalone: true,

  imports: [CommonModule, RouterModule],

  templateUrl: './dashboard.component.html',

  styleUrls: ['./dashboard.component.css']

})

export class DashboardComponent {

  auth: Auth = inject(Auth);

  router: Router = inject(Router);

  logout() {

    signOut(this.auth).then(() => {

      this.router.navigate(['/login']);

    });

  }

}