import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})



export class CommonServiceService {

  constructor(
    private http: HttpClient
  ) {

  }

  apiCall(type:string,url:string,body={},header={}){


    switch(type.toLowerCase()){
      case 'get':{
        return this.http.get(url);
      }
      case 'post':{
        return this.http.post(url,body);
      }
      case 'put':{
        return this.http.get(url);
      }
      case 'delete':{
        return this.http.get(url);
      }
    }
  }
}
