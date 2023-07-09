import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    data: [],

    catProductAll: [],

    catProductSingle: [],
  },

  reducers: {
    setCategories(state, action) {
      state.data = action.payload;
    },

    setCategoriesProductAll(state, action) {
      state.catProductAll.push(action.payload);
    },
    setCategoriesStatusAll(state, action) {
      state.catProductAllStatus = action.payload;
    },
    setCategoriesProductSingle(state, action) {
      state.catProductSingle = action.payload;
    },
  },
});

export const {
  setCategories,
  setStatus,
  setCategoriesProductAll,
  setCategoriesStatusAll,
  setCategoriesProductSingle,
  setCategoriesStatusSingle,
} = categorySlice.actions;
export default categorySlice.reducer;

export const fetchCategories = () => {
  return async function fetchCategoryThunk(dispatch) {
    try {
      const response = await fetch(`${BASE_URL}categories`);
      const data = await response.json();
      dispatch(setCategories(data.slice(0, 5)));
    } catch (error) {}
  };
};

export const fetchProductsByCategory = (categoryID, dataType) => {
  return async function fetchCategoryProductThunk(dispatch) {
    try {
      const response = await fetch(
        `${BASE_URL}categories/${categoryID}/products`
      );
      const data = await response.json();
      if (dataType === "all") {
        dispatch(setCategoriesProductAll(data.slice(0, 10)));
      }
      if (dataType === "single") {
        dispatch(setCategoriesProductSingle(data.slice(0, 20)));
      }
    } catch (error) {}
  };
};
