import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'about_us.html'
})
export class AboutUs {

  constructor(public navCtrl: NavController, public storage: Storage) {

  }
}
