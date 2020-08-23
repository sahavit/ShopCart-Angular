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

  // setProducts(){
  //   const promise = new Promise((resolve, reject) => {
  //     // const apiURL = this.prodUrl;
  //     this.http.get<Product[]>(this.prodUrl).toPromise()
  //       .then((res: any) => {
  //         // Success
  //         this.products = res.map((res: any) => {
  //           return new Product(
  //             res.brandName,
  //             res.productName,
  //             res.quantity,
  //             res.price,
  //             res.mrp,
  //             res.imageUrl,
  //             res.offerText
  //           );
  //         });
  //         resolve();
  //       },
  //         err => {
  //           // Error
  //           reject(err);
  //         }
  //       );
  //   });
  //   return promise;
  // }

  // get():Product[]{
  //   this.setProducts();
  //   this.products.forEach(element => {
  //     console.log(element.brandName)
  //   });
  //   return this.products;
  // }

  getProducts():Observable<Product[]>{
      return this.http.get<Product[]>(this.prodUrl);
  }

  setCart(products:Product[],totalAmount:number,totalQuantity:number){
    this.cartProducts=products;
    this.totalAmount=totalAmount;
    this.totalQuantity=totalQuantity;
  }

  clearCart(){
    this.cartProducts=[];
    this.totalAmount=0;
    this.totalQuantity=0;
  }

  getCart(){
    console.log(this.cartProducts)
    return this.cartProducts;
  }

  getAmount(){
    return this.totalAmount;
  }

  getQuantity(){
    return this.totalQuantity;
  }

  getContainsData(){
    if(this.cartProducts==[])
      this.containsData=false;
    else
      this.containsData=true;
    return this.containsData;
  }

  getObervableProduct():Observable<Product[]>{
    return this.http.get<Product[]>(this.prodUrl);
  }

  getProductBack(){
    return this.cartProducts;
  }

}
  
