// <reference path = "../../../typings/globals/request/index.d.ts" />
import { Component } from '@angular/core';
import { Push, PushToken } from '@ionic/cloud-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  devices: any;
  url = "https://api.ionic.io/"
  API_Token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI0NDNlZjUxOC03NDg0LTQ2YmEtYWI0YS00OGVkZjBmNTRkMjUifQ.kHa-neGaPXRyf0_O9Gz5N22CtMaECH2mgyILRGOq0oY'
  pushToken: PushToken
  container = [];
  token: string;
  deviceTokens;
  title: string;
  message: string;

  headers: Headers = new Headers({ 
      "Content-Type" : "application/json", 
      "Authorization" : "Bearer " + this.API_Token  
    });
  options = new RequestOptions({ "headers" : this.headers })

  constructor(public navCtrl: NavController,
              public push: Push, 
              alertCtrl: AlertController,
              private http: Http
              ) {
    //Receive notification          
    this.push.rx.notification()
      .subscribe((msg) => {
        let alert = alertCtrl.create({
          title: msg.title,
          message: msg.text,
          buttons: ['Dismiss']
        });
        alert.present();
        console.log("Push notification receieved.");
      });
  }

  ionViewWillEnter(){
    this.getTokens();
  }

  clearAll(){
    this.title = "";
    this.message = "";
  }

  getTokens(){
    this.container = [];
    this.http.request( this.url + "push/tokens" , this.options )
        .subscribe( res => {
            this.deviceTokens = JSON.parse(res['_body']).data;
              console.log("Response: " + this.deviceTokens.length );
            this.deviceTokens.forEach(devToken => {
              console.log("Token: " , devToken.token);
              if(devToken.valid){
                this.container.push(devToken);
                }
            });
        }, (e)=>{
            console.log(e);
        });
  }

  // displaytokens(){
  //   this.http.get( this.url + "push/tokens", this.options )
  //       .subscribe( res => {
          
  //       });
  // }

  onClickRegisterDevice(){
    if(!this.pushToken) 
      this.push.register().then((pushToken) => {
        return this.push.saveToken(pushToken);
      }).then((pushToken) => {
          this.pushToken = pushToken;
          this.token = pushToken.token;
          console.log('Token saved:', pushToken.token);
          alert( "Successfully registered! Assigned Token: " + pushToken.token );
          this.getTokens();
      },(e)=>{ alert("Registered failed" + e); });
    else
      this.push.unregister().then((pushToken)=>{
        alert("Device successfully unregistered.");
        console.log("Push Token: ", this.pushToken);
        this.http.delete( this.url + "push/tokens/" + this.pushToken.id , this.options)
            .subscribe(()=>{
              console.log("Token Deleted")
            }, (e) => {
              console.log("Error" + e);
            });            
              this.token= '';
              this.pushToken = null;
              this.getTokens();
      }, (e)=>{
        alert("Unregistered failed! Error: " + e);
      })
  }

  onClickSelectAll(){
    this.devices = ["Send to All", this.deviceTokens];
  }

  //Gets the selected recipents (devices) from dropdown box.
  // getSelectedDevices(devices){
  //   if(!devices)
  //     alert('No device(s) selected')
  //   else
  //     alert("Selected Devices " + devices);
  // }

  onClickSend(devices){  
    let data = {
      "tokens": devices,
      "send_to_all" : false,
      "profile": "ionpush2",
      "notification": {
        "title" : this.title,
        "message": this.message
        }
    }
    if(devices == "sendAll"){
      data.tokens = [];
      data.send_to_all = true;
    }
    if(!devices) alert("No device(s) selected");
    
      this.http.post( this.url + "push/notifications", data , this.options)
            .subscribe(()=>{
              console.log("Push successfully send");
              this.clearAll();
            }, (e) =>{
              console.log("Push failed to send. Error " + e);
            });
        }

}
