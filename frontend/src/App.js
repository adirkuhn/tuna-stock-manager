import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './App.css';
import Layout from "./Layout.tsx";
import { HashRouter, Route, Routes } from "react-router-dom";
import { NAV_ROUTES } from "./routes.tsx";
import StockCentral from "./StockCentral/StockCentral.tsx";
function App() {
    return (_jsx(HashRouter, { children: _jsx(Routes, { children: _jsxs(Route, { path: "/", element: _jsx(Layout, {}), children: [_jsx(Route, { index: true, element: _jsx(StockCentral, {}) }), Object.entries(NAV_ROUTES).map(([path, { element }]) => (_jsx(Route, { path: path, element: element }, path))), _jsx(Route, { path: "*", element: _jsx("div", { children: "Not Found" }) })] }) }) }));
}
export default App;
