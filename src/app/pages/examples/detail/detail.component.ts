import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  isCollapsed = false;
  private restaurant: any;
  private id_photo: any;
  constructor() { }

  ngOnInit() {
    console.log(history.state);

    this.id_photo = history.state.id_photo;
    if (history.state.navigationId == 1){
      console.log("navigationId test");
      this.restaurant = JSON.parse(localStorage.getItem("resto"));
    }else {
      localStorage.removeItem("resto");
      this.restaurant = history.state.restaurant;
      localStorage.setItem("resto",JSON.stringify(this.restaurant))
    }
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("profile-page");
  }

  ngOnDestroy(){
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("profile-page");
  }
}
