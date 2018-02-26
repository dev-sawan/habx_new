import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

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

	constructor(
		private wordpressService: WpService,
		private navController: NavController,
		private loadingController: LoadingController) {}

	ngOnInit() {
		this.getCategories();
	}

	getCategories() {
		let loader = this.loadingController.create({
			content: "Please wait"
		});
		loader.present();
		
		this.wordpressService.getCategories()
		.subscribe(res => {
			this.categories = res;
		},
		error => console.log(error),
    () => loader.dismiss());
	}

	loadCategory(params) {
		
		this.navController.push(Home,{
			category:params
		});
	}

}
