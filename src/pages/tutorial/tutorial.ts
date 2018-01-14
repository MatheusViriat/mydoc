import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'tutorial.html'
})
export class Tutorial {

    slides = [
        {
          title: "Bem vindo ao My.Doc",
          description: "Bem vindo ao My.Doc, o App que lê qualquer imagem de texto e transforma em texto editável. <br><br> Deslize o dedo para a esquerda para continuar...",
          image: "assets/imgs/tutorial01.png",
        },
        {
          title: "Capturando a imagem",
          description: 'Na página inicial do App, pressione "Capturar imagem" para abrir a câmera do seu celular.',
          image: "assets/imgs/tutorial02.png",
        },
        {
          title: "Capturando a imagem",
          description: "Tenha certeza de que o foco da câmera do seu celular está correto e faça a captura do texto que deseja transformar em editável.",
          image: "assets/imgs/tutorial03.png",
        },
        {
          title: "Salvando seus textos",
          description: "Espere o App processar a imagem. Assim que ela estiver pronta, o App fará o reconhecimento da imagem e salvará o texto na pasta Histórico. Você pode compartilhar seus textos por e-mail ou nas redes sociais, ou ainda baixar no seu celular em .pdf ou .docs para editá-lo se preferir.",
          image: "assets/imgs/tutorial04.png",
        }

      ];

    constructor(public navCtrl: NavController, public storage: Storage) {}

    chamaHome(){
      this.storage.set("tutorial", true);
		  this.navCtrl.pop();
	  }

}
