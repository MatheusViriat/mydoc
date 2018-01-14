import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environment';

/*
  Generated class for the GoogleCloudVisionServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GoogleCloudVisionServiceProvider {

  constructor(public http: Http) {}

	getText(base64Image) {
		const body = {
		  "requests": [
		    {
		      "image": {
		        "content": base64Image
		      },
		      "features": [
		        {
		          "type": "TEXT_DETECTION"
		        }
		      ]
		    }
		  ]
		}
		return this.http.post('https://vision.googleapis.com/v1/images:annotate?key=' + environment.googleCloudVisionAPIKey, body);
	}

	// traduzTexto(texto) {
	// 	const body = {
	// 		"q" : texto,
	// 		"target" : "en"
	// 	}
	// 	return this.http.post('https://translation.googleapis.com/language/translate/v2?key=' + environment.googleCloudVisionAPIKey, body);
	// }
	
}
