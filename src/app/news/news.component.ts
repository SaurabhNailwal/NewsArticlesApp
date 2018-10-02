import { Component, OnInit } from '@angular/core';
import { NewsapiService } from '../newsapi.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  newsList;
  searchTerm: string;

  constructor(private newsapiservice: NewsapiService) { }

  ngOnInit() {
    this.getNewsList();
  }

  getNewsList() {

    this.searchTerm = 'UIC';

    console.log ('News:' + this.searchTerm);

    this.newsapiservice.getNewsList(this.searchTerm)
    .subscribe(data => this.newsList = data);

  }

}
