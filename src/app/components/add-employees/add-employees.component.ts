import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Router, ActivatedRoute, RouterModule } from '@angular/router';

import { Firestore, collection, addDoc, doc, getDoc, updateDoc } from '@angular/fire/firestore';

import { Employee } from '../../model/employee.model';

@Component({
  selector: 'app-add-employees',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-employees.component.html',
  styleUrls: ['./add-employees.component.css']
})
export class AddEmployeesComponent implements OnInit {

  name = '';

  designation = '';

  experience!: number;

  isEditMode = false;

  employeeId: string | null = null;

  constructor(

    private firestore: Firestore,

    private router: Router,

    private route: ActivatedRoute

  ) { }

  ngOnInit() {

    this.employeeId = this.route.snapshot.paramMap.get('id');

    if (this.employeeId) {

      this.isEditMode = true;

      const empDocRef = doc(this.firestore, `employees/${this.employeeId}`);
      getDoc(empDocRef).then(docSnap => {

        if (docSnap.exists()) {

          const data = docSnap.data() as Employee;

          this.name = data.name;

          this.designation = data.designation;

          this.experience = data.experience;

        }

      });

    }

  }

  submitForm() {

    if (this.isEditMode && this.employeeId) {
      const empRef = doc(this.firestore, `employees/${this.employeeId}`);
      
      updateDoc(empRef, {

        name: this.name,

        designation: this.designation,

        experience: this.experience

      }).then(() => {

        alert('Employee updated successfully');

        this.router.navigate(['/dashboard/employees']);

      });

    } else {

      const empCollection = collection(this.firestore, 'employees');

      addDoc(empCollection, {

        name: this.name,

        designation: this.designation,

        experience: this.experience

      }).then(() => {

        alert('Employee added');

        this.router.navigate(['/dashboard/employees']);

      });

    }

  }

}