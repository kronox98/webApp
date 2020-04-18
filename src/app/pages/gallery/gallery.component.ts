import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  providers: [ NgbCarouselConfig ]
})
export class GalleryComponent implements OnInit {

  images = [700, 533, 807, 124].map((n) => `https://picsum.photos/id/${n}/900/500`);

  currentJustify = 'start';

  imgsP = [
    {
      src: './../../../assets/programming/1.jpg'
    },
    {
      src: './../../../assets/programming/3.jpg'
    },
    {
      src: './../../../assets/programming/4.jpg'
    },
    {
      src: './../../../assets/programming/2.jpg'
    },
    {
      src: './../../../assets/programming/3.jpg'
    },
    {
      src: './../../../assets/programming/5.jpg'
    }
  ]
  imgsW = [
    {
      src: './../../../assets/design/1.jpg',
      des: 'Código'
    },
    {
      src: './../../../assets/design/2.jpg',
      des: 'Color'
    },
    {
      src: './../../../assets/design/3.jpg',
      des: 'Diseño'
    },
    {
      src: './../../../assets/design/4.jpg',
      des: 'Herramientas de trabajo'
    },
    {
      src: './../../../assets/design/5.jpg',
      des: 'Planeación'
    },
    {
      src: './../../../assets/design/6.jpg',
      des: 'Creación'
    },
    {
      src: './../../../assets/design/7.jpg',
      des: 'Estructuración'
    },
    {
      src: './../../../assets/design/9.jpg',
      des: 'Creatividad'
    },
  ]
  imgsN = [
    {
      src: './../../../assets/naturaleza/1.jpg'
    },
    {
      src: './../../../assets/naturaleza/2.jpg'
    },
    {
      src: './../../../assets/naturaleza/3.jpg'
    },
    {
      src: './../../../assets/naturaleza/4.jpg'
    },
    {
      src: './../../../assets/naturaleza/5.jpg'
    }
  ]
  imgsO = [
    {
      src: './../../../assets/other/1.jpg'
    },
    {
      src: './../../../assets/other/2.jpg'
    },
    {
      src: './../../../assets/other/3.jpg'
    },
    {
      src: './../../../assets/other/4.jpg'
    },
    {
      src: './../../../assets/other/5.jpg'
    }
  ]

  constructor(private config: NgbCarouselConfig) { 
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = true;
  }

  ngOnInit(): void {
  }

}
