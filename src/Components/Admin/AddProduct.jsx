import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AddProduct() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isOldProductId, setIsOldProductId] = useState(null);

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [image, setImage] = useState("");

    const [showModal, setShowModal] = useState(false);

    // Fetch products
    const fetchProducts = async () => {
        try {
            const res = await axios.get("https://api.escuelajs.co/api/v1/products/");
            setProducts(res.data);
        } catch (error) {
            console.error("Error fetching products", error);
        }
    };

    // Fetch categories for dropdown
    const fetchCategories = async () => {
        try {
            const res = await axios.get("https://api.escuelajs.co/api/v1/categories/");
            setCategories(res.data);
        } catch (error) {
            console.error("Error fetching categories", error);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    // Submit Product
    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title,
            price: Number(price),
            description,
            categoryId: Number(categoryId),
            images: [image]
        };

        try {
            if (isOldProductId) {
                await axios.put(`https://api.escuelajs.co/api/v1/products/${isOldProductId}`, payload);
            }else{
               await axios.post("https://api.escuelajs.co/api/v1/products/", payload);
            }

            toast.success("Product Added Successfully!");

            setTitle("");
            setPrice("");
            setDescription("");
            setCategoryId("");
            setImage("");

            setShowModal(false);
            fetchProducts();

        } catch (error) {
            console.error("Error adding product", error.response?.data?.message);
            const message = error.response?.data?.message;

            toast.error(
                Array.isArray(message)
                    ? message.join(" | ")
                    : message || "Failed to add product"
            );
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`https://api.escuelajs.co/api/v1/products/${id}`)
                    .then(() => {
                        fetchProducts();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Product has been deleted.",
                            icon: "success",
                        });
                    })
                    .catch((error) => {
                        console.error("Error deleting product", error);
                        toast.error("Failed to delete product");
                    });
            }
        });
    };

    const clearModel = () => {
        setIsOldProductId(null);
        setTitle("");
        setPrice("");
        setDescription("");
        setCategoryId("");
        setImage("");
        setShowModal(true);
    }
    
    const handleEdit = (product) => {
        setIsOldProductId(product.id);
        setTitle(product.title);
        setPrice(product.price);
        setDescription(product.description);
        setCategoryId(product.category?.id || "");
        setImage(product.images?.[0] || "");
        setShowModal(true);
    }




    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Products</h3>
                <button className="btn btn-primary" onClick={() => clearModel()}>
                    + Add Product
                </button>
            </div>

            {/* Product Table */}
            <div className="table-responsive mt-4">
                <table className="table table-bordered table-striped align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th style={{ width: "140px" }}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product.id}>
                                <td>{index + 1}</td>

                                <td>
                                    <img
                                        src={product.images?.[0]}
                                        alt={product.title}
                                        style={{
                                            width: "60px",
                                            height: "60px",
                                            objectFit: "cover",
                                        }}
                                        onError={(e) => {
                                            e.target.src =
                                                "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png";
                                        }}
                                    />
                                </td>

                                <td>{product.title}</td>
                                <td>{product.category?.name}</td>
                                <td>${product.price}</td>

                                <td style={{ maxWidth: "250px" }}>
                                    <div className="text-truncate" style={{ maxWidth: "240px" }}>
                                        {product.description}
                                    </div>
                                </td>

                                <td>
                                    <button className="btn btn-sm btn-primary me-2" onClick={()=>handleEdit(product)}>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>

                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        <i className="fa-solid fa-trash-can"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Product Modal */}
            {showModal && (
                <div className="modal d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title">{isOldProductId ? "Update Product" :"Add New Product"}</h5>
                                <button className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>

                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>

                                    <div className="mb-3">
                                        <label className="form-label">Product Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Price</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Description</label>
                                        <textarea
                                            className="form-control"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            required
                                        ></textarea>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Category</label>
                                        <select
                                            className="form-select"
                                            value={categoryId}
                                            onChange={(e) => setCategoryId(e.target.value)}
                                            required
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map((cat) => (
                                                <option value={cat.id} key={cat.id}>
                                                    {cat.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Image URL</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={image}
                                            onChange={(e) => setImage(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="text-end">
                                        <button type="submit" className="btn btn-success">
                                            {isOldProductId ? "Update Product" : "Save Product"}
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-secondary ms-2"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default AddProduct;
