import React, {useEffect,useState} from "react";
import axios from "axios";

const Products=()=>{
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get("https://fakestoreapi.com/products")
        .then((response) => {
            console.log("Products fetched:", response.data);
            setProducts(response.data);
        })
        .catch((error) => {
            console.error("Error fetching products:", error);
        });
    }, []);
    return(
        <div>
            <h1>Products List</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <h2>{product.title}</h2>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <p>Category: {product.category}</p>
                        <p><img src={product.image} alt={product.title} /></p>
                    </li>
                ))}
            </ul>   
        </div>
    )
}

export default Products;
