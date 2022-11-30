import React, { useEffect, useState } from "react";
import { getProducts } from "../apicalls/coreapicalls";
import Card from "./fragments/Card";
import Navbar from "./fragments/Navbar";

const Home = () => {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState([]);

    const loadAllProducts = () => {
        getProducts().then(data => {
            if(data.errorCode) {
                setError(data.error);
            } else {
                setProducts(data);
            }
        });

    }

    useEffect(() => {
        loadAllProducts();
    }, []);

    return(
        <div>
            <Navbar />
            <div className="row">
                {
                    products.map((product, index) => {
                        return(
                            <div key={index} className="col-4 mb-4">
                                <Card product={product} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home;