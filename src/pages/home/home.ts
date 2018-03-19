import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { FormControl } from '@angular/forms';
import { PostDetail } from '../postDetail/post-detail.component';
import { StoresPosts } from '../storesPosts/stores-posts.component';
import { WpService } from '../../services/index';
import {UtilService} from '../../services/util/util.service'
import { ProfilePage } from '../profile/profile';
import {AuthService} from '../../services/auth/auth.service';
import 'rxjs/add/operator/debounceTime';
// import {AuthService} from '../../services/auth/auth.service'
@Component({
    templateUrl: 'home.html',
    // providers: [AuthService]
})

export class Home {
   
    items:any;
    posts:any;;
    loader: any;
    isLoggedIn:boolean;
    category: any;
    id:number;
    selectedPost : any;
    isLoading: boolean = false;
    noMoreData: boolean = false;
    categoryId: number;
    categoryTitle: string;
    params = {
    };

    constructor(
        public navCtrl: NavController,
        private util:UtilService,
        private http: Http,
        private navParams:NavParams,
        private nav:NavController,
        private auth:AuthService,
        private wp: WpService,
        
        // private auth :AuthService
    ) {
        // this.category = navParams.get('id');
        // this.selectedPost = navParams.get('post');
        this.initializeItems();

        this.params['page'] = 1;
        this.isLoading = true;


        this.categoryId = this.navParams.get('id');
        this.categoryTitle = this.navParams.get('title');

        this.wp.getPosts(this.categoryId)
            .subscribe(
                data => {
                    
                    this.posts = data;
                    this.items =this.posts;
                    this.isLoading = false;
                    this.isLoggedIn=true;
                    
                },
                error => {
                    this.isLoading = false;
                    console.log(error);
                }    
            );
    }

    ionViewDidLoad() {


    }
   
    initializeItems() {
        this.items = this.posts;
  
      }

      getItems(ev: any) {
        // Reset items back to all of the items
        this.initializeItems();
    
        // set val to the value of the searchbar
        let val = ev.target.value;
     
    
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
          this.items = this.items.filter((item) => {
            return (item.content.rendered.toLowerCase().indexOf(val.toLowerCase())> -1);
            // && (item.title.rendered.toLowerCase().indexOf(val.toLowerCase())> -1)
            
          })
        }
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
   

    loadMore(infiniteScroll) {
        // this.params['page'] = this.params['page'] + 1;
        // console.log(this.params['page']);

        this.wp.getPosts(this.categoryId)
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


logOut(){
    this.auth.logout();
    this.nav.setRoot(ProfilePage);
}
    
}