import React, { useState } from "react";
import { STATUS } from "../../utils/status";
import "./ProductList.scss";
import { setModalData, setIsModalVisible } from "../../store/modalSlice";
import SingleProduct from "../SingleProduct/SingleProduct";
import { useSelector, useDispatch } from "react-redux";
import { formatPrice } from "../../utils/helpers";

const ProductList = ({ products, status }) => {
  const [searchString, setSearchString] = useState("");
  const dispatch = useDispatch();
  const { isModalVisible } = useSelector((state) => state.modal);
  const productss = useSelector((state) => state.product.data);

  const viewModalHandler = (data) => {
    dispatch(setModalData(data));
    dispatch(setIsModalVisible(true));
  };

  const handleSearchChange = (event) => {
    setSearchString(event.target.value);
  };
  const filteredProducts = searchString
    ? productss.filter((product) =>
        product.title.toLowerCase().includes(searchString.toLowerCase())
      )
    : productss;
  // if (status === STATUS.ERROR) return <Error />;

  return (
    <section className="product py-5 bg-ghost-white" id="products">
      {isModalVisible && <SingleProduct />}
      <form className="navbar-search flex">
        <input
          type="text"
          value={searchString}
          onChange={handleSearchChange}
          placeholder="Search products"
          style={{ width: "50%", marginLeft: "20% " }}
        />
        <button type="submit" className="navbar-search  btn-primary" style={{}}>
          <i className="fas fa-search"></i>
        </button>
      </form>
      <div className="container">
        <div className="product-content">
          <div className="section-title">
            <h3 className="text-uppercase fw-7 text-regal-blue ls-1">
              All Products
            </h3>
          </div>
          <div className="product-items grid">
            {filteredProducts.map((product) => (
              <div
                className="product-item bg-white"
                key={product.id}
                onClick={() => viewModalHandler(product)}
              >
                <div className="product-item-img">
                  <img src={product.images[0]} alt="" />
                </div>
                <div className="product-item-body">
                  <h6 className="product-item-title text-pine-green fw-4 fs-15">
                    {product.title}
                  </h6>
                  <div className="product-item-price text-regal-blue fw-7 fs-18">
                    {formatPrice(product.price)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
