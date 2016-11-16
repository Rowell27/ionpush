import { Component } from '@angular/core';
import { Push } from '@ionic/cloud-angular';
import { Http } from '@angular/http';
import { NavController, AlertController } from 'ionic-angular';

let jsonpush={
    "tokens": ["d1pEWtN2dHk:APA91bEoWUbrg_2xYEudBlEY-75hQ_1aKPHHLJXR56x4H9xpXq8HRBhqMiIJS3BwV1jLI4RsYYLqsVwT0oBUwa6r-tKy19AW0V2bSQ2w3MdbMgvqBQXAKtLR8PzaSq9C6CSMoYGRc4W6"],
    "profile": "ionpush2",
    "notification": {
        "message": "Manuel is awesome!"
    }
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  

  options = {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ' + this.token,
    'Content-Type': 'application/json'
  }
};

  token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI0NDNlZjUxOC03NDg0LTQ2YmEtYWI0YS00OGVkZjBmNTRkMjUifQ.kHa-neGaPXRyf0_O9Gz5N22CtMaECH2mgyILRGOq0oY'
  url:string = 'https://api.ionic.io/push/notifications';
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

    console.log(JSON.stringify(jsonpush))

  }

  onSend(){
    this.http.post( this.url, this.token , jsonpush ).subscribe( x =>{
      console.log('err : ' + x );
    })
  }

}
