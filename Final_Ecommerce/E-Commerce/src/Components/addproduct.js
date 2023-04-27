import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Swal = require("sweetalert2");

const Addproduct = () => {
  const navigate = useNavigate()
  
  const [ProductName, setProductName] = React.useState("");
  const [ProductDescription, setProductDescription] = React.useState("");
  const [ProductPrice, setProductPrice] = React.useState("");
  const [ProductQuintity, setProductQuintity] = React.useState("");
  const [ProductCategory, setProductCategory] = React.useState("");
  const [ProductImage, setProductImage] = React.useState({
    file: [],
  });
  const [files, setFiles] = React.useState([]);
  const handleimginput = (e) => {
    setProductImage({
      ...ProductImage,
      file: e.target.files,
      // filepreview: URL.createObjectURL(e.target.files[0]),
    });
    setFiles(e.target.files);
  };
  const handleSubmitClick = (e) => {
    e.preventDefault();

    // console.log(userData);
    const formData = new FormData();
    formData.append("ProductImage", files[0]);
    formData.append("ProductName", ProductName);
    formData.append("ProductDescription", ProductDescription);
    formData.append("ProductPrice", ProductPrice);
    formData.append("ProductCategory", ProductCategory);

    const AddUserUrl = `http://localhost:5000/add/product`;
    axios
      .post(AddUserUrl, formData, {
        headers: {
          Accept: "auth",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const login = response.data;
        if (login.success === true) {
          Swal.fire({
            icon: "success",
            title: "Product add successfully",
            showConfirmButton: true,
          });  
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "warning",
          title: err.response.data.message,
          showConfirmButton: true,
        });
      });
  };

  return (
    <>
      <div class="container">
        <div class="row">
          <div class="card col-6 p-3 mt-5 ms-auto me-auto">
            <h2 class="text-center text-success h2 mt-3 mb-3">Add Product</h2>
            <hr />
            <form
              id="contact-form"
              name="contact-form"
              onSubmit={handleSubmitClick}>
              <div class="row mt-2">
                <div class="col-md-6">
                  <div class="md-form mb-0">
                  <label for="name" class="">
                      Product Name
                    </label>
     
                    <input
                      type="text"
                      id="name"
                      name="productname"
                      class="form-control"
                      value={ProductName}
                      onChange={(e) => setProductName(e.target.value) }
      
                    />
                  </div>
                </div>
                <div className="col-md-6">
                <div class="md-form mb-0">
                <label for="name" class="">
                     Category Name
                    </label>
                <select className="form-control" value={ProductCategory}
                      onChange={(e) => setProductCategory(e.target.value)}>
                      <option>Product Category</option>
                      <option>abc</option>
                      <option>xyz</option>
                    </select>
                   
                  </div>
                    
                  </div>
                <div class="col-md-6">
                  <div class="md-form mb-0">
                  <label for="price" class="">
                      Product Price
                    </label>
                    <input
                      type="text"
                      id="price"
                      name="price"
                      class="form-control"
                      value={ProductPrice}
                      onChange={(e) => setProductPrice(e.target.value)}
      
                    />
                    
                  </div>
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-md-12">
                  <div class="md-form mb-0">
                    
                  <label for="producrtimage" class="">
                      Product Image
                    </label>
                    <input
                      type="file"
                      id="producrtimage"
                      name="producrtimage"
                      class="form-control"
                      onChange={handleimginput}
                    />
                  </div>
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-md-12">
                  <div class="md-form">
                  <label for="description">Description</label>
                    <textarea
                      type="text"
                      id="description"
                      name="description"
                      rows="2"
                      class="form-control md-textarea"
                      value={ProductDescription}
                      onChange={(e) => setProductDescription(e.target.value)}
      
                      ></textarea>
                    
                  </div>
                </div>
              </div>
              <div className="text-center text-md-left col-3 mt-4">
                <button
                type="submit"
                  className="btn btn-primary"
                  >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Addproduct;
