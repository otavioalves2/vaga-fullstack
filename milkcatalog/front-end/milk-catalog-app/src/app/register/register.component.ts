import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductDataTableComponent } from '../product-data-table/product-data-table.component';
import { ProductService } from '../product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  //Header title 
  title = "Cadastrar novo produto";

  //Product text box values
  product: Product = {
    code: '',
    name: ''
  };
  constructor(private productService: ProductService, private dataSource: ProductDataTableComponent, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  addProduct(): void {
    //New product containing text box values
    const data = {
      code: this.product.code,
      name: this.product.name
    };
    //Register new product in the database, and show toasts for success or failure
    this.productService.create(data)
      .subscribe(
        response => {
          this.toastr.success('Sucesso!', 'Cadastro realizado.');
          this.refreshDataTable(response);
          this.product.code = '';
          this.product.name = '';
        },
        error => {
          console.log(error);
          this.toastr.error('Erro!', 'Cadastro não realizado');
        });
  }

  //Updates data table with new value
  refreshDataTable(response: Product){
    this.dataSource.appendDataTable(response);
  }
}
