import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, ModalController, ViewController } from 'ionic-angular';
import { BetRestProvider } from '../../providers/bet-rest/bet-rest';
import { BetMatchPage } from '../bet-match/bet-match';
import { LoginComponent } from '../../components/login/login';
import { FavoritesPage } from '../favorites/favorites';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  matchesList: any[];

  matchId: number;
  teamLocal: string;
  teamVisitor: string;

  srcLocal: string;
  srcVisitor: string;

  //matchesFav: any[];
  isFav: boolean;

  constructor(public viewCtrl: ViewController, public mdlCtrl: ModalController, public toastCtrl: ToastController, public navCtrl: NavController, public betAPI: BetRestProvider, public loadingCtrl: LoadingController) {
  }

  //Metodo que solo se ejecuta cuando se carga la vista
  ionViewDidLoad() {
    //this.matchesFav = [];
    this.getListMatches();
  }

  //Lista de partidos
  getListMatches() {
    let loading = this.loadingCtrl.create({
      content: 'Getting the info...'
    });
    loading.present();
    this.betAPI.getMatchesList().subscribe(data => {
      let matches = [];
      for (let i in data) {
        this.matchId = data[i]['idPartido'];
        this.teamLocal = data[i]['equipoLoc'];
        this.teamVisitor = data[i]['equipoVis'];
        matches.push([this.matchId, this.teamLocal, this.teamVisitor]);
      }
      this.matchesList = matches;
      loading.dismiss();


    }, error => {
      let toast = this.toastCtrl.create({
        message: '¡Error obteniendo la información!',
        duration: 5000,
        position: 'middle'
      });
      loading.dismiss();
      toast.present();

    });
  }

  //Metodo para sacar la ruta de las imagenes
  srcImages(match) {
    return 'assets/imgs/' + match + ".png";
  }


  createBet(match) {
    this.mostrarLog(match);
  }

  //Metodo para mostrar la pagina de login
  mostrarLog(match) {
    let mdlCtrl = this.mdlCtrl.create(LoginComponent,
      {
        enableBackdropDismiss: false
      });
    mdlCtrl.onDidDismiss(data => {
      if (data) {
        if(data.result === "logged") {
          //Bet details page:
          let id = match;
          this.navCtrl.push(BetMatchPage, {
            matchId: id
          });
        }else if(data.result === "nologged") {
          let toast = this.toastCtrl.create({
            message: "Error al loguearse.",
            duration: 5000,
            position: 'middle'
          });
          toast.present();
        }
      }
    });
    mdlCtrl.present();
  }
}
