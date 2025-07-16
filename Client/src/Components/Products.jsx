import { useState, useEffect } from "react";
import axios from "axios";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/products", { withCredentials: true });
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();    
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <input
        type="text"
        value={search}
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />
      {products
        .filter(product => product.productName.toLowerCase().includes(search.toLowerCase()))
        .map((product) => (
          <div key={product.productId}>
            <h2>{product.productName}</h2>
            <p>{product.productDescription}</p>
            <p>${product.productPrice}</p>
            <img src={product.imageUrl} alt={product.productName} />
          </div>
      ))}
    </div>
  );
};
