// <reference path = "../../../typings/globals/request/index.d.ts" />
import { Component } from '@angular/core';
import { Push } from '@ionic/cloud-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  url = "https://api.ionic.io"
  deviceToken = 'd1pEWtN2dHk:APA91bEoWUbrg_2xYEudBlEY-75hQ_1aKPHHLJXR56x4H9xpXq8HRBhqMiIJS3BwV1jLI4RsYYLqsVwT0oBUwa6r-tKy19AW0V2bSQ2w3MdbMgvqBQXAKtLR8PzaSq9C6CSMoYGRc4W6';
  token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI0NDNlZjUxOC03NDg0LTQ2YmEtYWI0YS00OGVkZjBmNTRkMjUifQ.kHa-neGaPXRyf0_O9Gz5N22CtMaECH2mgyILRGOq0oY'
  title: string;
  message: string;

  headers: Headers = new Headers({ 
      "Content-Type" : "application/json", 
      "Authorization" : "Bearer " + this.token  
    });
  options = new RequestOptions({ "headers" : this.headers })

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

  }

  getTokens(){

    this.http.get( this.url + "/push/tokens" , this.options )
        .subscribe((abc)=>{
            console.log("Response: ",abc );
        }, (e)=>{
            console.log(e);
        })
    
  }

  onSend(){

    let data = {
        // "tokens": [this.deviceToken],
        "send_to_all" : true,
        "profile": "ionpush2",
        "notification": {
          "title" : this.title,
          "message": this.message
          }
      }

      this.http.post( this.url + "/push/notifications", data , this.options)
            .subscribe(()=>{
              console.log("Push successfully send");
            }, (e) =>{
              console.log("Push failed to send. Error " + e);
            });
     }

}
