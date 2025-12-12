import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AddCatagory() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "https://api.escuelajs.co/api/v1/categories/"
      );
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Submit Category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://api.escuelajs.co/api/v1/categories/", {
        name,
        image,
      });
      setName("");
      setImage("");
      setShowModal(false);
      //   fetchCategories();
    } catch (error) {
      console.error("Error adding category", error.response?.data?.message);
      const message = error.response?.data?.message;

      toast.error(
        Array.isArray(message)
          ? message.join(" | ")
          : message || "Failed to add category"
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
          .delete(`https://api.escuelajs.co/api/v1/categories/${id}`)
          .then(() => {
            fetchCategories();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Error deleting category", error);
            toast.error("Failed to delete category");
          });
      }
    });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Categories</h3>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Add Category
        </button>
      </div>

      {/* Categories List */}
      <div className="row">
        {categories.map((cat) => (
          <div
            className="col-md-4 mb-3 position-relative"
            style={{ zIndex: 0 }}
            key={cat.id}
          >
            <div
              className="position-absolute bg-denger"
              style={{ zIndex: 11110, top: "5px", right: "15px" }}
            >
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(cat.id)}
              >
                <i class="fa-solid fa-trash-can"></i>
              </button>
              <button className="btn btn-sm btn-primary ms-2">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
            </div>
            <div className="card shadow-sm h-100">
              <img
                src={cat.image}
                alt={cat.name}
                className="card-img-top"
                onError={(e) => {
                  e.target.onerror = null; // prevent infinite loop
                  e.target.src =
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png";
                }}
              />
              <div className="card-body">
                <h5 className="card-title">{cat.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Category Modal */}
      {showModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Category</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Category Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
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
                      Save
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

export default AddCatagory;
