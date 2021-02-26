import { Component, OnInit } from '@angular/core';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {
  
  title = 'Catálogo de Leite';
  faChevronRight = faChevronRight;

  constructor() { }

  ngOnInit(): void {
  }

}
