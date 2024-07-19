
import { Injectable } from '@angular/core';
import { Workout } from './workout.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private storageKey = 'workouts';

  constructor() {
    if (!localStorage.getItem(this.storageKey)) {
      const defaultWorkouts: Workout[] = [
        { userName: 'John Doe', workoutType: 'Cardio', workoutMinutes: 30 },
        { userName: 'Jane Smith', workoutType: 'Strength', workoutMinutes: 45 },
        { userName: 'Alice Johnson', workoutType:'Flexibility', workoutMinutes: 20 }
      ];
      localStorage.setItem(this.storageKey, JSON.stringify(defaultWorkouts));
    }
  }

  private getStoredWorkouts(): Workout[] {
    const storedWorkouts = localStorage.getItem(this.storageKey);
    return storedWorkouts ? JSON.parse(storedWorkouts) : [];
  }

  private saveWorkouts(workouts: Workout[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(workouts));
  }

  getWorkouts(): Workout[] {
    return this.getStoredWorkouts();
  }

  getUsers(): string[] {
    const workouts = this.getStoredWorkouts();
    return [...new Set(workouts.map(workout => workout.userName))];
  }

  getWorkoutsByUser(userName: string): Workout[]  {
    const workouts = this.getStoredWorkouts();
    return workouts.filter(workout => workout.userName === userName);
  }

  getNumberOfWorkouts(userName: string): number {
    const userWorkouts = this.getWorkoutsByUser(userName);
    return userWorkouts.reduce((count, workout) => count + workout.workoutType.split(',').length, 0);
  }

  addWorkout(workout: Workout): void {
    const workouts = this.getStoredWorkouts();
    const existingUser = workouts.find(w => w.userName === workout.userName);

    if (existingUser) {
      existingUser.workoutType += `, ${workout.workoutType}`;
      existingUser.workoutMinutes += workout.workoutMinutes;
    } else {
      workouts.push(workout);
    }

    this.saveWorkouts(workouts);
  }
}