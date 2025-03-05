import {Batch} from "../Entity/Batch";

export class BatchService {
    private static endpoint = `${window.tunaData.ajaxUrl}?action=tuna/v1/stock-manager/batch`;

    static async saveBatches(productId: number, batches: Batch[], stockWithNoBatch: number): Promise<Response> {
        const url = `${this.endpoint}/save`;

        return fetch(url, {
            method: 'POST',
            body: JSON.stringify({productId: productId, batches: batches, stockWithNoBatch: stockWithNoBatch}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    static async getBatches(productId: number) {
        const url = `${this.endpoint}&productId=${productId}`;
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            return data.map((batch: any) => ({
                ...batch,
                quantity: Number(batch.quantity),
            })) as Batch[];
        }

        throw new Error("Failed to fetch products");
    }
}
