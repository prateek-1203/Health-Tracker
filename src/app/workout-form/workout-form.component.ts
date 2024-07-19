import { Component } from '@angular/core';
import { WorkoutService } from '../workout.service';
import { Workout } from '../workout.model';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css']
})
export class WorkoutFormComponent {
  userName: string = '';
  workoutType: string = '';
  workoutMinutes: number = 0;

  constructor(private workoutService: WorkoutService) {}

  onSubmit() {
    const newWorkout: Workout = {
      userName: this.userName,
      workoutType: this.workoutType,
      workoutMinutes: this.workoutMinutes
    };

    this.workoutService.addWorkout(newWorkout);

    // Reset form fields
    this.userName = '';
    this.workoutType= '';
    this.workoutMinutes = 0;
  }
}