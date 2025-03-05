import React, {useEffect, useState} from "react";
import {StockManagerService} from "./Service/StockManagerService.ts";
import {Product} from "./Entity/Product";
import ProductBatch from "./ProductBatch.tsx";

function StockCentral(): React.JSX.Element {

    const tabs = [
        { label: "In stock", tag: "in-stock" },
        { label: "Out of stock", tag: "out-of-stock" },
        { label: "Backorder", tag: "backorder" },
        { label: "Low stock", tag: "low-stock" },
        { label: "All products", tag: "all-products" }
    ];

    const columns = [
        { type: 'image', content: 'img/path' },
        { type: 'text', content: 'Product name'},
        { type: 'text', content: 'Regular price'},
        { type: 'text', content: 'Sale price'},
        { type: 'text', content: 'Current stock'},
        { type: 'text', content: 'Low stock threshold'}
    ];

    const [selectedTab, setSelectedTab] = useState("in-stock");
    const [products, setProducts] = useState<Product[]>([]); // Store fetched products
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(""); // Error state for handling API issues
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);


    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(""); // Reset error message before each fetch

            try {
                const data = await StockManagerService.getProducts(selectedTab); // Fetch products using service
                setProducts(data); // Set products if the request was successful
            } catch (err) {
                setError("Failed to load products. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [selectedTab]); // This runs every time `selectedTab` changes

    const openBatchModal = (product: Product) => {
        setSelectedProduct(product);
    };

    return (
        <div className="container mx-auto">
            <div className="flex justify-end">
                {/*  add buttons to save when detect changes in stock  */}
            </div>
            <div className="flex justify-between mt-4">
                <div className="flex space-x-4">
                    {tabs.map(({label, tag}) => (
                        <button
                            key={tag}
                            className={`px-4 py-2 rounded-md ${
                                selectedTab === tag ? 'bg-indigo-600 text-white' : 'bg-gray-200'
                            }`}
                            onClick={() => setSelectedTab(tag)} // Change tab
                        >
                            {label}
                        </button>
                    ))}
                </div>
                <div className="flex">
                    <input type="text" placeholder="Search products"
                           className="text-white border border-gray-300 p-1 rounded-md"/>
                    <button className="ml-2 bg-indigo-600 text-white px-4 py-1 rounded-md">Search</button>
                </div>
            </div>

            {loading && <div className="mt-4 text-center">Loading products...</div>}
            {error && <div className="mt-4 text-center text-red-600">{error}</div>}

            <table className="table-auto w-full mt-4">
                <thead>
                <tr>
                    {columns.map(({content}) => (
                        <th key={content} className="border border-gray-300 p-2">{content}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 p-2">
                                <img src={product.image} alt={product.name} className="w-16 h-16" />
                            </td>
                            <td className="border border-gray-300 p-2">{product.name}</td>
                            <td className="border border-gray-300 p-2">{product.price}</td>
                            <td className="border border-gray-300 p-2">{product.sale_price}</td>
                            <td className="border border-gray-300 p-2">
                                <button onClick={() => openBatchModal(product)} className="text-blue-600 underline">
                                    {product.stock}
                                </button>
                            </td>
                            <td className="border border-gray-300 p-2">{product.low_stock}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={columns.length} className="border border-gray-300 p-2 text-center">No products available</td>
                    </tr>
                )}
                </tbody>
            </table>

            {selectedProduct && (
                <ProductBatch
                    productId={selectedProduct.id}
                    productName={selectedProduct.name}
                    batches={selectedProduct.batches || []}
                    nonBatchStock={Number(selectedProduct.stock)}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </div>
    );
}

export default StockCentral;