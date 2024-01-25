import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http:HttpClient) { }

  uploadProfilePicture(id: number, image: FormData) {
    return this.http.post("/api/users/" + id + "/image", image)
  }

  deleteProfilePicture(id: number) {
    return this.http.delete("/api/users/" + id + "/image")
  }

  getProfilePicture(id: number) {
    return this.http.get("/api/users/" + id + "/image")
  }

  getTaskImage(id: number, imgID: number) {
    return this.http.get("/api/tasks/" + id + "/images/" + imgID)
  }

  uploadTaskImage(id: number, image: FormData) {
    return this.http.post("/api/tasks/" + id + "/images", image)
  }

  deleteTaskImage(taskId: number, imageId: number) {
    return this.http.delete("/api/tasks/" + taskId + "/images/" + imageId)
  }
}
