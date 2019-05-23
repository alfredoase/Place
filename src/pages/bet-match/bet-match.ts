import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, Events } from 'ionic-angular';
import { BetRestProvider } from '../../providers/bet-rest/bet-rest';

/**
 * Generated class for the BetMatchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-bet-match',
  templateUrl: 'bet-match.html',
})

export class BetMatchPage {
  matchId: any;
  teamLocal: string;
  teamVisitor: string;
  marketId: number;
  tipoMerc: number;
  cuotaO: number;
  cuotaU: number;
  dineroO: number;
  dineroU: number;
  marketList: any[];
  din: number;
  dinO: number;
  dinU: number;
  camposActivos: boolean;
  name: string;
  arrayBool: any[];

  constructor(public eventCtrl: Events, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, public betAPI: BetRestProvider) {
  }

  //Cuando entra en la vista, ejecuta el metodo para obtener los partidos.
  ionViewDidEnter() {
    this.arrayBool = [false, false, false];
    this.getMatchBy();
  }

  //Obtiene la informacion de la api de partidos.
  getMatchBy() {
    let id = this.navParams.get('matchId');

    if (id != this.matchId) {
      this.matchId = id;
      let loading = this.loadingCtrl.create({
        content: 'Getting the info...'
      });
      loading.present();
      //Con el .subscribe te suscribes a la api, para obtener la informacion
      this.betAPI.getMatchById(id).subscribe(data => {
        this.matchId = data[0]['idPartido'];
        this.teamLocal = data[0]['equipoLoc'];
        this.teamVisitor = data[0]['equipoVis'];

        let markets = [];
        for (let i of data[0]['markets']) {
          this.marketId = i['idMercado'];
          this.tipoMerc = i['golesMerc'];
          this.cuotaO = i['cuotaO'];
          this.cuotaU = i['cuotaU'];
          this.dineroO = i['dineroO'];
          this.dineroU = i['dineroU'];

          //Actualizamos la información con el .push
          markets.push([this.marketId, this.tipoMerc, this.cuotaO, this.cuotaU, this.dineroO, this.dineroU, this.matchId]);
        }
        this.marketList = markets;
        loading.dismiss();
      }, error => {
        let toast = this.toastCtrl.create({
          message: 'ERROR!' + error,
          duration: 5000,
          position: 'bottom'
        });
        loading.dismiss();
        toast.present();
      });
    }
  }

  //Crea la apuesta en la api.
  createBetMarket(market, isOver) {
    if (isOver) {
      this.arrayBool[market[0]] = [true];
      this.desactivarT(market);

      this.betAPI.betMarket(market, isOver, this.dinO).subscribe();

      let loading = this.loadingCtrl.create({
        content: 'Upadting the info...'
      });
      loading.present();
      this.betAPI.getMatchById(market[0]).subscribe(data => {
        loading.dismiss();
      }, error => {
        let toast = this.toastCtrl.create({
          message: 'ERROR!' + error,
          duration: 5000,
          position: 'bottom'
        });
        toast.present();
        loading.dismiss();
      });
    }else if (!isOver) {
      this.arrayBool[market[0]] = [true];
      this.desactivarT(market);

      this.betAPI.betMarket(market, isOver, this.dinU).subscribe();

      let loading = this.loadingCtrl.create({
        content: 'Upadting the info...'
      });
      loading.present();
      this.betAPI.getMatchById(market[0]).subscribe(data => {
        loading.dismiss();
      }, error => {
        let toast = this.toastCtrl.create({
          message: 'ERROR!' + error,
          duration: 5000,
          position: 'bottom'
        });
        toast.present();
        loading.dismiss();
      });
    }
  }

  //Desactiva el partido sobre el que se ha hecho la apuesta.
  desactivarT(market) {
    this.camposActivos = this.arrayBool[market[0]];
    return this.camposActivos;
  }
}
