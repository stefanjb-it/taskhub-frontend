import {Component, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NgbCarousel, NgbSlide} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {TaskService} from "../../services/task.service";
import { Task } from 'src/app/models/Task';

@Component({
  selector: 'app-task-image-carousel',
  standalone: true,
  imports: [CommonModule, NgbCarousel, NgbSlide, NgOptimizedImage],
  templateUrl: './task-image-carousel.component.html',
  styleUrl: './task-image-carousel.component.scss'
})
export class TaskImageCarouselComponent implements OnInit {
  pictures: string[] = []
  task: Task | undefined;

  selection : string | undefined | null;


  constructor(private route:ActivatedRoute, private taskService: TaskService, private router: Router) {
  }

  ngOnInit() {
    this.selection = this.route.snapshot.paramMap.get('id');
    if(this.selection) {
      this.taskService.getTask(parseInt(this.selection)).subscribe( data => {
        this.task = data
        if (this.task?.images) {
          this.task?.images?.map((image) => this.pictures.push('/api/tasks/' + this.selection + '/images/' + image.id))
        } else {
          this.router.navigate(['edit-task/'+this.selection])
        }
      })
    }
  }
}
