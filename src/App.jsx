import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './shared/components/layout/DashboardLayout';
import Dashboard from './pages/Admin/Dashboard';
import Cars from './pages/Admin/Cars';
import Clients from './pages/Admin/Clients';
import ClientDetail from './pages/Admin/ClientDetail';
import ClientRating from './pages/Admin/ClientRating';
import Contracts from './pages/Admin/Contracts';
import Invoices from './pages/Admin/Invoices';
import Services from './pages/Admin/Services';
import MonthlyReports from './pages/Admin/MonthlyReports';
import ReportsExport from './pages/Admin/ReportsExport';
import PerformanceReportsForecasts from './pages/Admin/PerformanceReportsForecasts';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

        {/* Admin Routes with DashboardLayout */}
        <Route path="/admin" element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="cars" element={<Cars />} />
          <Route path="clients" element={<Clients />} />
          <Route path="clients/:id" element={<ClientDetail />} />
          <Route path="clients/rating/:id" element={<ClientRating />} />
          <Route path="contracts" element={<Contracts />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="services" element={<Services />} />
          <Route path="reports" element={<MonthlyReports />} />
          <Route path="reports/export" element={<ReportsExport />} />
          <Route path="reports/forecasts" element={<PerformanceReportsForecasts />} />
          {/* Add more admin routes here as we build them */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
