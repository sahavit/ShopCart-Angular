// This Component is not used. It was included in the original idea to use two components.
// But currently using only one component.

import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/services/cart.service';
import { Product } from '../shared/models/Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private cartService: CartService, private router:Router) { }

  cartProducts:Product[] = [];
  totalAmount:number = 0;
  totalQuantity:number = 0;
  items:boolean = false;
  buy:boolean = false;

  ngOnInit(): void {
    this.cartProducts=this.cartService.getCart();
    this.totalAmount=this.cartService.getAmount();
    this.totalQuantity=this.cartService.getAmount();
    this.cartService.clearCart();
    if(this.cartProducts.length==0)
      this.items=false;
    else
      this.items=true;
    // console.log(this.cartProducts)
  }

  goBack(){
    this.router.navigate(['view']);
  }

}
