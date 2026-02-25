import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import Checkout from "./pages/Checkout";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProductDetail from "./pages/ProductDetail";
import OrderHistory from "./pages/OrderHistory";
import Receipt from "./pages/Receipt";

import "./App.css";

const defaultProducts = [
 { id: 1, name: "Laptop", price: 50000, stock: 15 },
 { id: 2, name: "Phone", price: 20000, stock: 20 },
 { id: 3, name: "Headphones", price: 3000, stock: 10 }
];

function App() {

 const navigate = useNavigate();
 const [search,setSearch] = useState("");

 const [products,setProducts] = useState(()=>{
  return JSON.parse(localStorage.getItem("products")) || defaultProducts;
 });

 const [cart,setCart] = useState(()=>{
  return JSON.parse(localStorage.getItem("cart")) || [];
 });

 useEffect(()=>{
  localStorage.setItem("products",JSON.stringify(products));
 },[products]);

 useEffect(()=>{
  localStorage.setItem("cart",JSON.stringify(cart));
 },[cart]);

 const cartCount = cart.reduce((t,i)=>t+i.qty,0);

 // ADD TO CART
 const addToCart = (product)=>{

  const login = localStorage.getItem("userLogin");

  if(login !== "true"){
   navigate("/signup");
   return;
  }

  if(product.stock === 0) return;

  setProducts(p =>
   p.map(x =>
    x.id===product.id ? {...x,stock:x.stock-1} : x
   )
  );

  setCart(c=>{
   const found = c.find(i=>i.id===product.id);

   if(found){
    return c.map(i =>
     i.id===product.id ? {...i,qty:i.qty+1} : i
    );
   }

   return [...c,{...product,qty:1}];
  });
 };

 // INCREASE
 const increaseQty = (id)=>{

  const prod = products.find(p=>p.id===id);
  if(!prod || prod.stock===0) return;

  setProducts(p=>p.map(x=>x.id===id?{...x,stock:x.stock-1}:x));
  setCart(c=>c.map(i=>i.id===id?{...i,qty:i.qty+1}:i));
 };

 // DECREASE
 const decreaseQty = (id)=>{

  setCart(c=>c.map(i=>{

   if(i.id===id && i.qty>1){

    setProducts(p=>p.map(x=>x.id===id?{...x,stock:x.stock+1}:x));

    return {...i,qty:i.qty-1};
   }

   return i;
  }));
 };

 // REMOVE
 const removeItem = (id)=>{

  const item = cart.find(i=>i.id===id);

  if(item){
   setProducts(p=>p.map(x=>x.id===id?{...x,stock:x.stock+item.qty}:x));
  }

  setCart(c=>c.filter(i=>i.id!==id));
 };

 // CLEAR CART
 const clearCart = ()=>{
  cart.forEach(i=>{
   setProducts(p=>p.map(x=>x.id===i.id?{...x,stock:x.stock+i.qty}:x));
  });

  setCart([]);
 };

 const filteredProducts = products.filter(p =>
  p.name.toLowerCase().includes(search.toLowerCase())
 );

 return (
 <>
 
 {/* Toast System */}
 <ToastContainer position="top-right" autoClose={2000} theme="colored" />

 <Navbar cartCount={cartCount}/>

 <Routes>

 <Route path="/" element={
 <Container className="mt-4">

 <h2 className="text-center fw-bold mb-3">Products</h2>

 <Form.Control
  className="mb-4"
  placeholder="Search products"
  value={search}
  onChange={e=>setSearch(e.target.value)}
 />

 {filteredProducts.length === 0 && (
  <h4 className="text-center text-danger">Product Not Found</h4>
 )}

 <Row className="g-4">

 {filteredProducts.map(p=>(

 <Col md={4} lg={3} key={p.id}>

 <Card
  className="product-card h-100"
  onClick={()=>navigate(`/product/${p.id}`)}
 >

 {p.image && <Card.Img src={p.image} />}

 <Card.Body className="d-flex flex-column">

 <Card.Title>{p.name}</Card.Title>

 <p>₹{p.price}</p>

 {p.stock <= 10 && p.stock > 0 && (
  <p style={{color:"red",fontWeight:"bold"}}>
   Only {p.stock} left
  </p>
 )}

 {p.stock === 0 && (
  <p style={{color:"red"}}>Out of Stock</p>
 )}

 <Button
  className="mt-auto"
  variant="success"
  disabled={p.stock===0}
  onClick={(e)=>{
   e.stopPropagation();
   addToCart(p);
  }}
 >
 Add To Cart
 </Button>

 </Card.Body>
 </Card>

 </Col>

 ))}

 </Row>
 </Container>
 }/>

 <Route path="/cart" element={
 <Cart
  cart={cart}
  increaseQty={increaseQty}
  decreaseQty={decreaseQty}
  removeItem={removeItem}
  clearCart={clearCart}
 />
 }/>

 <Route
 path="/checkout"
 element={
  localStorage.getItem("userLogin")==="true"
   ? <Checkout cart={cart} clearCart={clearCart}/>
   : <Login/>
 }
/>

 <Route path="/product/:id" element={<ProductDetail products={products} addToCart={addToCart}/>}/>
 <Route path="/login" element={<Login/>}/>
 <Route path="/signup" element={<Signup/>}/>

 <Route
 path="/orders"
 element={
  localStorage.getItem("userLogin")==="true"
   ? <OrderHistory/>
   : <Login/>
 }
/>

 <Route path="/receipt" element={<Receipt/>}/>

 <Route
 path="/dashboard"
 element={
  localStorage.getItem("userLogin")==="true"
   ? <UserDashboard/>
   : <Login/>
 }
/>

 {/* <Route path="/admin-login" element={<AdminLogin/>}/>

 <Route
 path="/admin-products"
 element={
  localStorage.getItem("adminLogin")==="true"
   ? <Admin/>
   : <AdminLogin/>
 }
/>

 <Route
 path="/admin-dashboard"
 element={
  localStorage.getItem("adminLogin")==="true"
   ? <AdminDashboard/>
   : <AdminLogin/>
 }
/> */}

 </Routes>
 </>
 );
}

export default App;