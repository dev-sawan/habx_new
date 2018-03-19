import { Component } from '@angular/core';
import { AuthService } from '../../services/index';
import { NavController } from 'ionic-angular';
import { Home } from '../../pages/home/home';

@Component({
    selector: 'login-form',
    templateUrl: './login-form.html',
})
export class LoginFormComponent {

    loginStatusMessage: string;
    loginModel: any = {}
    isLoading: boolean = false;

    constructor(private auth: AuthService, public nav:NavController) {
    }

    login(e) {
        this.isLoading = true;
        this.loginStatusMessage = '';
        this.auth.login(this.loginModel.username, this.loginModel.password)
            .subscribe(
                result => {
                    if (result === true) {
                        // login successful
                        
                        this.loginStatusMessage = 'Login successful!';
                         this.nav.setRoot(Home);
                    } else {
                        // login failed - token issue
                        this.loginStatusMessage = 'Something wrong with token.';
                    }
                    
                    this.isLoading = false;
                },
                result => {
                    //rest call error
                    this.isLoading = false;
                    this.loginStatusMessage = 'Username or password is incorrect';
                }
            );
        return false;
    }

    logout() {
        this.auth.logout();
    }

    // skipLogin(){
    //     this.nav.push(Home);
    //     this.loginStatusMessage= 'Please Login to check posts';
    //     this.isLoading= true;
   
    // }
}