import React, {useEffect, useState} from "react";
import {BatchService} from "./Service/BatchService.ts";
import {Batch} from "./Entity/Batch";

interface ProductBatchProps {
    productId: number;
    productName: string;
    batches: Batch[];
    nonBatchStock: number;
    onClose: () => void;
}

const ProductBatch: React.FC<ProductBatchProps> = ({ productId, productName, batches, nonBatchStock, onClose }) => {
    const [batchList, setBatchList] = useState<Batch[]>(batches);
    const [stockWithoutBatch, setStockWithoutBatch] = useState(nonBatchStock);
    const [newBatch, setNewBatch] = useState<Batch | null>(null);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchBatches();
    }, [productId]);

    const fetchBatches = async () => {
        setLoading(true);
        try {
            const batches = await BatchService.getBatches(productId);
            setBatchList(batches);
        } catch (error) {
            setError("Failed to fetch batches: " + error);
        }
        setLoading(false);
    }

    const handleBatchChange = (index: number, field: keyof Batch, value: string | number) => {
        const updatedBatches = [...batchList];
        updatedBatches[index] = { ...updatedBatches[index], [field]: value };
        setBatchList(updatedBatches);
    };

    const handleNewBatchChange = (field: keyof Batch, value: string | number) => {
        if (newBatch) {
            setNewBatch({ ...newBatch, [field]: value });
        }
    };

    const addNewBatch = () => {
        setNewBatch({ batchName: "", expiryDate: "", quantity: 0 });
    };

    const saveNewBatch = () => {
        if (newBatch?.batchName && newBatch.expiryDate && newBatch.quantity > 0) {
            setBatchList([...batchList, newBatch]);
            setNewBatch(null);
        }
    };

    const deleteBatch = (index: number) => {
        if (!confirm("Are you sure you want to delete this batch?")) {
            return;
        }

        const updatedBatches = batchList.filter((_, i) => i !== index);
        setBatchList(updatedBatches);
    };

    const handleSave = async () => {
        await BatchService.saveBatches(productId, batchList, stockWithoutBatch);
        onClose();
    };

    const totalStock = batchList.reduce((sum: number, batch) => sum + batch.quantity, stockWithoutBatch);

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg">
                <h2 className="text-lg font-semibold">{productName} - Manage Batches</h2>

                {/* Loading Spinner */}
                {loading && <div>Loading...</div>}

                {/* Error Message */}
                {error && <div className="text-red-500">{error}</div>}

                {!loading && !error && (
                    <>
                    <h3 className="mt-2 text-xl font-bold text-center">Total Stock: {totalStock}</h3>

                    <h3 className="mt-4">Stock Without Batch</h3>
                    <input
                        type="number"
                        value={stockWithoutBatch}
                        onChange={(e) => setStockWithoutBatch(Number(e.target.value))}
                        className="w-full border rounded p-1"
                    />

                    {/* Batches Table */}
                    <h3 className="mt-4">Batch Stock</h3>
                    <table className="w-full border mt-2">
                        <thead>
                        <tr>
                            <th className="border p-2">Batch Name</th>
                            <th className="border p-2">Expiry Date</th>
                            <th className="border p-2">Quantity</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {batchList.map((batch, index) => (
                            <tr key={index}>
                                <td className="border p-2">
                                    {editIndex === index ? (
                                        <input
                                            type="text"
                                            value={batch.batchName}
                                            onChange={(e) => handleBatchChange(index, "batchName", e.target.value)}
                                            className="w-full border rounded p-1"
                                        />
                                    ) : (
                                        batch.batchName
                                    )}
                                </td>
                                <td className="border p-2">
                                    {editIndex === index ? (
                                        <input
                                            type="date"
                                            value={batch.expiryDate}
                                            onChange={(e) => handleBatchChange(index, "expiryDate", e.target.value)}
                                            className="w-full border rounded p-1"
                                        />
                                    ) : (
                                        batch.expiryDate
                                    )}
                                </td>
                                <td className="border p-2">
                                    {editIndex === index ? (
                                        <input
                                            type="number"
                                            value={batch.quantity}
                                            onChange={(e) => handleBatchChange(index, "quantity", Number(e.target.value))}
                                            className="w-full border rounded p-1"
                                        />
                                    ) : (
                                        batch.quantity
                                    )}
                                </td>
                                <td className="border p-2 flex space-x-2">
                                    {editIndex === index ? (
                                        <button
                                            onClick={() => setEditIndex(null)}
                                            className="bg-green-500 text-white px-2 py-1 rounded"
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => setEditIndex(index)}
                                            className="bg-blue-500 text-white px-2 py-1 rounded"
                                        >
                                            Edit
                                        </button>
                                    )}
                                    <button
                                        onClick={() => deleteBatch(index)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {/* Add New Batch Row */}
                        {newBatch && (
                            <tr>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        placeholder="Batch Name"
                                        value={newBatch.batchName}
                                        onChange={(e) => handleNewBatchChange("batchName", e.target.value)}
                                        className="w-full border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="date"
                                        value={newBatch.expiryDate}
                                        onChange={(e) => handleNewBatchChange("expiryDate", e.target.value)}
                                        className="w-full border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        placeholder="Qty"
                                        value={newBatch.quantity}
                                        onChange={(e) => handleNewBatchChange("quantity", Number(e.target.value))}
                                        className="w-full border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <button
                                        onClick={saveNewBatch}
                                        className="bg-green-500 text-white px-2 py-1 rounded"
                                    >
                                        ✓
                                    </button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>

                    {/* Add Batch Button */}
                    {!newBatch && (
                        <button
                            onClick={addNewBatch}
                            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded w-full"
                        >
                            + Add Batch
                        </button>
                    )}

                    {!newBatch && (
                        <div className="flex justify-end space-x-2 mt-4">
                            <button onClick={onClose} className="bg-gray-400 px-4 py-2 rounded">Cancel</button>
                            <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
                        </div>
                    )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductBatch;
