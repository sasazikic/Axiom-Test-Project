import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { FormComponent } from './modules/form/form.component';

const routes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "form", component: FormComponent },
  { path: '', redirectTo: "/dashboard", pathMatch: "full"},
  { path: '**', redirectTo: "/dashboard" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
