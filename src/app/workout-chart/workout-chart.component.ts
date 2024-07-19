

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartData, ChartOptions } from 'chart.js';
import { WorkoutService } from '../workout.service';

@Component({
  selector: 'app-workout-chart',
  templateUrl: './workout-chart.component.html',
  styleUrls: ['./workout-chart.component.css']
})
export class WorkoutChartComponent implements OnInit {
  public chartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };
  public chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
  userName: string | null = null;

  constructor(private workoutService: WorkoutService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userName = params.get('userName');
      if (this.userName) {
        this.updateChartData(this.userName);
      }
    });
  }

  updateChartData(userName: string) {
    const workouts = this.workoutService.getWorkoutsByUser(userName);

    const workoutTypeMap: { [key: string]: number } = {};
    workouts.forEach(workout => {
      const workoutTypes = workout.workoutType.split(',').map(type => type.trim());
      workoutTypes.forEach(type => {
        if (!workoutTypeMap[type]) {
          workoutTypeMap[type] = 0;
        }
        workoutTypeMap[type] += workout.workoutMinutes;
      });
    });

    this.chartData = {
      labels: Object.keys(workoutTypeMap),
      datasets: [
        {
          label: 'Workout Minutes',
          data: Object.values(workoutTypeMap),
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }
      ]
    };
  }
}