import { Component } from "@angular/core";
import { ProductService } from "./product.service";
import { ModalReference } from "projects/ngx-modal-dialog/src/public-api";

@Component({
    template: `
        <div>
            Testing add product. {{date}}
        </div>
    `
})
export class AddProductComponent {
    public date: Date

    constructor(
        private readonly _productService: ProductService,
        private readonly _modalReference: ModalReference<any>
    ) {
        this.date = _productService.getDate();
    }
}