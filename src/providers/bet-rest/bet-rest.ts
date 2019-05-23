import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the BetRestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BetRestProvider {
  //Ésta es la url de conexion con la API
  baseUrl: string ='http://localhost:52466/api/Matchs';

  constructor(public http: HttpClient) {
  }

  //Devuelve la lista de partidos
  getMatchesList(){
    return this.http.get(this.baseUrl);
  }

  //Devuelve el partido por la id que se le pasa en la url
  getMatchById(id){
    return this.http.get(this.baseUrl +"/?idpartido=" + id);
  }

  //Se crea la apuesta segun el dinero que se le pase y el tipo de mercado, over o under
  //siempre todo en JSon
  betMarket(market, isOver, din){
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    headers.append("cache-control", "no-cache");

    let baseUrlParams: string = this.baseUrl + "/" + market[6] + "?isOver=" + isOver;
    let marketObj = {};

    if(isOver){
      marketObj = {
        "idMercado": market[0],
        "idPartido": market[6],
        "dineroO": din,
        "dineroU": market[5]
      };
    }else if(!isOver){
      marketObj = {
        "idMercado": market[0],
        "idPartido": market[6],
        "dineroO": market[4],
        "dineroU": din
      };
    }
    
    //Con el .put se envian datos a la api
    return this.http.put(baseUrlParams, JSON.stringify(marketObj), {headers});
  }
}
