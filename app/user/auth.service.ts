import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IUser } from './user.model';

@Injectable()
export class AuthService {
    public currentUser: IUser;
    
    constructor(private http: Http) {}

    public loginUser(userName: string, password: string) {
        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers});
        const loginInfo = { username: userName, password };

        return this.http.post('/api/login', loginInfo, options)
                .do((resp) => {
                    if (resp) {
                        this.currentUser = resp.json().user as IUser;
                    }
                }).catch((error) => {
                    return Observable.of(false);
                });
    }

    public updateCurrentUser(firstName: string, lastName: string) {
        this.currentUser.firstName = firstName;
        this.currentUser.lastName = lastName;

        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers});

        return this.http.put(`/api/users/${this.currentUser.id}`, this.currentUser, options);
    }

    public isAuthenticated(): boolean {
        return !!this.currentUser;
    }

    public checkAuthenticationStatus() {
        return this.http.get('/api/currentIdentity').map((response: any) => {
            if (response._body) {
                return response.json();
            } else {
                return {};
            }
        }).do((currentUser) => {
            if (!!currentUser.userName) {
                this.currentUser = currentUser;
            }
        }).subscribe();
    }

    public logout() {
        this.currentUser = undefined;

        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers});

        return this.http.post('/api/logout', {}, options);
    }
}
