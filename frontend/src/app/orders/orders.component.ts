import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { Router, RouterModule } from '@angular/router';
import { Orders } from '../_models/Orders';
import { CommonModule } from '@angular/common';
import { ServicesContainerService } from '../_services/services-container.service';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-orders',
  imports: [RouterModule, NavBarComponent, CommonModule,NgxPaginationModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {


  currentPage:number = 1;
  itemsPerPage:number = 4;
  userData: any;
  orderDate: Date = new Date();
  orders: Orders[] = [];
  filteredOrders: Orders[] = [];
  searchFilter = '';
  statusFilter = '';

  constructor(
    public services: ServicesContainerService,
    private router: Router
  ) {
    this.userData = this.services.accountService.currentUser();
  }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    if (this.services.accountService.currentUser()?.role === 1) {
      this.services.orderService.getAll().subscribe({
        next: (res) => {
          this.orders = res;
          this.filteredOrders = res;
        }
      })
    }
    else {
      this.services.orderService.getByUserId(Number(this.userData.id)).subscribe({
        next: (res) => {
          this.orders = res;
          this.filteredOrders = res;
        }
      })
    }
  }

  viewOrderDetails(orderID: any) {
    this.router.navigate(["/order-details", orderID]);
  }

  requestOrder(orderId: number) {
    this.services.orderService.requestOrder(orderId).subscribe({
      next: () => {
        this.getOrders();
      }
    })
  }
  acceptOrder(orderId: number) {
    this.services.orderService.acceptOrder(orderId).subscribe({
      next: () => {
        this.getOrders();
      }
    })
  }

  filterOrders(event: Event) {
    this.searchFilter = (event.target as HTMLInputElement).value.trim();
    this.applyFilters();
  }

  filterByStatus(event: Event) {
    this.statusFilter = (event.target as HTMLSelectElement).value;
    this.applyFilters();
  }
  applyFilters() {
    this.filteredOrders = this.orders.filter(order => {
      const matchesSearch = order.id.toString().includes(this.searchFilter);
      const matchesStatus = this.statusFilter === 'all' || order.status.toLowerCase() === this.statusFilter;;

      return matchesSearch && matchesStatus
    });
  }

}
