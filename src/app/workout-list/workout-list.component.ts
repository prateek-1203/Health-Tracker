import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../workout.service';
import { Workout } from '../workout.model';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit {
  workouts: Workout[] = [];

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.workouts = this.workoutService.getWorkouts();
  }

  getNumberOfWorkouts(userName: string): number {
    return this.workoutService.getNumberOfWorkouts(userName);
  }
 
  getWorkoutsByUser(userName: string): Workout[] {
    const workouts = this.workoutService.getWorkouts();
    return workouts.filter(workout => workout.userName === userName);
  }

}
