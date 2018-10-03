import { Component, OnInit } from '@angular/core';
import { NewsapiService } from '../newsapi.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  drop = true;
  selectedOption;
  newsList;
  searchTerm: string;
  dropdownList: string[];

  constructor(private newsapiservice: NewsapiService) {

    // More values can be added to dropdown list without touching the html
    this.dropdownList = ['Most Recent', 'Popularity'];
  }

  ngOnInit() {
    this.getNewsList();
  }

  changeValue(selectedVal) {
    this.selectedOption = selectedVal;

    console.log ('close: ' + this.selectedOption);
    this.getNewsList();
  }

  getNewsList() {

    this.searchTerm = 'UIC';

    console.log ('News:' + this.searchTerm);
    console.log ('Dropdown selection:' + this.selectedOption);

    // based on selection calling the service
    if (this.selectedOption) {
      this.newsapiservice.getNewsListByPopularity(this.searchTerm)
    .subscribe(data => this.newsList = data);

    } else {
      this.newsapiservice.getNewsList(this.searchTerm)
    .subscribe(data => this.newsList = data);

    }


  }

}
