import { Component } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [RouterModule, NavBarComponent, FormsModule, CommonModule],
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css'] 
})
export default class SupportComponent {

  userMessage: any[] = [
    { sender: 'user', text: 'Hello, I need help finding a new PC.' },
    { sender: 'support', text: 'What are you looking for in a PC?' },
    { sender: 'user', text: 'I need a PC for gaming.' },
    { sender: 'support', text: 'Got it! Do you have a budget in mind?' },
    { sender: 'user', text: 'My budget is around $1000.' },
    { sender: 'support', text: 'Okey, I’ll suggest a few models that fit your needs.' }
  ];

  newMessage: string = '';


  sendMessage() {
    if (this.newMessage.trim()) {
      this.userMessage.push({ sender: 'user', text: this.newMessage });
      this.newMessage = '';
    }
  }
}
