import { Component } from '@angular/core';

import { NavController, NavParams, ViewController, ActionSheetController } from 'ionic-angular';
import { SocialSharing } from 'ionic-native';

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2 {
  stringSrc:any;
  actionSheet:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public view:ViewController, public actionSCtrl: ActionSheetController) {
    this.actionSheet = this.actionSCtrl.create({
      title: 'Teile dein Bild',
      buttons: [
        {
          text:'WhatsApp',
          handler: ()=>{
            this.whatsAppShare();
          }
        }
      ]
    })
   this.stringSrc = navParams.get("string");
  }

  presentActionSheet(){
    this.actionSheet.present();
  }

  dismiss(){
    this.view.dismiss();
  }

  whatsAppShare(){
    SocialSharing.shareViaWhatsApp('Hi ich möchte 1 fancy bild mit dir teilen', this.stringSrc, "").then(()=>{
      alert("success");
    }).catch(error=>{
      alert(error.message);
    });
  }

  
}
