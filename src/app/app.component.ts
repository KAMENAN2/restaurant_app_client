import {
  Component,
  OnInit,
  Renderer,
  HostListener,
  Inject
} from "@angular/core";
import { Location } from "@angular/common";
import { DOCUMENT } from "@angular/common";
import {RestaurantService} from "./services/restaurant.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  private cords: Position;
  private restaurant: any;
  constructor(
    private renderer: Renderer,
    public location: Location,
    private restaurantService : RestaurantService,
    @Inject(DOCUMENT) document
  ) {}
  @HostListener("window:scroll", ["$event"])
  onWindowScroll(e) {
    if (window.pageYOffset > 100) {
      var element = document.getElementById("navbar-top");
      if (element) {
        element.classList.remove("navbar-transparent");
        element.classList.add("bg-danger");
      }
    } else {
      var element = document.getElementById("navbar-top");
      if (element) {
        element.classList.add("navbar-transparent");
        element.classList.remove("bg-danger");
      }
    }
  }
  ngOnInit() {
    this.onWindowScroll(event);

}
}
