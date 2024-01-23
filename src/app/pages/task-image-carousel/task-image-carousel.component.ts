import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbCarousel, NgbSlide} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-task-image-carousel',
  standalone: true,
  imports: [CommonModule, NgbCarousel, NgbSlide],
  templateUrl: './task-image-carousel.component.html',
  styleUrl: './task-image-carousel.component.scss'
})
export class TaskImageCarouselComponent implements OnInit {
  pictures: any[] = [1, 2, 3, 4];


  constructor() {
  }

  ngOnInit() {

  }

}
