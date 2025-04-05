import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';

import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

import { inject } from '@angular/core';

@Component({

  selector: 'app-register',

  standalone: true,

  imports: [CommonModule, FormsModule, RouterModule],

  templateUrl: './register.component.html',

  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  email = '';

  password = '';

  auth: Auth = inject(Auth);

  register() {

    createUserWithEmailAndPassword(this.auth, this.email, this.password)

      .then(userCredential => {

        alert('Registered successfully!');

        console.log(userCredential);

      })

      .catch(error => {

        alert(error.message);

        console.error(error);

      });

  }

}