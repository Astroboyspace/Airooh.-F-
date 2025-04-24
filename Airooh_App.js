
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";

// UI Components
const Button = ({ onClick, children, className = "", variant }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg font-semibold shadow-md ${variant === "destructive" ? "bg-red-600 text-white" : "bg-blue-500 text-white"} ${className}`}
  >
    {children}
  </button>
);

const Input = ({ placeholder, value, onChange }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="px-4 py-2 border rounded-lg w-full"
  />
);

const Card = ({ children }) => (
  <div className="border rounded-xl p-4 shadow-md bg-white max-w-md w-full mx-auto my-4">
    {children}
  </div>
);

const CardContent = ({ children }) => <div>{children}</div>;

// Main App
const App = () => {
  useEffect(() => {
    // Remove the serviceWorker since it caused a 404 in deployment
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/buyer/*" element={<BuyerRoutes />} />
        <Route path="/seller/*" element={<SellerRoutes />} />
      </Routes>
    </Router>
  );
};

// Routes
const BuyerRoutes = () => (
  <Routes>
    <Route path="login" element={<BuyerLogin />} />
    <Route path="home" element={<BuyerHome />} />
    <Route path="product/:id" element={<ProductDetails />} />
    <Route path="checkout" element={<Checkout />} />
    <Route path="*" element={<Navigate to="login" />} />
  </Routes>
);

const SellerRoutes = () => (
  <Routes>
    <Route path="login" element={<SellerLogin />} />
    <Route path="home" element={<SellerHome />} />
    <Route path="sell" element={<SellProduct />} />
    <Route path="*" element={<Navigate to="login" />} />
  </Routes>
);

// Login Screens
const BuyerLogin = () => <LoginForm role="buyer" redirect="/buyer/home" />;
const SellerLogin = () => <LoginForm role="seller" redirect="/seller/home" />;

const LoginForm = ({ role, redirect }) => {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const sendOTP = () => setOtpSent(true);
  const verifyOTP = () => (otp === "1234" ? navigate(redirect) : alert("Invalid OTP"));

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h2 className="text-2xl font-bold">{role.charAt(0).toUpperCase() + role.slice(1)} Login</h2>
      <Input placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
      {!otpSent ? (
        <Button onClick={sendOTP}>Send OTP</Button>
      ) : (
        <>
          <Input placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
          <Button onClick={verifyOTP}>Verify OTP</Button>
        </>
      )}
    </div>
  );
};

// Pages
const RoleSelection = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold">Welcome to Airooh</h1>
      <div className="flex gap-4">
        <Button onClick={() => navigate("/buyer/login")}>Buyer</Button>
        <Button onClick={() => navigate("/seller/login")}>Seller</Button>
      </div>
    </div>
  );
};

const BuyerHome = () => {
  const level = useAILevel();
  const navigate = useNavigate();
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Your Level: {level}</h2>
      <h2 className="text-xl font-bold mb-4">Products</h2>
      <Card>
        <CardContent>
          <p>Sample Product</p>
          <Button onClick={() => navigate("/buyer/product/1")}>View</Button>
        </CardContent>
      </Card>
    </div>
  );
};

const ProductDetails = () => {
  const navigate = useNavigate();
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Product Name</h2>
      <p>Product Description</p>
      <Button onClick={() => navigate("/buyer/checkout")}>Buy Now</Button>
    </div>
  );
};

const Checkout = () => {
  const basePrice = 1000;
  const commission = 0;
  const totalPrice = basePrice + commission + 100;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Checkout</h2>
      <p>Product Price: Rs. {basePrice}</p>
      <p className="font-semibold">Total: Rs. {totalPrice}</p>
      <div className="my-2">
        <p>Select Payment Method</p>
        <Button>JazzCash</Button>
        <Button>Easypaisa</Button>
      </div>
      <p>Delivery by TCS</p>
    </div>
  );
};

const SellerHome = () => {
  const level = useAILevel();
  const navigate = useNavigate();
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Your Level: {level}</h2>
      <h2 className="text-xl font-bold mb-4">Your Products</h2>
      <Button className="fixed bottom-4 left-1/2 transform -translate-x-1/2" onClick={() => navigate("/seller/sell")}>Sell</Button>
      <Card>
        <CardContent>
          <p>Your Product</p>
          <Button variant="destructive">Delete</Button>
        </CardContent>
      </Card>
    </div>
  );
};

const SellProduct = () => (
  <div className="p-4">
    <h2 className="text-xl font-bold mb-4">Add Product</h2>
    <Input placeholder="Product Name" />
    <Input placeholder="Description" />
    <Input placeholder="Price" />
    <Button>Post Product</Button>
  </div>
);

const useAILevel = () => 7;

export default App;
