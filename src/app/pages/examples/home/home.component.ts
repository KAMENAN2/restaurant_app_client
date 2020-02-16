import { Component, OnInit } from '@angular/core';
import noUiSlider from "nouislider"
import {RestaurantService} from "../../../services/restaurant.service";
import {Router} from "@angular/router";
import {state} from "@angular/animations";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',

})
export class HomeComponent implements OnInit {
  isCollapsed = true;
  focus;
  focus1;
  focus2;
  date = new Date();
  pagination = 3;
  pagination1 = 1;
  private cords: Position;
  private restaurants : any;
    private allRestaurant: any;
  dataForSearch: any;
  private totalItem: any ;
  constructor(  private restaurantService : RestaurantService,
                private route : Router) {}
  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: "smooth" });
  }
  ngOnInit() {

    if (navigator){
      navigator.geolocation.getCurrentPosition(position => {
        this.cords = position;
        console.log(position.coords);
        this.restaurantService.getRestauCords("restau-cords?lat="+position.coords.latitude+"&long="+position.coords.longitude).subscribe(data =>{
          console.log(data);
          this.restaurants = data;
        })
      });
    };



    
    this.restaurantService.getRestaurant("find-paginate-resto?size=10").subscribe(data =>{

        this.allRestaurant = data.docs;
        this.totalItem = data.pages;

    });
   /*
    this.restaurantService.getRestaurant("find-paginate-resto?size=3").subscribe(data =>{

        this.allRestaurant = data.docs;

    });

    */

    /*
        this.restaurantService.getRestaurant("find-paginate-resto?size=3").subscribe(data =>{

            this.restaurants = data.docs;
    });

     */

    var body = document.getElementsByTagName("body")[0];
    body.classList.add("index-page");
    var slider = document.getElementById("sliderRegular");

    var slider2 = document.getElementById("sliderDouble");

  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("index-page");
  }

  addStartGold(score){
     // console.log(parseInt(score));
     let scoreInt = parseInt(score)
     // let fakeScore = Math.floor(Math.random() * 5) + 1;
      let fakeScore = parseInt(score);
     let startNum;
    if (fakeScore <= 3){
        startNum = 1;
    }else if (fakeScore > 3 && fakeScore <=5){
        startNum = 2;
    }else if (fakeScore > 5 && fakeScore <=8){
        startNum = 3;
    } else if (fakeScore > 8 && fakeScore <=14){
        startNum = 4;
    } else if (fakeScore > 10){
        startNum = 5;
    }
      let startGold ="<div class=\"rating\">\n" +
          "                                    <div class=\"stars\">" ;
      for(let i = 1 ; i <= startNum;i++){
        startGold +=   "<i class=\"fa fa-star gold\"></i>";
      }
      startGold +="                                    </div>\n" +
          "                                </div>";

      return startGold;
  }
  onGetDetailRestaurant(restaurant,id_photo) {
    this.route.navigateByUrl("detail",{state:{restaurant,id_photo}});
    console.log(restaurant);

  }

    paginate() {
        console.log(this.pagination1)
        this.restaurantService.getRestaurant("find-paginate-resto?size=10&page="+this.pagination1).subscribe(data =>{
          this.allRestaurant = data.docs;
          this.totalItem = data.pages;
        });
    }
    onFindByName() {
    console.log(this.dataForSearch);
      this.restaurantService.getRestaurant("find-resto-by-name?name="+this.dataForSearch+"&size=10").subscribe(data =>{
        this.allRestaurant = data.docs;
        this.totalItem = data.pages;

      });
    }
}
