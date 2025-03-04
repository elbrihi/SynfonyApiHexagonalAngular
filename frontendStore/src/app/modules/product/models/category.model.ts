import { Product } from "./product.service";

export class Category
{
    id?:number;
    categoryName?: string = "";
    categoryStatus?: boolean = false;
    products?: Product[] = []
    expanded?: boolean; // To track expanded state

}