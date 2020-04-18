import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Task } from 'src/app/models/app.model';
import { config } from 'src/app/models/app.config';

declare var mapboxgl;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {

  tasks = [];
  tasksCollection: AngularFirestoreCollection<Task>;
  show: boolean;
  showAlert = false;

  constructor(private db: AngularFirestore) { 
    this.tasksCollection = this.db.collection<Task>(config.collection_endpoint);
    this.db.collection("task").get().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          this.tasks.push(doc.data());          
      });
    });
    setTimeout(() => {
      this.initMap();
    }, 500);

    setTimeout(() => {
      if (this.tasks.length == 0) {
        this.showAlert = true;
      }
    }, 1000);
  }

  ngOnInit() { }

  initMap() {
    const latitud = Number(4.6150663);
    const longitud = Number(-74.18780869999999);
    mapboxgl.accessToken = 'pk.eyJ1Ijoia3Jvbm94OTgiLCJhIjoiY2s4d2x5eTE3MHkxczNncHJieGFrNWJ2MCJ9.w8H-zwnxhJ8e-QhHNrZaFg';
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ longitud, latitud ],
      zoom: 10
    });
    this.setMarkers(map);
  }

  setMarkers(map) {
    setTimeout(() => {
      this.tasks.forEach(element => {
        var popup = new mapboxgl.Popup({ offset: 100 }).setText(
          element.descripcion
        );
        const marker = new mapboxgl.Marker()
          .setLngLat([ element.position.lng, element.position.lat ])
          .setPopup( popup )
          .addTo( map );
      });
    }, 500);
  }
}