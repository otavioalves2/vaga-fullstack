import { Component, OnInit } from '@angular/core';
import { faArrowAltCircleLeft, faArrowAltCircleRight, faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {
  farTrashAlt = faTrashAlt;
  farEdit = faEdit;
  farArrowAltCircleLeft = faArrowAltCircleLeft;
  farArrowAltCircleRight = faArrowAltCircleRight;

  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: Product[]) =>{
      console.log(data);
      this.products = data;
    })
  }
}
