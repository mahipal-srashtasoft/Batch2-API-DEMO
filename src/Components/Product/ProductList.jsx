import React, { use, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ProductList() {
  const [products, setProducts] = React.useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    await axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong in fetching products");
      });
  };

  return (
    <>
      <h1>All Products</h1>

      <div className="d-flex flex-wrap gap-4 justify-content-between">
        {products.map((item) => {
          return (
            <div className="card" style={{ width: "18rem" }} key={item.id}>
              {/* <img src={item.images} className="card-img-top" alt="..." /> */}
              <div
                id={`carousel-${item.id}`}
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  {item.images.map((img, index) => (
                    <div
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                      key={index}
                    >
                      <img
                        className="d-block w-100"
                        src={img}
                        alt="Product"
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                    </div>
                  ))}
                </div>

                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target={`#carousel-${item.id}`}
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                </button>

                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target={`#carousel-${item.id}`}
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                </button>
              </div>

              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p>Price: ${item.price}</p>
                {/* <p className="card-text">{item.description}</p> */}
                <a href="#" className="btn btn-primary">
                  Details
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ProductList;
