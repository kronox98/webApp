import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { config } from './../../models/app.config';
import { Task } from 'src/app/models/app.model';
import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private taskService: TaskService, private db: AngularFirestore, public modalser: NgbModal, private _snackBar: MatSnackBar) {
    this.tasksCollection = this.db.collection<Task>(config.collection_endpoint, ref => ref.orderBy('descripcion', 'asc'));
    this.tasks = this.tasksCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Task;
        const id = a.payload.doc.id;        
        return { id, ...data };
      }))
    );     
  }

  ngOnInit() {
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open( message, action, {
      duration: 2000,
    });
  }

  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
  }

  open(content, id) {
    this.modalser.open(content);
    this.tempID = id;
  }

  updateTask(task: Task) {
    const taskUpdate = {
      id: task.id,
      descripcion: task.descripcion,
      realizada: !task.realizada,
      position: task.position
    }
    this.taskService.updateTask(taskUpdate);
    this.openSnackBar('Tarea actualizada correctamente', 'Aceptar');
  }

  deleteTask() {
    if (this.tempID != '' && this.tempID != undefined) {
      this.taskService.removeTask(this.tempID);
      this.openSnackBar('Tarea eliminada correctamente', 'Aceptar');
      this.modalser.dismissAll();
    }
  }

  addTask(fTask: NgForm){
    if (this.taskForm.descripcion == '') {
      this.alert.nativeElement.classList.add('show');
      setTimeout(() => {
        this.alert.nativeElement.classList.remove('show');
      }, 2000);
    }else {
      this.getPosition()
      .then( pos => {
        this.taskForm.position = pos;
        this.taskService.addTask(this.taskForm);
        this.taskForm.descripcion = '';
        this.openSnackBar('La tarea fué agregada correctamente', 'Aceptar');
      }).catch( err => {
        this.openSnackBar('No fué posible obtener la ubicación. Por favor, permite al acceso', 'Aceptar');
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
