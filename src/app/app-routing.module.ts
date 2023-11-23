import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { MedHomeComponent } from './med-home/med-home.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { AppHomeComponent } from './app-home/app-home.component';

const routes: Routes = [
  { path: '', component: AppHomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'home', component: AppHomeComponent, pathMatch: 'full' },
  { path: 'file', component: FileUploadComponent, pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
