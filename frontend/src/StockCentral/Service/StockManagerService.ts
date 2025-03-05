import { Product } from "../Entity/Product";

export class StockManagerService {
    private static endpoint = `${window.tunaData.ajaxUrl}?action=tuna/v1/stock-manager`;

    static async getProducts(status: string): Promise<Product[]> {
        const url = `${this.endpoint}&status=${status}`;
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            return data as Product[];
        }

        throw new Error("Failed to fetch products");
    }
}
