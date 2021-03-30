import { InventoryComponent } from './inventory/inventory.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'inventory', component: InventoryComponent},
  {path: 'inventory:status', component:InventoryComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, AppComponent, SignUpComponent, InventoryComponent];