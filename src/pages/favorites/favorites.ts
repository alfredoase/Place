import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  //En esta página se obtienen los partidos marcados como favoritos.
  favList: object[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidEnter() {
    this.getFavList(); 
  }
  
  getFavList(){
    this.favList = this.navParams.get('favList');
  }
}
