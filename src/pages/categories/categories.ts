import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';

// import { WordpressService } from '../shared/services/wordpress.service';
// import { WordpressPosts } from '../wordpress-posts/wordpress-posts.component';
import {PostDetail} from '../postDetail/post-detail.component';

import {WpService} from '../../services/wp/wp.service';
import {Home} from '../home/home';

@Component({
	templateUrl: 'categories.html',
	providers: [ WpService ]
})
export class Categories {

	categories: any;
	categoryId: number;
	categoryTitle: string;
	constructor(
		private wordpressService: WpService,
		private navController: NavController,
		private loadingController: LoadingController,
		private navCtrl:NavController,
		private navParams:NavParams) {
			
		}

	ngOnInit() {

		this.categoryId = this.navParams.get('id');
		this.categoryTitle = this.navParams.get('title');

		this.getCategories();
		
		
	}
	// getCategories(){
	// 	return this.wordpressService.getPostCategories(this.post);
	//   }
	
	getCategories() {
		let loader = this.loadingController.create({
			content: "Please wait"
		});
		loader.present();
		
		this.wordpressService.getCategories()
		.subscribe(res => {
			this.categories = res;
			// console.log(this.categories);
		},
		error => console.log(error),
    () => loader.dismiss());
	}

	goToCategoryPosts(categoryId,categoryTitle){
		this.navController.push(Home,{
		  id: categoryId,
		  title: categoryTitle
		})
	  }

	  
	// loadCategory(event,Items) {
		
	// 	this.navController.push(Home,{
	// 		categoryId:Items
	// 	});
	// }


}
