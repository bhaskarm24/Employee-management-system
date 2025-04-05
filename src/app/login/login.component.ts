import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { RouterModule, Router } from '@angular/router';

import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

import { inject } from '@angular/core';

@Component({

  selector: 'app-login',

  standalone: true,
  templateUrl: './login.component.html',

  imports: [CommonModule, FormsModule, RouterModule],

  styleUrls: ['./login.component.css']

})

export class LoginComponent {

  email = '';

  password = '';

  errorMessage = '';

  auth: Auth = inject(Auth);

  router: Router = inject(Router); // Inject Router

  login() {

    signInWithEmailAndPassword(this.auth, this.email, this.password)

      .then(userCredential => {

        console.log('Login successful:', userCredential);

        alert('Login successful!');

        this.router.navigate(['/dashboard']); // Redirect after login

      })

      .catch(error => {

        console.error('Login Error:', error);

        this.errorMessage = error.message;

      });

  }

}