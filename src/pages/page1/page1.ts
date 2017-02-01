import { Component, NgZone } from '@angular/core';
import {Page2} from '../page2/page2';
import { NavController, Platform, ToastController, ModalController } from 'ionic-angular';
import { Network } from 'ionic-native';
import {Camera} from 'ionic-native';
import {SocialSharing} from 'ionic-native';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {
  batterystatus: string;
  orientation: string;
  networkStatus: string = "unknown";
  networkType:string;
  public base64Image: string;


  constructor(public navCtrl: NavController, public zone: NgZone, public platform: Platform, public toastCtrl: ToastController, public modalCtrl:ModalController) {
    this.batterystatus = "keine Ahnung";
    this.networkType = Network.type;
    if (platform.isLandscape()) {
      this.orientation = "landscape-primary";
    }
    if (platform.isPortrait()) {
      this.orientation = "portrait-primary";
    }


    zone.runOutsideAngular(() => {
      window.addEventListener("batterystatus", (status) => {
        this.batterystatus = "Level: " + status["level"] + ", isPlugged: " + status["isPlugged"];
        console.log("Level: " + status["level"] + " isPlugged: " + status["isPlugged"]);
      }, false);
    });
    zone.runOutsideAngular(() => {
      window.addEventListener('orientationchange', (doOnOrientationChange) => {
        let screenOrientation = screen["orientation"];
        this.orientation = screenOrientation.type;
        this.showToast("Fenster-Orientierung: " + screenOrientation.type);
      });
    });


    let disconnectSubscription = Network.onDisconnect().subscribe(() => {
      this.networkStatus = "OFFLINE";
      this.showToast("NETZWERK OFFLINE");
    });

    let connectSubscription = Network.onConnect().subscribe(() => {
      this.networkStatus = "ONLINE";
      this.showToast("NETZWERK ONLINE");
    })


  }

  showToast(message){
    let toast = this.toastCtrl.create({
      message:message,
      duration:3000,
      position:'top'
    })
    toast.present();
  }

  takePicture(){
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        allowEdit: true,
        targetWidth: 400,
        targetHeight: 400
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this.presentPictureModal();
    }, (err) => {
        console.log(err);
    });
  }

  presentPictureModal(){
    let modal = this.modalCtrl.create(Page2, {string: this.base64Image});
    modal.present();
  }

  whatsAppShare(){
    SocialSharing.shareViaWhatsApp('Hi ich möchte 1 fancy bild mit dir teilen', this.base64Image, "").then(()=>{
      alert("success");
    }).catch(error=>{
      alert(error.message);
    });
  }

 

}
    
