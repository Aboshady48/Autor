import axios from "axios";
import { useState, useEffect } from "react";

import "./Admin.css";

export const Admin = () => {
  const [view, setView] = useState("orders"); // "orders", "products", "createProduct"
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  const [newProduct, setNewProduct] = useState({
    productId: "",
    productName: "",
    productPrice: "",
    productDescription: "",
    productBrand: "",
    productCategory: "",
    imageUrl: "",
    stock: ""
  });

  // Load orders
  useEffect(() => {
    if (view === "orders") {
      axios.get("http://localhost:3000/api/order", { withCredentials: true })
        .then(res => setOrders(res.data))
        .catch(err => console.error(err));
    }
  }, [view]);

  // Load products
  useEffect(() => {
    if (view === "products") {
      axios.get("http://localhost:3000/api/products", { withCredentials: true })
        .then(res => setProducts(res.data))
        .catch(err => console.error(err));
    }
  }, [view]);

  const handleStatusChange = (orderId, newStatus) => {
    axios.put(`http://localhost:3000/api/order/${orderId}`, { newStatus }, { withCredentials: true })
      .then(res => {
        alert("Status updated");
        setOrders(prev =>
          prev.map(order =>
            order._id === orderId ? { ...order, orderStatus: newStatus } : order
          )
        );
      })
      .catch(err => console.error(err));
  };

  const handleDeleteProduct = (productId) => {
    axios.delete(`http://localhost:3000/api/products/${productId}`, { withCredentials: true })
      .then(() => {
        alert("Product deleted");
        setProducts(prev => prev.filter(p => p.productId !== productId));
      })
      .catch(err => console.error(err));
  };

  const handleCreateProduct = () => {
    axios.post(`http://localhost:3000/api/products`, newProduct, { withCredentials: true })
      .then(() => {
        alert("Product created");
        setNewProduct({
          productId: "",
          productName: "",
          productPrice: "",
          productDescription: "",
          productBrand: "",
          productCategory: "",
          imageUrl: "",
          stock: ""
        });
      })
      .catch(err => console.error(err));
  };

  return (<div className="admin-container">
  {/* Sidebar */}
  <div className="admin-sidebar">
    <h2>Admin Panel</h2>
    <button onClick={() => setView("orders")}>Orders</button>
    <button onClick={() => setView("products")}>Products</button>
    <button onClick={() => setView("createProduct")}>Create Product</button>
  </div>

  {/* Main Content */}
  <div className="admin-main">
    {view === "orders" && (
      <div>
        <h2>All Orders</h2>
        {orders.map(order => (
          <div key={order._id} className="admin-card">
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Status:</strong> {order.orderStatus}</p>
            <select
              value={order.orderStatus}
              onChange={(e) => handleStatusChange(order._id, e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <p><strong>Items:</strong> {order.items.length}</p>
          </div>
        ))}
      </div>
    )}

    {view === "products" && (
      <div>
        <h2>All Products</h2>
        {products.map(product => (
          <div key={product.productId} className="admin-card admin-card-actions">
            <div>
              <p><strong>{product.productName}</strong> - ${product.productPrice}</p>
            </div>
            <button
              onClick={() => handleDeleteProduct(product.productId)}
              className="admin-delete-btn"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    )}

    {view === "createProduct" && (
      <div>
        <h2>Create Product</h2>
        {Object.keys(newProduct).map(key => (
          <div key={key} className="admin-input-group">
            <label>{key}</label>
            <input
              type="text"
              value={newProduct[key]}
              onChange={e => setNewProduct({ ...newProduct, [key]: e.target.value })}
            />
          </div>
        ))}
        <button onClick={handleCreateProduct} className="admin-create-btn">
          Create
        </button>
      </div>
    )}
  </div>
</div>

  );
};
