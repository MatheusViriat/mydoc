import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

declare let cordova: any

@Component({
  selector: 'page-home',
  templateUrl: 'modalDownload.html'
})
export class ModalDownload {

  title: any;
  content: any;

  constructor(public navCtrl: NavController, 
    public storage: Storage, 
    public viewCtrl: ViewController, 
    params: NavParams) {
  	this.content = params.get('text');
  	this.title = params.get('title');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  saveAsPDF(){
    cordova.plugins.printer.print(this.content, this.title);
  }

  // saveAsTxt(){
  //   let path = this.file.externalRootDirectory + '/Download/';
  //   let fileName = 'mydoc.txt';
  //   let text = 'teste teste teste teste teste';
  //   var blob = new Blob([text], { type: 'plain/text', endings: 'native' });
  //   this.file.writeFile(path, fileName, text, {replace:true}).then(
  //     success=>{
  //       alert("Texto salvo em Downloads");
  //     }
  //   );
  // }
}
