import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { TaskComponent } from './pages/task/task.component';
import { ContactComponent } from './pages/contact/contact.component';
import { MapComponent } from './pages/map/map.component';



const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'gallery',
    component: GalleryComponent
  },
  {
    path: 'task',
    component: TaskComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'maps',
    component: MapComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
