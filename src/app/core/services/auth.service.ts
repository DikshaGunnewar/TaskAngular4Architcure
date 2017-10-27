import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { appConfig } from "app/core/config/app.config";


@Injectable()
export class AuthService {
    redirectUrl: string;
    isLoggedIn = false;
    public token: string;

    constructor(private http: HttpClient) {
        // set token if saved in local storage
        // var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // this.token = currentUser && currentUser.token;
    }

    login(userName: string, password: string): Observable<boolean> {
        const body = { userName: 'bob', password: 'password' };
        return this.http.post(`${appConfig.apiUrl}/authenticate`, body)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let authRes: any = response;
                if (authRes) {
                    // set token property
                    this.token = authRes.token;
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', this.token);
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    logout(): void {
        this.isLoggedIn = false;
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}
