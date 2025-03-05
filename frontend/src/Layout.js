import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './App.css';
import { Outlet, Link, useLocation } from "react-router-dom";
import { NAV_ROUTES } from "./routes.tsx";
function Layout() {
    const location = useLocation();
    const currentLocation = location.pathname || "/";
    console.log(location);
    return (_jsxs("div", { id: "tuna-stock-manager", className: "min-h-full", children: [_jsx("nav", { className: "bg-gray-800", children: _jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex h-16 items-center justify-between", children: [_jsxs("div", { className: "flex items-center", children: [_jsxs("div", { className: "flex flex-wrap justify-between", children: [_jsx("img", { className: "size-8 mt-1", src: "https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500", alt: "Tuna Stock Manager" }), _jsx(Link, { to: '/', className: "text-3xl ml-2 font-normal leading-normal text-white", children: "Tuna" })] }), _jsx("div", { className: "hidden md:block", children: _jsx("div", { className: "ml-10 flex items-baseline space-x-4", children: Object.entries(NAV_ROUTES).map(([path, { label }]) => (_jsx(Link, { to: path, className: `rounded-md px-3 py-2 text-sm font-medium ${currentLocation === path ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`, "aria-current": currentLocation === path ? "page" : undefined, children: label }, path))) }) })] }), _jsx("div", { className: "hidden md:block", children: _jsx("div", { className: "ml-4 flex items-center md:ml-6", children: _jsxs("button", { type: "button", className: "relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden", children: [_jsx("span", { className: "absolute -inset-1.5" }), _jsx("span", { className: "sr-only", children: "View notifications" }), _jsx("svg", { className: "size-6", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", "aria-hidden": "true", "data-slot": "icon", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" }) })] }) }) }), _jsx("div", { className: "-mr-2 flex md:hidden", children: _jsxs("button", { type: "button", className: "relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden", "aria-controls": "mobile-menu", "aria-expanded": "false", children: [_jsx("span", { className: "absolute -inset-0.5" }), _jsx("span", { className: "sr-only", children: "Open main menu" }), _jsx("svg", { className: "block size-6", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", "aria-hidden": "true", "data-slot": "icon", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" }) }), _jsx("svg", { className: "hidden size-6", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", "aria-hidden": "true", "data-slot": "icon", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18 18 6M6 6l12 12" }) })] }) })] }) }) }), _jsx("header", { className: "bg-white shadow-sm", children: _jsx("div", { className: "mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8", children: _jsx("h1", { className: "text-3xl font-bold tracking-tight text-gray-900", children: NAV_ROUTES[currentLocation]?.label || '404' }) }) }), _jsx("main", { className: "bg-white shadow-sm", children: _jsx("div", { className: "mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8", children: _jsx(Outlet, {}) }) })] }));
}
export default Layout;
