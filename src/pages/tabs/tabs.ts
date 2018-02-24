import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// $TAB_IMPORTS

/*
  Generated class for the TabsPage tabs.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPagePage {

  tab1Root = 'Tab1Page'
  tab2Root = 'Tab2Page'
  tab3Root = 'Tab3Page'
  tab4Root = 'Tab4Page'


  constructor(public navCtrl: NavController) {

  }

}