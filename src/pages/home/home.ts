import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { PostDetail } from '../postDetail/post-detail.component';
import { StoresPosts } from '../storesPosts/stores-posts.component';
import { WpService } from '../../services/index';
import {UtilService} from '../../services/util/util.service'
// import {AuthService} from '../../services/auth/auth.service'

@Component({
    templateUrl: 'home.html',
    // providers: [AuthService]
})

export class Home {
    datas : any =[];
    searchKeyword:string="";
    posts: any;
    loader: any;
    isLoading: boolean = false;
    noMoreData: boolean = false;
    params = {
    };

    constructor(
        public navCtrl: NavController,
        private util:UtilService,
        private http: Http,
        private nav:NavController,
        private wp: WpService
        // private auth :AuthService
    ) {

        this.params['page'] = 1;
        this.isLoading = true;

        this.wp.getPosts(this.params)
            .subscribe(
                data => {
                    this.posts = data;
                    this.isLoading = false;
                },
                error => {
                    this.isLoading = false;
                    console.log(error);
                }    
            );
    }

    ionViewDidEnter() {

    }

    postTapped(event, post) {
        this.nav.push(PostDetail, {
            post: post
        });
    }

    storeTapped(event, store) {
        console.log(store);
        this.nav.push(StoresPosts, {
            store: store
        });
    }

search(Keyword){
this.wp.searchKeyword(Keyword,1).subscribe(data => {datas => {
    this.datas =datas;
}
});
}

onCancel(ev,paramsObj){
    let params = this.util.transformRequest(paramsObj);
if(!ev.targt.value){
    this.wp.getPosts(paramsObj).subscribe(data =>{this.datas =data.json();
    })
}    
}

    loadMore(infiniteScroll) {
        this.params['page'] = this.params['page'] + 1;
        console.log(this.params['page']);

        this.wp.getPosts(this.params)
            .subscribe(
                data => {
                    for(let i = 0; i< data.length; i++) {
                        this.posts.push(data[i]);
                    }
                    
                    infiniteScroll.complete();
                }, 
                error => {
                    console.log(error);
                    infiniteScroll.complete();
                }
            );
    }

}