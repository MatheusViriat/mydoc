import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'modalFullText.html'
})
export class ModalFullText {

  text: any;
  title: any;
  data: any;

  constructor(public navCtrl: NavController, public storage: Storage, public viewCtrl: ViewController, params: NavParams) {
  	this.text = params.get('text');
    this.title = params.get('title');
  	this.data = params.get('data');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
