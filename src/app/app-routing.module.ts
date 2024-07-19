import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { WorkoutChartComponent } from './workout-chart/workout-chart.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  { path: '', component: WorkoutFormComponent },
  { path: 'workout-list', component: WorkoutListComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'user-chart/:userName', component: WorkoutChartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

