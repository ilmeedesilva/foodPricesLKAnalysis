import React from "react";
import { Route, Routes } from "react-router-dom";
import TopNavigation from "./components/Navbar/TopNavigation";
import Dashboard from "./pages/Dashboard/Dashboard";
import DataExploration from "./pages/DataExploration/DataExploration";
import ModelSelection from "./pages/ModelSelection/ModelSelection";
import Predictions from "./pages/Predictions/Predictions";
import PerformanceAnalysis from "./pages/PerformanceAnalysis/PerformanceAnalysis";
import Reports from "./pages/Reports/Reports";
import DatasetsSelection from "./pages/DatasetsSelection/DatasetsSelection";

const AppRoutes = () => (
  <>
    <TopNavigation />
    <Routes>
      <Route path="/" exact={true} element={<Dashboard />} />
      <Route
        path="/data-exploration"
        exact={true}
        element={<DataExploration />}
      />
      <Route
        path="/model-selection"
        exact={true}
        element={<ModelSelection />}
      />
      <Route path="/predictions" exact={true} element={<Predictions />} />
      <Route path="/datasets" exact={true} element={<DatasetsSelection />} />
      <Route
        path="/performance-analysis"
        exact={true}
        element={<PerformanceAnalysis />}
      />
      <Route path="/reports" exact={true} element={<Reports />} />
    </Routes>
  </>
);

export default AppRoutes;
