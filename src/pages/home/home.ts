import { Component } from '@angular/core';
import { NavController, LoadingController, ActionSheetController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { GoogleCloudVisionServiceProvider } from '../../providers/google-cloud-vision-service/google-cloud-vision-service';
import { Tutorial } from '../tutorial/tutorial';
import { ListPage } from '../list/list';

import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  itemsArray: any[] = [];

  constructor(
    public navCtrl: NavController, 
    private camera: Camera,
    private vision: GoogleCloudVisionServiceProvider,
    private alert: AlertController,
    private _loadCrl: LoadingController,
    public storage: Storage,
    public actionSheetCtrl: ActionSheetController,
    private admobFree: AdMobFree) {

  	this.chamaTutorial();

    const bannerConfig: AdMobFreeBannerConfig = {
     // add your config here
     // for the sake of this example we will just use the test config
     isTesting: true,
     autoShow: true,
     bannerAtTop: true
    };
    this.admobFree.banner.config(bannerConfig);

    this.admobFree.banner.prepare()
      .then((result) => {
        console.log(result);
      })
      .catch(e => console.log("teste" + e));
  }

  callTutorial() {
    this.navCtrl.push(Tutorial);
  }

  chamaTutorial() {
    this.storage.get("tutorial").then((val) => {
      if (!val) this.navCtrl.push(Tutorial);
    });
  }

  callListPage() {
    this.navCtrl.push(ListPage);
  }

  salvarResultados(response, titulo, data) {

    this.storage.get("fotos").then((val) => {
      if( val != null ){
        var id = 0;
        (<any>val).forEach(function(item){
          id = parseInt(item['id']);
        });
        id++;
        (<any>val).push({id: id, title: titulo, data: data, response: response});
      } else {
        val = [];
        val.push({id: 1, title: titulo, data: data, response: response});
      }

      this.storage.set("fotos", val);
      this.itemsArray = val;

    });
  }

  showAlert(message) {
    let alert = this.alert.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  tituloPrompt() {
    const alert = this.alert.create({
      title: 'Escreva um título para o documento',
      inputs: [
        {
          name: 'title',
          placeholder: 'Título'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            let dataTime = this.dataFoto();
            this.takePhoto("Sem título", dataTime);
          }
        },
        {
          text: 'Salvar',
          role: 'save',
          handler: data => {
            let dataTime = this.dataFoto();
            this.takePhoto(data.title, dataTime);
          }
        }
      ]
    });
    alert.present();
  }

  takePhoto(titulo, data) {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 500,
      targetWidth: 500,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      let loader = this._loadCrl.create({
        content: "Processando, aguarde..."
      });
      loader.present();
      this.vision.getText(imageData).subscribe((result) => {
        var results = result.json().responses;
        if(results[0].fullTextAnnotation != undefined){
          this.salvarResultados(result.json().responses, titulo, data);
          loader.dismiss();
        }
        else{
          this.showAlert("Imagem sem texto!");
        }
      }, err => {
          this.showAlert(err);
      });
    }, err => {
    this.showAlert(err);
    });
  }

  getFotos() {
    this.storage.get('fotos').then((val) => {
      this.itemsArray = val;
    });
  }

  dataFoto() {
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth() + 1;
    var ano = data.getFullYear();
    return [dia, mes, ano].join('/');
  }

  // deletaTexto(id){
  //   this.storage.get('fotos').then((data) => {
  //     let textosRemovidos;
  //     textosRemovidos = data.filter(function(item) {
  //       return parseInt(item['id']) != parseInt(id);
  //     });
  //     alert("Texto Removido!");
  //     this.storage.set('fotos', textosRemovidos);
  //     this.getFotos();
  //   });  
  // }

  // presentActionSheet(item) {
  //   let actionSheet = this.actionSheetCtrl.create({
  //     title: 'Modificar nota',
  //     buttons: [
  //       {
  //         text: 'Editar',
  //         role: 'editar',
  //         handler: () => {
  //           this.chamaEditaTexto(item);
  //         }
  //       },{
  //         text: 'Deletar',
  //         role: 'deletar',          
  //         handler: () => {
  //           this.deletaTexto(item.id);
  //         }
  //       },{
  //         text: 'Compartilhar',
  //         role: 'compartilhar',          
  //         handler: () => {
  //           this.compartilharViaWhats(item);
  //         }
  //       },{
  //         text: 'Cancelar',
  //         role: 'cancelar',
  //         handler: () => {}
  //       }
  //     ]
  //   });
  //   actionSheet.present();
  // }
}
