import { Component } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';

/**
 * Generated class for the LoginComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginComponent {
  text: string;
  user: string;
  pass: string;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {
  }

  //Metodo que simula el login a la aplicacion para poder hacer la apuesta.
  login(){
    if((this.user === "user")||(this.pass === "pass")){
      this.viewCtrl.dismiss({result:"logged"});
    }else if((this.user !== "user")||(this.pass !== "pass")){
      this.viewCtrl.dismiss({result:"nologged"});
    }
  }

  exit(){
    this.viewCtrl.dismiss({});
  }

}
