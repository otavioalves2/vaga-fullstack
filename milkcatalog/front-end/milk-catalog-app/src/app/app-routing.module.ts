import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDataTableComponent } from './product-data-table/product-data-table.component';
import { ProductComponent } from './product/product.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
{ path: '', redirectTo: '/search', pathMatch: 'full' },
{ path: 'search', component: SearchComponent },
{ path: 'product', component: ProductDataTableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
