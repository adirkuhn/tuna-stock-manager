import {Batch} from "./Batch";

export interface Product {
    id: number;
    name: string;
    price: string;
    sale_price: string;
    stock: string;
    stock_status: string;
    image: string;
    low_stock: string;
    batches: Batch[];
}
