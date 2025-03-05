export interface Batch {
    id?: number; // Optional for newly added batches
    batchName: string;
    expiryDate: string;
    quantity: number;
}