import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollectionGroup, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { config } from './../../models/app.config';
import { Task } from 'src/app/models/app.model';
import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface Shirt { name: string; price: number; }
export interface ShirtId extends Shirt { id: string; }
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @ViewChild('alert', { static: true }) alert: ElementRef;
  @ViewChild('modal', { static: true }) modal: ElementRef;
  private tasksCollection: AngularFirestoreCollection<Task>;
  tasks: Observable<Task[]>;
  tempID: any;
  taskForm = {
    descripcion: '',
    realizada: false,
    position: {
      lat: '',
      lgt: ''
    }
  }

  constructor(private taskService: TaskService, private db: AngularFirestore, public modalser: NgbModal) {
    
    this.tasksCollection = this.db.collection<Task>(config.collection_endpoint, ref => ref.orderBy('descripcion', 'asc'));

    this.tasks = this.tasksCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Task;
        const id = a.payload.doc.id;
        console.log(data);
        
        return { id, ...data };
      }))
    ); 
    
  }


  ngOnInit() {
    
  }

  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
  }

  getTasks() {
    // this.getTasks();
  }

  open(content, id) {
    this.modalser.open(content);
    this.tempID = id;
  }

  updateTask(task: Task) {
    console.log('Task before: ', task);

    const taskUpdate = {
      id: task.id,
      descripcion: task.descripcion,
      realizada: !task.realizada,
      position: task.position
    }

    this.taskService.updateTask(taskUpdate);
    
  }

  deleteTask() {
    console.log('ID: ', this.tempID);
    if (this.tempID != '' && this.tempID != undefined) {
      this.taskService.removeTask(this.tempID);
      this.modalser.dismissAll();
    }
  }

  addTask(fTask: NgForm){
    console.log('Agregando tarea ...');
    // console.log(fTask.value);
    if (this.taskForm.descripcion == '') {
      this.alert.nativeElement.classList.add('show');
      setTimeout(() => {
        this.alert.nativeElement.classList.remove('show');
      }, 2000);
    }else{
      this.getPosition()
      .then( pos => {
        this.taskForm.position = pos;
        this.taskService.addTask(this.taskForm);
        this.taskForm.descripcion = '';
      }).catch( err => {
        alert('No fue posible obtener la úbicacion, por favor concede el permiso');
      });
    }
  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition( resp => {
        resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
      },
      err => {
        reject(err);
      });
    })
  }
}
