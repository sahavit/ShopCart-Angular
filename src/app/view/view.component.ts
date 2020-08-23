import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/services/cart.service';
import { Product } from '../shared/models/Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  constructor(private cartService: CartService,
              private router: Router) { }

  products:Product[] = [];
  cartProducts:Product[] = [];
  totalAmount: number = 0;
  totalQuantity: number = 0;

  view= true;
  checkout_yes= false;
  checkout_no= false;

  ngOnInit(): void {  
    this.cartService.getProducts().subscribe((response) => {
      this.products=response;
    });

  }

  findindexofArray(prod:Product){
    let index:number;
    if(this.cartProducts.length==0){
      index = null;
    }
    else{
      let count=-1;
      this.cartProducts.forEach(element => {
        count+=1;
        if(element.brandName == prod.brandName)
          index=count;        
      });
    }
    return index;
  }

  addToCart(prod:Product){
    let index = this.findindexofArray(prod);
    this.totalAmount+=prod.price;
    this.totalQuantity+=1;
    
    if(index!=null){
      this.cartProducts[index].quantity+=1;
    }
    else{
      prod.quantity=1;
      this.cartProducts.push(prod);      
    }
  }

  deleteFromCart(prod:Product){
    let index = this.findindexofArray(prod);
    this.totalAmount-=prod.price;
    this.totalQuantity-=1;
    this.cartProducts[index].quantity-=1;
    // else{
    //   prod.quantity=1;
    //   this.cartProducts.push(prod);
    // }
  }

  goToCheckout(){
    // this.cartService.setCart(this.cartProducts,this.totalAmount,this.totalQuantity);
    // this.router.navigate(['check']);
    this.view=false;
    if(this.totalAmount==0){
      this.checkout_no=true;
    }
    else{
      this.checkout_yes=true;
    }
  }

}
