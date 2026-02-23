import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

export default function Admin() {

  const navigate = useNavigate();

  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("products")) || []
  );

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const totalStock = products.reduce((a, b) => a + b.stock, 0);

  // ✅ FIXED IMAGE UPLOAD (Base64)
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(reader.result);  // Base64 string
    };
  };

  const addProduct = () => {

    if (!name || !price || !stock || !image)
      return alert("Fill all fields");

    if (editId) {
      setProducts(products.map(p =>
        p.id === editId
          ? { ...p, name, price: +price, stock: +stock, image }
          : p
      ));
      setEditId(null);
    } else {
      setProducts([
        ...products,
        {
          id: Date.now(),
          name,
          price: +price,
          stock: +stock,
          image
        }
      ]);
    }

    setName("");
    setPrice("");
    setStock("");
    setImage("");
  };

  const editProduct = (p) => {
    setEditId(p.id);
    setName(p.name);
    setPrice(p.price);
    setStock(p.stock);
    setImage(p.image);
  };

  const deleteProduct = (id) => {
    if (window.confirm("Delete product?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const logout = () => {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminName");
    navigate("/admin-login");
  };

  return (
    <div className="admin-layout">

      <aside className="sidebar">
        <h2>ADMIN PANEL</h2>
        <p
          onClick={() => navigate("/admin-dashboard")}
          style={{ cursor: "pointer" }}
        >
          Dashboard
        </p>
      </aside>

      <main>

        <div className="topbar">
          <h2>Product List</h2>
          <button onClick={logout}>Logout</button>
        </div>

        <div className="cards">
          <div className="card">
            Products <br /><b>{products.length}</b>
          </div>
          <div className="card">
            Stock <br /><b>{totalStock}</b>
          </div>
        </div>

        <div className="form">
          <input
            placeholder="Product Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={e => setStock(e.target.value)}
          />
          <input type="file" accept="image/*" onChange={handleImage} />

          {image && <img src={image} className="preview" alt="preview" />}

          <button onClick={addProduct}>
            {editId ? "Update" : "Add"}
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>
                  <img src={p.image} className="table-img" alt={p.name} />
                </td>
                <td>{p.name}</td>
                <td>₹{p.price}</td>
                <td>{p.stock}</td>
                <td>
                  <button
                    className="edit"
                    onClick={() => editProduct(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete"
                    onClick={() => deleteProduct(p.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </main>
    </div>
  );
}
