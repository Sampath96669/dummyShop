import React, { useEffect } from "react";

import ProductList from "../../components/ProductList/ProductList";
import SingleCategory from "../../components/SingleCategory/SingleCategory";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../store/productSlice";
import {
  fetchCategories,
  fetchProductsByCategory,
} from "../../store/categorySlice";
import "./HomePage.scss";

const HomePage = () => {
  const dispatch = useDispatch();
  const { data: categories } = useSelector((state) => state.category);
  const { data: products, status: productStatus } = useSelector(
    (state) => state.product
  );
  const { catProductAll: productsByCategory, catProductAllStatus } =
    useSelector((state) => state.category);
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    dispatch(fetchProductsByCategory(1, "all"));
    dispatch(fetchProductsByCategory(2, "all"));
  }, []);

  return (
    <div className="home-page">
      <ProductList products={products} status={productStatus} />
      <section>
        {productsByCategory[0] && (
          <SingleCategory products={productsByCategory[0]} />
        )}
      </section>
      <section>
        {productsByCategory[1] && (
          <SingleCategory products={productsByCategory[1]} />
        )}
      </section>
    </div>
  );
};

export default HomePage;
