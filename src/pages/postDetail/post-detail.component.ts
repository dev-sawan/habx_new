import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
// import { DocumentViewer } from '@ionic-native/document-viewer';
@Component({
    templateUrl:  'post-detail.html'
})

export class PostDetail {
    category: any;
    selectedPost : any;
    isEditMode: boolean = false; 

    comment: any = {
        content: {rendered: ''},
        author: null,
        post: null
    }

    constructor(private nav: NavController, navParams: NavParams,
        // private document: DocumentViewer                    
    ) {
        this.category = navParams.get('category');
        this.selectedPost = navParams.get('post');
        // this.document.viewDocument('assets/myFile.pdf', 'application/pdf', options)
    }

    editCommentChanged(selecteComment) {
        selecteComment.content.rendered = selecteComment.content.rendered.replace(/<br \/>/g, '');
        this.comment = selecteComment;
        this.isEditMode = true;   
    }

} 