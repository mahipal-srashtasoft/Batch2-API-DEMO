import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
    let navigate = useNavigate()
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatarUrl: "",
  });
  const [errors, setErrors] = useState({});

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setFormData({ name: "", email: "", password: "", avatarUrl: "" });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

  };

  const validateForm = () => {
    const newErrors = {};
    if (isSignup && !formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (isSignup && !formData.avatarUrl)
      newErrors.avatarUrl = "Avatar URL is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
        
        if (isSignup) {
          const payload = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            avatar: formData.avatarUrl,
          };
        axios
          .post("https://api.escuelajs.co/api/v1/users/", payload)
          .then((response) => {
            console.log("User signed up:", response.data);
            toast.success("Signup successful!");
          })
          .catch((error) => {
            console.error("Error during signup:", error);
            toast.error(
              Array.isArray(error.response?.data?.message)
                ? "● " + error.response.data.message.join("\n ● ")
                : error.response?.data?.message ||
                    "Signup failed. Please try again."
            );
          });
      } else {
        let paylod={
            email:formData.email,
            password:formData.password
        }
        axios.post("https://api.escuelajs.co/api/v1/auth/login",paylod).then((response)=>{
            localStorage.setItem("token",JSON.stringify(response.data));
            toast.success("Login successful!");
            navigate("/");
        }).catch((error)=>{
            console.error("Error during login:", error);
            toast.error(
                Array.isArray(error.response?.data?.message)
                  ? "● " + error.response.data.message.join("\n ● ")
                  : error.response?.data?.message ||
                      "Login failed. Please try again."
              );
        })  ;

      }
    } else {
      toast.error("Please fill in all required fields.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="text-center mb-4">
                {isSignup ? "Signup" : "Login"}
              </h3>
              <form onSubmit={handleSubmit}>
                {isSignup && (
                  <>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.name ? "is-invalid" : ""
                        }`}
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      {errors.name && (
                        <div className="invalid-feedback">{errors.name}</div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="avatarUrl" className="form-label">
                        Avatar URL
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.avatarUrl ? "is-invalid" : ""
                        }`}
                        id="avatarUrl"
                        name="avatarUrl"
                        value={formData.avatarUrl}
                        onChange={handleChange}
                      />
                      {errors.avatarUrl && (
                        <div className="invalid-feedback">
                          {errors.avatarUrl}
                        </div>
                      )}
                    </div>
                  </>
                )}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  {isSignup ? "Signup" : "Login"}
                </button>
              </form>
              <div className="text-center mt-3">
                <button
                  className="btn btn-link"
                  onClick={toggleForm}
                  style={{ textDecoration: "none" }}
                >
                  {isSignup
                    ? "Already have an account? Login"
                    : "Don't have an account? Signup"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
