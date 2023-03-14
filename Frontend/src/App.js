import logo from './logo.svg';
import './App.css';
import LandingPages from './Component/LandingPages/LandingPages';
import ResetPasswordEmailPage from './Component/ResetPasswordEmailPage/ResetPasswordEmailPage';
import NewPass from './Component/ResetPasswordNewPass/NewPass';
import LoginPage from './Component/LoginPage/LoginPage';
import Registerpage from './Component/Registerpage/Registerpage';
import EmailConfirmSuccess from './Component/SuccessPage/EmailConfirmSuccess';
import PurchaseSuccess from './Component/SuccessPage/PurchaseSuccess';
import ListMenuKelasPage from './Component/ListMenuKelasPage/ListMenuKelasPage';
import DetailKelasPage from './Component/DetailKelasPage/DetailKelasPage';
import Checkout from './Component/Checkout/Checkout';
import InvoicePage from './Component/InvoicePage/InvoicePage';
import DetailInvoicePage from './Component/DetailInvoicePage/DetailInvoicePage';
import MyClassPage from './Component/MyClassPage/MyClassPage';
import NavbarCall from './Component/Navbar/NavbarCall';
import AdminUserPage from './Component/AdminUserPage/AdminUserPage';
import AdminPaymentMethod from './Component/AdminPaymentMethod/AdminPaymentMethod';

import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Routes,
  Navigate
} from "react-router-dom";

import { AuthProvider } from './context/AuthContext';
import NavbarContext from './context/NavbarContext';

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <NavbarContext>
          <NavbarCall/>
            
            <Routes>
            <Route path="/" element={<LandingPages/>} />
            <Route path="/myclass" element={<MyClassPage/>} />
            
            <Route path="/listmenukelas/:categoryId" element={<ListMenuKelasPage/>} />
            <Route path="/detailkelaspage/:courseId" element={<DetailKelasPage/>} />

            <Route path="/checkout" element={<Checkout/>} />
            <Route path="/purchasesuccess" element={<PurchaseSuccess/>} />
            <Route path="/invoice" element={<InvoicePage/>} />
            <Route path="/detailinvoice/:id" element={<DetailInvoicePage/>} />

            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<Registerpage/>} />
            <Route path="/verification/:token" element={<EmailConfirmSuccess/>} />

            <Route path="/resetpasswordemail" element={<ResetPasswordEmailPage/>} />
            <Route path="/resetpassword/:token" element={<NewPass/>} />

            <Route path="/admin/user" element={<AdminUserPage />} />
            <Route path="/admin/payment-method" element={<AdminPaymentMethod />} />

            <Route path="*" element={<Navigate to='/' replace ></Navigate>}/>
            </Routes>
            
          </NavbarContext>
        </BrowserRouter>
      </AuthProvider>
      
      
      
    </div>
  );
}

export default App;
