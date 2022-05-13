import { Injectable } from '@angular/core';
import { HttpClient , HttpParams} from '@angular/common/http';
import {Admin} from '../_models/entity';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  base_url = environment.base_url;
  baseurl = this.base_url + 'Admin';
  constructor(public http: HttpClient) { }

  getLogin(username: string) {
    const param = new HttpParams().set('Id', username);
    return this.http.get<Admin>(this.baseurl, {params: param});
  }
}
