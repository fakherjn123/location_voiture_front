import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../shared/components/navigation/Navbar";
import ProtectedRoute from "../shared/guards/ProtectedRoute";
import ManagerCarsPage from "../features/admin/pages/ManageCarsPage";
import CarDetailPage from "../features/cars/pages/CarDetailPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import CarsPage from "../features/cars/pages/CarsPage";
import LoginPage from "../features/auth/pages/LoginPage";
import DashboardPage from "../features/admin/pages/DashboardPage";
import MyRentalsPage from "../features/rentals/pages/MyRentalsPage";
import PaymentPage from "../features/payments/pages/PaymentPage";
import MyFacturesPage from "../features/factures/pages/MyFacturesPage";
import AllFacturesPage from "../features/admin/pages/AllFacturesPage";
import ManagerPaymentsPage from "../features/admin/pages/ManagePaymentsPage";
import OAuthSuccessPage from "../features/auth/pages/OAuthSuccessPage";
import ManageRentalsPage from "../features/admin/pages/ManageRentalsPage";
import ServicesPage from "../pages/Admin/Services";
import MonthlyReportsPage from "../pages/Admin/MonthlyReports";
import ReportsExportPage from "../pages/Admin/ReportsExport";
import PerformanceReportsForecastsPage from "../pages/Admin/PerformanceReportsForecasts";
import ClientsPage from "../pages/Admin/Clients";
import ClientDetailPage from "../pages/Admin/ClientDetail";
import ClientRatingPage from "../pages/Admin/ClientRating";

export default function Router() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<CarsPage />} />
        <Route path="/cars/:id" element={<CarDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/oauth-success" element={<OAuthSuccessPage />} />
        <Route
          path="/admin/payments"
          element={<ManagerPaymentsPage />}
        />
        {/* CLIENT */}
        <Route path="/rentals" element={
          <ProtectedRoute><MyRentalsPage /></ProtectedRoute>
        } />
        <Route path="/payment/:rentalId" element={
          <ProtectedRoute><PaymentPage /></ProtectedRoute>
        } />
        <Route path="/payment" element={
          <ProtectedRoute><PaymentPage /></ProtectedRoute>
        } />
        <Route path="/facture" element={
          <ProtectedRoute><MyFacturesPage /></ProtectedRoute>
        } />
        <Route path="/admin/cars" element={<ManagerCarsPage />} />
        {/* ADMIN */}
        <Route path="/dashboard" element={
          <ProtectedRoute role="admin"><DashboardPage /></ProtectedRoute>
        } />


        <Route path="/admin/factures" element={
          <ProtectedRoute role="admin"><AllFacturesPage /></ProtectedRoute>
        } />
        <Route path="/admin/rentals" element={
          <ProtectedRoute role="admin"><ManageRentalsPage /></ProtectedRoute>
        } />
        <Route path="/admin/services" element={
          <ProtectedRoute role="admin"><ServicesPage /></ProtectedRoute>
        } />
        <Route path="/admin/reports" element={
          <ProtectedRoute role="admin"><MonthlyReportsPage /></ProtectedRoute>
        } />
        <Route path="/admin/reports/export" element={
          <ProtectedRoute role="admin"><ReportsExportPage /></ProtectedRoute>
        } />
        <Route path="/admin/reports/forecasts" element={
          <ProtectedRoute role="admin"><PerformanceReportsForecastsPage /></ProtectedRoute>
        } />
        <Route path="/admin/clients" element={
          <ProtectedRoute role="admin"><ClientsPage /></ProtectedRoute>
        } />
        <Route path="/admin/clients/:id" element={
          <ProtectedRoute role="admin"><ClientDetailPage /></ProtectedRoute>
        } />
        <Route path="/admin/clients/rating/:id" element={
          <ProtectedRoute role="admin"><ClientRatingPage /></ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}