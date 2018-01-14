import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'modalComp.html'
})
export class ModalComp {
  
  item: any;
  email: string[];

  constructor(public navCtrl: NavController, 
  	public storage: Storage, 
  	public viewCtrl: ViewController, 
  	private socialSharing: SocialSharing,
  	params: NavParams,
    private alert: AlertController) {
  		this.item = params.get('item');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  showAlert(message) {
    let alert = this.alert.create({
      title: 'Erro',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  compartilharViaWhats(){
    var mensagem = "Você compartilhou este documento usando o My.Doc\n\n" + this.item.response[0].fullTextAnnotation.text;
    this.socialSharing.shareViaWhatsApp(mensagem).then(() => {
      // Success!
    }).catch((err) => {
      this.showAlert("Você não tem o aplicativo instalado");
    });
  }

  compartilharViaEmail(){
    var mensagem = "Você compartilhou este documento usando o My.Doc\n\n" + this.item.response[0].fullTextAnnotation.text;
    this.socialSharing.shareViaEmail(mensagem, "Título default", this.email).then(() => {
      // Success!
    }).catch((err) => {
      this.showAlert("Você não tem o aplicativo instalado");
    });
  }

  compartilharViaTwitter(){
    var mensagem = "Você compartilhou este documento usando o My.Doc\n\n" + this.item.response[0].fullTextAnnotation.text;
    this.socialSharing.shareViaTwitter(mensagem).then(() => {
      // Success!
    }).catch((err) => {
      this.showAlert("Você não tem o aplicativo instalado");
    });
  }

  compartilharViaFacebook(){
    var mensagem = "Você compartilhou este documento usando o My.Doc\n\n" + this.item.response[0].fullTextAnnotation.text;
    this.socialSharing.shareVia("com.facebook.orca", mensagem).then(() => {
      // Success!
    }).catch((err) => {
      var mensagem = "Você compartilhou este documento usando o My.Doc\n\n" + this.item.response[0].fullTextAnnotation.text;
      this.socialSharing.shareVia("com.facebook.mlite", mensagem).then(() => {
        // Success!
      }).catch((err) => {
        this.showAlert("Você não tem o aplicativo instalado");
      });
    });
  }

  compartilharViaSkype(){
    var mensagem = "Você compartilhou este documento usando o My.Doc\n\n" + this.item.response[0].fullTextAnnotation.text;
    this.socialSharing.shareVia("com.skype.raider", mensagem).then(() => {
      // Success!
    }).catch((err) => {
      var mensagem = "Você compartilhou este documento usando o My.Doc\n\n" + this.item.response[0].fullTextAnnotation.text;
      this.socialSharing.shareVia("com.skype.m2", mensagem).then(() => {
        // Success!
      }).catch((err) => {
        this.showAlert("Você não tem o aplicativo instalado");
      });
    });
  }

  compartilharViaGooglePlus(){
    var mensagem = "Você compartilhou este documento usando o My.Doc\n\n" + this.item.response[0].fullTextAnnotation.text;
    this.socialSharing.shareVia("com.google.android.apps.plus", mensagem).then(() => {
      // Success!
    }).catch((err) => {
      this.showAlert("Você não tem o aplicativo instalado");
    });
  }
}


