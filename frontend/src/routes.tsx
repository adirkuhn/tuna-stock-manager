import StockCentral from "./StockCentral/StockCentral.tsx";
import Settings from "./Settings/Settings.tsx";
import React from "react";

interface RouteConfig {
    label: string;
    element: React.JSX.Element;
}
export const NAV_ROUTES: Record<string, RouteConfig> = {
    "/": { label: "Stock Central", element: <StockCentral /> },
    "/settings": { label: "Settings", element: <Settings /> }
};