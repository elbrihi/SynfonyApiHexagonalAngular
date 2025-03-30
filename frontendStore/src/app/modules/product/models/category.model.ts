import { Product } from "./product.service";

export class Category
{
    id?:number;
    categoryName?: string = "";
    categoryStatus?: boolean = false;
    products?: Product[] = []
   
    paginatedProducts?: Product[] = []; // For paginated products
    expanded?: boolean = false; // To track expanded state
    currentPage?: number = 1; // Default to page 1
    productsItemsPerPage?: number = 5; // Default to 5 items per page
    
    

}