import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
function StockCentral() {
    //set global variable for ajax url
    if (!window.) {
        window.tunaData = {
            ajaxUrl: 'http://example.com/wp-admin/admin-ajax.php',
            siteUrl: 'http://example.com'
        };
    }
    const url = `${window.tunaData.ajaxUrl}?action=get_products`;
    const tabs = [
        { label: "In stock", tag: "in-stock" },
        { label: "Out of stock", tag: "out-of-stock" },
        { label: "Backorder", tag: "backorder" },
        { label: "Low stock", tag: "low-stock" },
        { label: "All products", tag: "all-products" }
    ];
    const columns = [
        { type: 'image', content: 'img/path' },
        { type: 'text', content: 'Product name' },
        { type: 'text', content: 'Regular price' },
        { type: 'text', content: 'Sale price' },
        { type: 'text', content: 'Purchase price' },
        { type: 'text', content: 'Current stock' },
        { type: 'text', content: 'Low stock threshold' }
    ];
    const [selectedTab, setSelectedTab] = useState("in-stock");
    const [products, setProducts] = useState([]); // Store fetched products
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(""); // Error state for handling API issues
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError("");
            try {
                const response = await fetch(`${url}&status=${selectedTab}`);
                const data = await response.json();
                if (response.ok) {
                    setProducts(data); // Set products if the request was successful
                }
                else {
                    setError("Failed to load products.");
                }
            }
            catch (err) {
                setError("Failed to load products. Please try again.");
            }
            finally {
                setLoading(false);
            }
            console.log(products, loading, error);
        };
        fetchProducts();
    }, [selectedTab]); // This runs every time `selectedTab` changes
    return (_jsxs("div", { className: "container mx-auto", children: [_jsx("div", { className: "flex justify-end" }), _jsxs("div", { className: "flex justify-between mt-4", children: [_jsx("div", { className: "flex space-x-4", children: tabs.map(({ label, tag }) => (_jsx("button", { className: `px-4 py-2 rounded-md ${selectedTab === tag ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`, onClick: () => setSelectedTab(tag), children: label }, tag))) }), _jsxs("div", { className: "flex", children: [_jsx("input", { type: "text", placeholder: "Search products", className: "text-white border border-gray-300 p-1 rounded-md" }), _jsx("button", { className: "ml-2 bg-indigo-600 text-white px-4 py-1 rounded-md", children: "Search" })] })] }), _jsxs("table", { className: "table-auto w-full mt-4", children: [_jsx("thead", { children: _jsx("tr", { children: columns.map(({ content }) => (_jsx("th", { className: "border border-gray-300 p-2", children: content }, content))) }) }), _jsx("tbody", { children: _jsx("tr", { children: columns.map(({ content }) => (_jsx("td", { className: "border border-gray-300 p-2", children: "Content" }, content))) }) })] })] }));
}
export default StockCentral;
