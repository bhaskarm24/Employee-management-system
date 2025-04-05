import { Component, OnInit } from '@angular/core';

import { Firestore, collection, collectionData, deleteDoc, doc } from '@angular/fire/firestore';

import { Employee } from '../../model/employee.model';

import { Observable } from 'rxjs';

import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-employees',
  standalone: true,

  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];

  filteredEmployees: Employee[] = [];

  searchTerm: string = '';

  sortOption: string = '';

  selectedDesignation: string = '';

  designations: string[] = [];

  currentPage: number = 1;

  itemsPerPage: number = 5;

  totalPages: number = 1;

  constructor(private firestore: Firestore) { }

  ngOnInit(): void {

    this.fetchEmployees();

  }

  fetchEmployees(): void {

    const employeeRef = collection(this.firestore, 'employees');

    collectionData(employeeRef, { idField: 'id' }).subscribe({

      next: (data) => {

        this.employees = data as Employee[];

        // Extract unique designations

        this.designations = [...new Set(this.employees.map(emp => emp.designation))];

        this.applyFilters();

      },

      error: (err) => console.error('Error fetching employees:', err)

    });

  }

  applyFilters(): void {

    let data = [...this.employees];

    if (this.searchTerm.trim()) {

      const term = this.searchTerm.toLowerCase();

      data = data.filter(emp =>

        emp.name.toLowerCase().includes(term) ||

        emp.designation.toLowerCase().includes(term)

      );

    }

    if (this.selectedDesignation) {

      data = data.filter(emp => emp.designation === this.selectedDesignation);

    }

    if (this.sortOption === 'name') {
      data.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.sortOption === 'experience') {
      data.sort((a, b) => b.experience - a.experience);
    }
    
    this.filteredEmployees = data;

    this.totalPages = Math.ceil(this.filteredEmployees.length / this.itemsPerPage);

    this.currentPage = 1;

  }

  get paginatedEmployees(): Employee[] {

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;

    return this.filteredEmployees.slice(startIndex, startIndex + this.itemsPerPage);

  }

  goToPage(page: number): void {

    if (page >= 1 && page <= this.totalPages) {

      this.currentPage = page;

    }

  }

  nextPage(): void {

    this.goToPage(this.currentPage + 1);

  }

  prevPage(): void {

    this.goToPage(this.currentPage - 1);

  }

  deleteEmployee(id: string): void {

    const confirmDelete = confirm('Are you sure you want to delete this employee?');

    if (confirmDelete) {
      const employeeDoc = doc(this.firestore, `employees/${id}`);
      deleteDoc(employeeDoc).then(() => {
        this.fetchEmployees();
      }).catch((error) => {
        console.error('Error deleting employee:', error);
      });
    }

  }

}