import { Container, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Cart({ cart, increaseQty, decreaseQty, removeItem, clearCart }) {

 const navigate = useNavigate();

 const total = cart.reduce((t,i)=>t+i.price*i.qty,0);

 const handleCheckout = () => {

  const isLogin = localStorage.getItem("userLogin");

  if(!isLogin){
   toast.error("Please login or signup first");
   navigate("/signup");
   return;
  }

  navigate("/checkout");
 };

 if(!cart.length){
  return <h3 className="text-center mt-5">Cart is Empty</h3>;
 }

 return (
 <Container className="mt-4">

 <h2 className="text-center mb-4">Shopping Cart</h2>

 <Table bordered hover responsive>

 <thead>
 <tr>
 <th>Name</th>
 <th>Price</th>
 <th>Qty</th>
 <th>Total</th>
 <th>Action</th>
 </tr>
 </thead>

 <tbody>

 {cart.map(i=>(
 <tr key={i.id}>

 <td>{i.name}</td>
 <td>₹{i.price}</td>

 <td>
 <Button size="sm" onClick={()=>decreaseQty(i.id)}>-</Button>
 {" "}{i.qty}{" "}
 <Button size="sm" onClick={()=>increaseQty(i.id)}>+</Button>
 </td>

 <td>₹{i.price*i.qty}</td>

 <td>
 <Button size="sm" variant="danger" onClick={()=>removeItem(i.id)}>
 Remove
 </Button>
 </td>

 </tr>
 ))}

 </tbody>

 </Table>

 <h4>Total: ₹{total}</h4>

 <Button variant="secondary" onClick={clearCart}>Clear Cart</Button>{" "}
 <Button variant="success" onClick={handleCheckout}>Checkout</Button>

 </Container>
 );
}