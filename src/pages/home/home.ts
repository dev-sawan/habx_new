import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController } from 'ionic-angular';
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
    // datas : any =[];
    searchKeyword:string="";
    // searchQuery: string = '';
    // searchTerm: string = '';
    // searchControl: FormControl;
    // items:any;
    posts: any;
    loader: any;
    isLoggedIn:boolean;
    isLoading: boolean = false;
    noMoreData: boolean = false;
    params = {
    };

    constructor(
        public navCtrl: NavController,
        private util:UtilService,
        private http: Http,
        private nav:NavController,
        private auth:AuthService,
        private wp: WpService,
        
        // private auth :AuthService
    ) {
        // this.searchKeyword= "";
        
        // this.searchControl = new FormControl();
        // this.searchQuery = '';
        this.params['page'] = 1;
        this.isLoading = true;

        this.wp.getPosts(this.params)
            .subscribe(
                data => {
                    this.posts = data;
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

        // this.setFilteredItems();
 
        // this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
 
        //     this.setFilteredItems();
 
        // });

    }
    // setFilteredItems() {
 
    //     this.posts = this.filterItems(this.searchTerm);
 
    // }

    postTapped(event, post) {
        this.nav.push(PostDetail, {
            post: post
        });
    }
    
        onInput(ev:any){
            console.log(this.searchKeyword)
            let val = ev.target.value;
            if(val && val.trim()!==''){
        this.posts =this.posts.filter( function (post){
        return post.toLowerCase().includes(val.toLowerCase());
                });

            }
        }

    storeTapped(event, store) {
        console.log(store);
        this.nav.push(StoresPosts, {
            store: store
        });
    }
   

    // initializeItems() {
    //     this.items =this.posts;
       
    //   }
    
    //   getItems(ev: any) {
    //     // Reset items back to all of the items
    //     this.initializeItems();
    
    //     // set val to the value of the searchbar
    //     let val = ev.target.value;
    
    //     // if the value is an empty string don't filter the items
    //     if (val && val.trim() != '') {
    //       this.items = this.items.filter((item) => {
    //         return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
    //       })
    //     }
    //   }


    //   filterItems(searchTerm){
 
    //     return this.posts.filter((post) => {
    //         return post.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    //     });    
 
    // }

    // getItems(ev: any) {
       
    //     let serVal = ev.target.value;
    //     if (serVal && serVal.trim() != '') {
    //       this.posts = this.posts.filter((post) => {
    //         return (post.toLowerCase().indexOf(serVal.toLowerCase()) > -1);
    //       })
    //     }
    //   }





    // getItems(ev:any){
    //    let serVal = ev.target.value;
    //    if (serVal && serVal.trim()!=''){
    //        this.posts = this.posts.filter((post)) => {
    //            return ( posts.toLowerCase().indexOf(serVal.toLowerCase())> -1);
    //        }
           
    //    }



    // }


    // getPosts() {
    //     this.posts = this.postsResults;
    // }

    // getItems(searchbar) {
    //     // Reset items back to all of the items
    // this.getPosts();
    //     // set q to the value of the searchbar
    //     var q = searchbar.value;
    //     // if the value is an empty string don't filter the items
    //     if (q.trim() == '') {
    //       return;
    //     }
      
    //      this.posts = this.posts.filter((v) => {
      
    //       if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
    //          return true;
    //         }
      
    //         return false;
    //       })
      
    //    }
    //    onCancelSearchbar(searchbar) {
    //     this.getPosts();
    // }

    // onClearSearchbar(searchbar) {
    //     this.posts();
    // }

// search(searchKeyword){
// this.wp.searchKeyword(searchKeyword,1).subscribe(data => {datas => {
//     console.log(datas)
//     this.posts =data;
// }
// });
// }

// onCancel(ev,paramsObj){
//     let params = this.util.transformRequest(paramsObj);
// if(!ev.targt.value){
//    return this.wp.getPosts(paramsObj).subscribe(data =>{this.datas =data.json();
//     })
// }    
// }

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

//  ngOnInit() {
//     this.getCustomers()
//   }

//   getCustomers() {
//     let values = sessionStorage.getItem('url') + '/api/CustomerLocations?' + 'BusinessUnitId=' + this.BusinessUnitId;
//     this.http.get(values).map(res => res.json()).subscribe(data => {
      
//       this.customers = data;
//       console.log(data);

//     }, (err) => {
//       console.log(err);

//     });

//   }


//   initializeItems() {
//     this.customers;

//   }
//   initialize() {

//     this.items = this.customers;
//   }
//   getItems(ev: any) {



//     let val = ev.target.value;
//     alert(val)
//     if (ev.target.value === "" || val === undefined) {
//       this.initialize();
//     }

//     if (val && val.trim() != '') {
//       this.customers = this.customers.filter((item) => {


//         return (item.CustomerName.toLowerCase().indexOf(val.toLowerCase()) > 1);
//       })
//     }
//   }

logOut(){
    this.auth.logout();
    this.nav.setRoot(ProfilePage);
}
    
}