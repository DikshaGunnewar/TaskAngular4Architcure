import { Component } from "@angular/core";
import { AuthService } from "app/core/services/auth.service";
import { Router } from "@angular/router";
import { debug } from "util";
import { User } from "app/login/models/user";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    user = new User('bob', 'password');

    constructor(public authService: AuthService, public router: Router) {

    }

    login() {
        this.authService.login(this.user.userName, this.user.password).subscribe(() => {
            if (this.authService) {
                let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/';

                // Redirect the user
                this.router.navigate([redirect]);
            }
        });
    }
}