import { Component } from '@angular/core';
import { NavController, LoadingController, ActionSheetController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ModalDownload } from '../modalDownload/modalDownload';
import { ModalComp } from '../modalComp/modalComp';
import { ModalFullText } from '../modalFullText/modalFullText';

declare let cordova: any

@Component({
  selector: 'page-home',
  templateUrl: 'list.html'
})
export class ListPage {

  itemsArray: any[] = [];

  constructor(public navCtrl: NavController, 
    private _loadCrl: LoadingController,
    public storage: Storage,
    public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController) {
  }

  ionViewWillEnter(){
    let loader = this._loadCrl.create({
      content: "Carregando, aguarde..."
    });

    loader.present();
    this.getFotos();
    loader.dismiss();
  }

  opcoesDocumento(item, title, text) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Escolha uma opção',
      buttons: [
        {
          text: 'Baixar',
          role: 'baixar',          
          handler: () => {
            this.callModalDownload(title, text);
          }
        },{
          text: 'Compartilhar',
          role: 'compartilhar',          
          handler: () => {
            this.callModalComp(item);
          }
        }
      ]
    });
    actionSheet.present();
  }

  callModalDownload(title, text){
    let modal = this.modalCtrl.create(ModalDownload, { text: text, title: title});
    modal.present();
  }

  callModalComp(item){
    let modal = this.modalCtrl.create(ModalComp, { item: item});
    modal.present();
  }

  callModalFullText(title,text,data){
    let modal = this.modalCtrl.create(ModalFullText, { text: text, title: title, data: data});
    modal.present();
  }

  getFotos(){
    this.storage.get('fotos').then((val) => {
      this.itemsArray = val;
    });
  }

}
