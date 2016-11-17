// <reference path = "../../../typings/globals/request/index.d.ts" />
import { Component } from '@angular/core';
import { Push } from '@ionic/cloud-angular';
import { Http } from '@angular/http';
import { NavController, AlertController } from 'ionic-angular';
import * as request from 'request';

// let jsonpush = {
//     "tokens": ["d1pEWtN2dHk:APA91bEoWUbrg_2xYEudBlEY-75hQ_1aKPHHLJXR56x4H9xpXq8HRBhqMiIJS3BwV1jLI4RsYYLqsVwT0oBUwa6r-tKy19AW0V2bSQ2w3MdbMgvqBQXAKtLR8PzaSq9C6CSMoYGRc4W6"],
//     "profile": "ionpush2",
//     "notification": {
//         "message": "Manuel is awesome!"
//     }
// }

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  deviceToken = 'd1pEWtN2dHk:APA91bEoWUbrg_2xYEudBlEY-75hQ_1aKPHHLJXR56x4H9xpXq8HRBhqMiIJS3BwV1jLI4RsYYLqsVwT0oBUwa6r-tKy19AW0V2bSQ2w3MdbMgvqBQXAKtLR8PzaSq9C6CSMoYGRc4W6';
  token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI0NDNlZjUxOC03NDg0LTQ2YmEtYWI0YS00OGVkZjBmNTRkMjUifQ.kHa-neGaPXRyf0_O9Gz5N22CtMaECH2mgyILRGOq0oY'
  
  text: string;

  constructor(public navCtrl: NavController,
              public push: Push, 
              alertCtrl: AlertController,
              private http: Http
              ) {
    
    this.push.rx.notification()
      .subscribe((msg) => {
        let alert = alertCtrl.create({
          title: msg.title,
          message: msg.text,
          buttons: ['Dismiss']
        });
        alert.present();
      });

    // console.log(JSON.stringify(jsonpush))

  }

  onSend(){

    // this.http.post( this.url, this.token , jsonpush ).subscribe( x =>{
    //   console.log('err : ' + x );
    // }

    let options = {
      method: 'POST',
      url : 'https://api.ionic.io/push/notifications',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json'
        }
    };

    let jsonpush = {
        "tokens": this.deviceToken,
        "profile": "ionpush2",
        "notification": {
            "message": "Hurray! Push Notification!"
        } 
    }

    request( options, jsonpush, (err, response, body) => {
      if (err) throw new Error(err);
      console.log(JSON.stringify(jsonpush));
    });

    // this.http.post( 'https://api.ionic.io/push/notifications', req, jsonpush ).subscribe( x=> {
    //   console.log(x);
    // });

    
    // let notification = {
    //   "tokens": [this.deviceToken],
    //   "profile": "ionpush2",
    //   "notification": {
    //     "title": "Hi",
    //     "message": "Hello world!",
    //     "android": {
    //       "title": "Hey",
    //       "message": "Hello Android!"
    //     },
    //     "ios": {
    //       "title": "Howdy",
    //       "message": "Hello iOS!"
    //     } 
    //   }
    // };
  
  }
}
