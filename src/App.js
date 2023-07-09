import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// pages
import { Home, Category, Cart } from "./pages/index";
// components
import Navbar from "./components/Navbar/Navbar";
import { Provider } from "react-redux";
import store from "./store/store";
import Search from "./components/Search";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:id" element={<Category />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
