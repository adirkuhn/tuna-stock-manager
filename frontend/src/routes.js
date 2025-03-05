import { jsx as _jsx } from "react/jsx-runtime";
import StockCentral from "./StockCentral/StockCentral.tsx";
import Settings from "./Settings/Settings.tsx";
export const NAV_ROUTES = {
    "/": { label: "Stock Central", element: _jsx(StockCentral, {}) },
    "/settings": { label: "Settings", element: _jsx(Settings, {}) }
};
