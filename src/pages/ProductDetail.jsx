import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetail.css";

export default function ProductDetail({ products, addToCart }) {

  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(p => p.id === Number(id));

  if (!product) return <h2 style={{ color: "white", textAlign: "center" }}>Product Not Found</h2>;

  return (
    <div className="product-detail-container">

      <button className="back-btn" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>

      <div className="product-detail-card">

        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="product-detail-img"
          />
        )}

        <div className="product-detail-info">

          <h2>{product.name}</h2>

          <p className="price">₹{product.price}</p>

          <p>Stock: {product.stock}</p>

          <h3 className="desc-title">Product Description</h3>

          <p className="description">
            Experience powerful performance and modern design with this premium electronic product — built to make your daily life smarter, faster, and more convenient.

            <br /><br />

            Designed using high-quality materials and advanced technology, this product delivers reliable speed, smooth operation, and long-lasting durability.
          </p>

          <button
            className="add-btn"
            disabled={product.stock === 0}
            onClick={() => addToCart(product)}
          >
            Add To Cart
          </button>

        </div>

      </div>

    </div>
  );
}
