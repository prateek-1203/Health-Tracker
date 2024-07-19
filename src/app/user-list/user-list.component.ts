import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../workout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: string[] = [];

  constructor(private workoutService: WorkoutService, private router: Router) { }

  ngOnInit() {
    this.users = this.workoutService.getUsers();
  }

  viewUserChart(userName: string) {
    this.router.navigate(['/user-chart', userName]);
  }
}
