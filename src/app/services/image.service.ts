import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http:HttpClient) { }

  uploadProfilePicture(id: number, image: FormData) {
    this.http.post("/api/users/" + id + "/image/", image)
  }

  deleteProfilePicture(id: number) {
    this.http.delete("/api/users/" + id + "/image/")
  }

  uploadTaskImage(id: number, image: FormData) {
    this.http.post("/api/tasks/" + id + "/images/", image)
  }

  deleteTaskImage(taskId: number, imageId: number) {
    this.http.delete("/api/tasks/" + taskId + "/images/" + imageId + "/")
  }
}
