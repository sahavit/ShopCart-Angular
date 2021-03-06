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
  totalAmtSaved:number = 0;

  view= true;
  checkout_yes= false;
  checkout_no= false;
  buy=false;

  //calls service class to get JSON data and populate array
  ngOnInit(): void {  
    this.cartService.getProducts().subscribe((response) => {
      this.products=response;
    });

  }

  //finds array index for add/removal of product from cart
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

  //add products to cart
  addToCart(prod:Product){
    let index = this.findindexofArray(prod);
    this.totalAmount+=prod.price;
    this.totalQuantity+=1;
    this.totalAmtSaved+=(prod.mrp-prod.price);
    
    if(index!=null){
      this.cartProducts[index].quantity+=1;
    }
    else{
      prod.quantity=1;
      this.cartProducts.push(prod);      
    }
  }

  //delete products from cart
  deleteFromCart(prod:Product){
    let index = this.findindexofArray(prod);
    this.totalAmount-=prod.price;
    this.totalQuantity-=1;
    this.totalAmtSaved-=(prod.mrp-prod.price);
    this.cartProducts[index].quantity-=1;
    if(this.cartProducts[index].quantity==0){
      this.cartProducts.splice(index,1);
    }
    console.log(this.cartProducts[index]);
  }

  //To review cart and checkout products
  goToCheckout(){
    this.view=false;
    if(this.totalAmount==0){
      this.checkout_no=true;
    }
    else{
      this.checkout_yes=true;
    }

    // this.cartService.setCart(this.cartProducts,this.totalAmount,this.totalQuantity);
    // this.router.navigate(['check']);
  }

  //After checkout and buy
  goBack(){
    if(this.checkout_no==true){
      this.checkout_no=false;
    }
    else{
      this.checkout_yes=false;
    }
    this.view=true;
    }

    //To trigger modal
    buyProducts(){
      this.buy=true;
    }

    //close button from modal. It will reset the cart 
    close(){
      this.buy=false;
      this.checkout_yes=false;
      this.checkout_no=true;
      this.cartProducts=[];
      this.products=[]
      this.ngOnInit();
      this.totalAmount=0;
      this.totalAmtSaved=0;
      this.totalQuantity=0;
    }
  

}
