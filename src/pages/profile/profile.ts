import { Component } from '@angular/core';

import { AuthService, WpService } from '../../services/index';
import { NavController } from 'ionic-angular';
import { Home } from '../home/home';
import {TabsPagePage} from '../tabs/tabs'

@Component({
    templateUrl: './profile.html',
})
export class ProfilePage {
    userInfo: any = {};

    constructor(
        private auth: AuthService,
        public nav :NavController,
        private wp: WpService) {
            console.log(this.auth.user);
    }

    getInfo() {
        console.log(this.auth.token);
        this.wp.getCurrentUserProfile().subscribe(data => {
            console.log(data);
        }, (error) => {
        });
    }

    userAddComment() {
        let obj = {
            author: 1,
            content: 'YourCommentHere1',
            post: 55
        };

        this.wp.userAddComment(obj)
            .subscribe(data => {
                console.log(data);
            });
    }

    logout() {
        this.auth.logout();
    }

    home(){
        this.nav.setRoot(Home);
    }

}