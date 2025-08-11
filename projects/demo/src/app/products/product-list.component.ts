import { Component, ViewContainerRef } from "@angular/core";
import { ModalService } from "projects/ngx-modal-dialog/src/public-api";
import { AddProductComponent } from "./add-product.component";
import { ProductService } from "./product.service";

@Component({
    templateUrl: './product-list.component.html'
})
export class ProductListComponent {
    constructor(
        private readonly _modalService: ModalService,
        private readonly _containerRef: ViewContainerRef
    ) {

    }

    public addProduct(): void {
        this._modalService.show(AddProductComponent, {
            title: 'Add Product',
            viewContainerRef: this._containerRef
        });
    }
}