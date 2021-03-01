import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ProductDataTableDataSource } from './product-data-table-datasource';
import { faArrowAltCircleLeft, faArrowAltCircleRight, faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-data-table',
  templateUrl: './product-data-table.component.html',
  styleUrls: ['./product-data-table.component.sass']
})
export class ProductDataTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Product>;

  //FA Icons
  farTrashAlt = faTrashAlt;
  farEdit = faEdit;
  farArrowAltCircleLeft = faArrowAltCircleLeft;
  farArrowAltCircleRight = faArrowAltCircleRight;

  // Columns displayed in the table. Columns IDs can be added, removed, or reordered.
  displayedColumns = ['code', 'name', 'actions'];

  //New product name coming from TextBox in Modal Window for edit function
  productNewName!: string;
  
  constructor(private route: ActivatedRoute, public dataSource: ProductDataTableDataSource, private productService: ProductService, private modalService: NgbModal) {}
  
  //Get the "filter" value from the search route, and then send it to the updateData function
  ngAfterViewInit(){
    this.updateData(this.route.snapshot.params.filter);
  }

  //Updates DataTable attributes and updates the product list
  populateTable(data: Product[]){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.dataSource.products = data;
    this.refresh();
  }

  //Call the function that returns the products that passed through the filter and call the populateTable function passing the list of returned products as a parameter
  updateData(filter:String){
    this.productService.getProductsByFilter(filter)
      .subscribe(
        data => {
          this.populateTable(data);
        },
        error => {
          console.log(error);
        });
  }

  //Force data table update
  refresh(){
    this.paginator._changePageSize(this.paginator.pageSize); 
  }

  //Updates the data table product list
  appendDataTable(product: Product){
    this.dataSource.products.push(product);
    this.refresh();
  }

  //Call function that deletes a product according to its code
  deleteProduct(code: String){
    //Deletes list item from data table
    this.dataSource.products.forEach((product,index)=>{
      if(product.code==code) {
        this.dataSource.products.splice(index,1)
      };
    });
    //Delete item from database
    this.productService.delete(code)
    .subscribe(
      data=>{
         console.log(data);
      });

    this.refresh();
  }

  //Function that will handle the modal event, sending the object corresponding to the selected line as a parameter for editing
  openEditProductWindow(content: any, productData: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if(result == "save"){
        this.editProduct(productData);
      }
    });
  }

  //Function that will update the product name
  editProduct(productData:any) {
    //New product containing the current code and modifying the name for the content of the textbox
    const data = {
      code: productData.code,
      name: this.productNewName
    };
    //Updates the data table
    let productUpdateIndex = this.dataSource.products.findIndex(product => product.code == data.code);
    this.dataSource.products[productUpdateIndex] = data;
    //Update the database
    this.productService.update(data.code, data)
    .subscribe(
      data=>{
         console.log(data);
      });
    this.refresh();
  }
  
  
}
