import { Routes, Route, Navigate } from "react-router-dom";

import Overview from "../pages/Overview";
import Landing from "../pages/Landing";
import Moments from "../pages/Moments";
import Explore from "../pages/Explore";
import AppLayout from "../layout/MainLayout";
import Discoveries from "../pages/Discoveries";

function AppRoutes() {
    return (
        <Routes>

            <Route path="/" element={<Landing />} />

            <Route element={<AppLayout />}>

                <Route path="/overview" element={<Overview />} />

                <Route path="/moments" element={<Moments />} />

                <Route path="/explore" element={<Explore />} />

                <Route path="/discoveries" element={<Discoveries />} />

            </Route>

            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />

        </Routes>
    );
}

export default AppRoutes;