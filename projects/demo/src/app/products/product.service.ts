import { Injectable } from "@angular/core";

@Injectable()
export class ProductService {
    public getDate(): Date {
        return new Date();
    }
}