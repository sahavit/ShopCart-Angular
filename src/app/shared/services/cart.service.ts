import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }

  cartProducts:Product[] = [];
  totalAmount: number = 0;
  totalQuantity: number = 0;
  containsData: boolean = false;
  prodUrl:string = "./assets/data/product.json";

  //To get products from json file
  getProducts():Observable<Product[]>{
      return this.http.get<Product[]>(this.prodUrl);
  }

  //Not used (Originally created for checkout component)
  setCart(products:Product[],totalAmount:number,totalQuantity:number){
    this.cartProducts=products;
    this.totalAmount=totalAmount;
    this.totalQuantity=totalQuantity;
  }

  //Not used (Originally created for checkout component)
  clearCart(){
    this.cartProducts=[];
    this.totalAmount=0;
    this.totalQuantity=0;
  }

  //Not used (Originally created for checkout component)
  getCart(){
    console.log(this.cartProducts)
    return this.cartProducts;
  }

  //Not used (Originally created for checkout component)
  getAmount(){
    return this.totalAmount;
  }

  //Not used (Originally created for checkout component)
  getQuantity(){
    return this.totalQuantity;
  }

  //Not used (Originally created for checkout component)
  getContainsData(){
    if(this.cartProducts==[])
      this.containsData=false;
    else
      this.containsData=true;
    return this.containsData;
  }

  //Not used (Originally created for checkout component)
  getProductBack(){
    return this.cartProducts;
  }

}
  
