import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  host:String ="http://localhost:8080/";
  constructor(private http : HttpClient) { }

  getRestauCords(url){
    return this.http.get<any>(this.host + url);
  }
   getRestaurant(url){
    return this.http.get<any>(this.host + url);
  }

}
