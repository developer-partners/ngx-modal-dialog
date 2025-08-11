import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ModalModule } from "projects/ngx-modal-dialog/src/public-api";
import { ProductListComponent } from "./product-list.component";
import { ProductService } from "./product.service";

@NgModule({
    declarations: [
        ProductListComponent
    ],
    imports: [
        ModalModule,
        RouterModule.forChild([
            {
                path: '',
                component: ProductListComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ],
    providers: [
        ProductService
    ]
})
export class ProductModule {

}