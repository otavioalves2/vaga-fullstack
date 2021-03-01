import { Component, OnInit } from '@angular/core';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { ProductDataTableComponent } from '../product-data-table/product-data-table.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {
  //Header title
  title = 'Catálogo de Leite';

  //Filter input value
  filterinput!: String;

  //FA Icon
  faChevronRight = faChevronRight;

  
  constructor(private dataSource: ProductDataTableComponent, private router: Router) { 
  }

  ngOnInit(): void {
  }

  //Routes to the main page by passing the search filter as a parameter, if it is already on the main page, does the search without routing
  searchFilter(): void {
    if(this.router.url === "/search"){
      this.router.navigate(['/product', this.filterinput]);
    }else{
      this.dataSource.updateData(this.filterinput);
    }
  }
}
