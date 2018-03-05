import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Home } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { UtilService } from '../services/index';
import { AboutPagePage } from '../pages/about/about';
import {Categories} from '../pages/categories/categories';
import {AuthService}from '../services/auth/auth.service';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = ProfilePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public up: UtilService, private auth:AuthService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: Home},
      { title: 'Profile', component: ProfilePage },
      {title:'Aboutus', component:AboutPagePage},
      {title: 'Categories', component:Categories}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      let toast = this.up.getToast("You are not connected to Internet.");
      toast.present();

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }
 
//   logout() {
//     this.auth.logout();
//     this.nav.setRoot(ProfilePage);
// }
}
