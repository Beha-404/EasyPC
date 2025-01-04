import { Component } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-orders',
  imports: [NavBarComponent, RouterModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export default class OrdersComponent {

  orderID: any;

  viewOrderDetails(orderID: any) { }

}
