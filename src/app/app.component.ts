import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonComponent } from './components/button/button.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ListComponent } from "./components/list/list.component";
import { UserService } from "./services/user.service";
import { IconSetService } from '@coreui/icons-angular';
import { cilHome, cilUser, cilCheckCircle } from '@coreui/icons';
import {InputfieldComponent} from "./components/inputfield/inputfield.component";
import {SelectfieldComponent} from "./components/selectfield/selectfield.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ButtonComponent,
    HeaderComponent,
    FooterComponent,
    ListComponent,
    InputfieldComponent,
    SelectfieldComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'taskhub-frontend';

  constructor(public userService: UserService, private router: Router, public iconSet: IconSetService) {
    iconSet.icons = { cilHome, cilUser, cilCheckCircle };
  }

  ngOnInit(): void {

  }

  sendMessage(message: string) {
    alert(message);
  }

  executeLogout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['login']);
  }
}
