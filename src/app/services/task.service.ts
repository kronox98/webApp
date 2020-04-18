import { Injectable } from '@angular/core';
// import { Task } from '../interfaces/interfaces';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Task } from '../models/app.model';
import { config } from '../models/app.config';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: AngularFirestoreCollection<Task>;
  private taskDoc: AngularFirestoreDocument<Task>;

  constructor(private db: AngularFirestore) { 
    this.tasks = this.db.collection<Task>(config.collection_endpoint);
  }

  updateTask(task) {    
    this.tasks.doc(task.id).update(task)
    .then( data => {
      console.log("Tarea actualizada correctamente");
    });
  }

  addTask(task: any) {
    this.tasks.add(task)
    .then( data => {
      console.log('Tarea agregada correctamente');      
    })
    .catch( err => {
      console.error('No fué posible agregar la tarea');      
    });    
  }

  removeTask(id: string) {
    this.tasks.doc(id).delete()
    .then(data => {
        console.log('Tarea removida', data);
    })
    .catch(
      err => {
        console.error('Error eliminando tarea', err);        
      }
    )
  }
}
