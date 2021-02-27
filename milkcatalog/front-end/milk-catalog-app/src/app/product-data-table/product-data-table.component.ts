import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ProductDataTableDataSource } from './product-data-table-datasource';
import { faArrowAltCircleLeft, faArrowAltCircleRight, faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-product-data-table',
  templateUrl: './product-data-table.component.html',
  styleUrls: ['./product-data-table.component.sass']
})
export class ProductDataTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Product>;
  dataSource!: ProductDataTableDataSource;

  farTrashAlt = faTrashAlt;
  farEdit = faEdit;
  farArrowAltCircleLeft = faArrowAltCircleLeft;
  farArrowAltCircleRight = faArrowAltCircleRight;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['code', 'name', 'actions'];
  
  constructor(private productService: ProductService) { 
    this.dataSource = new ProductDataTableDataSource();
  }

  ngOnInit() {
    this.productService.getProducts().subscribe((data: Product[]) =>{
      this.dataSource.products = data;
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
