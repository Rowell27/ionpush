import { Component } from '@angular/core';
import { Push } from '@ionic/cloud-angular';
import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              public push: Push,
              alertCtrl: AlertController) {
    
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

}
