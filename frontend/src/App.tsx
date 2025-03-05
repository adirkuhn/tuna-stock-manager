import './App.css'
import Layout from "./Layout.tsx";
import {HashRouter, Route, Routes} from "react-router-dom";
import {NAV_ROUTES} from "./routes.tsx";
import StockCentral from "./StockCentral/StockCentral.tsx";

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<StockCentral />} />
                    {Object.entries(NAV_ROUTES).map(([path, { element }]) => (
                        <Route key={path} path={path} element={element} />
                    ))}

                    <Route path="*" element={<div>Not Found</div>} />
                </Route>
            </Routes>
        </HashRouter>
    )
}

export default App
