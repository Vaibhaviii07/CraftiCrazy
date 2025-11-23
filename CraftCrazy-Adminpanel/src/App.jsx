// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Order";
import OrderDetails from "./pages/OrderDetails";
import AddProduct from "./pages/Addproducts";
import AllProducts from "./pages/Allproducts";
import ProductDetail from "./pages/ProductDetails";
import CategoryList from "./pages/CategoryList";
import Customers from "./pages/Customers";
import CustomerReviewsPage from "./pages/Review";
import Notifications from "./pages/Notifications";
import SettingsPage from "./pages/SettingsPage";
import CreateInvoice from "./pages/CreateInvoice";
import InvoiceList from "./pages/InvoiceList";
import InvoiceDetails from "./pages/InvoiceDetails";
import CustomerContact from "./pages/CustomerContact";

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Router>
      <div className="flex bg-gray-50 min-h-screen overflow-hidden">
        {/* Sidebar (Fixed and non-dimming) */}
        <div className="fixed top-0 left-0 h-full z-40">
          <Sidebar
            isSidebarOpen={true}
            isCollapsed={isCollapsed}
            toggleSidebar={() => {}}
            toggleCollapse={() => setIsCollapsed((prev) => !prev)}
          />
        </div>

        {/* Main content area */}
        <div
          className={`flex flex-col flex-1 min-h-screen transition-all duration-300 ${
            isCollapsed ? "ml-20" : "ml-64"
          }`}
        >
          {/* Navbar (fixed top, not dimming, not overlapping sidebar) */}
          <div className="fixed top-0 right-0 left-0 z-30 bg-white shadow-sm">
            <Navbar toggleSidebar={() => {}} />
          </div>

          {/* Main Page Content */}
          <main className="mt-16 p-6 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/details" element={<OrderDetails />} />
              <Route path="/addproducts" element={<AddProduct />} />
              <Route path="/allproducts" element={<AllProducts />} />
              <Route path="/products/:id" element={<ProductDetail/>} />
              <Route path="/catogaries" element={<CategoryList/>} />
              <Route path="/AllCustomer" element={<Customers />}/>
              <Route path="/review" element={<CustomerReviewsPage />}/>
              <Route path="/notification" element={<Notifications />}/>
              <Route path="/setting" element={<SettingsPage />}/>
              <Route path="/CreateInvoice" element={<CreateInvoice />}/>
              <Route path="/ListInvoice" element={<InvoiceList />}/>
              <Route path="/InvoiceDetail/:id" element={<InvoiceDetails />}/>
              <Route path="/contact" element={<CustomerContact />} />
              {/* <Route path="/InvoiceDetail/:id" element={<InvoiceDetail />} /> */}



            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;