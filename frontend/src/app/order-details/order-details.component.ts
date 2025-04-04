import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { ServicesContainerService } from '../_services/services-container.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-details',
  imports: [NavBarComponent,CommonModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit {

  order:any;
  orderId:number;

  constructor(
    private services:ServicesContainerService,
    private route:ActivatedRoute
  ) {
    this.orderId = Number(this.route.snapshot.paramMap.get("id"));
  }

  ngOnInit(): void {
    this.getOrder();
  }
  
  getOrder() {
    this.services.orderService.getByOrderId(this.orderId).subscribe({
      next: (res) => {
        this.order = res;
      }
    })
  }
}
