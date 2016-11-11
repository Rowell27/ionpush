import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Push, PushToken } from '@ionic/cloud-angular';
import { HomePage } from '../pages/home/home';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform, public push: Push) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

       this.push.register().then((pushToken: PushToken) => {
        return this.push.saveToken(pushToken);
      }).then((pushToken: PushToken) => {
        console.log('Token saved:', pushToken.token);
      });
      

      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
