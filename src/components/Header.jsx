import { useEffect } from "react";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import axios from "axios";
import { Link } from "react-router-dom";
import Products from "../pages/Products";

export default function Header() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  return (
    <header>
      <div className="header-top">
        <div className="container">
          <div className="d-flex justify-content-between">
            <div>
              <a className="brand" href="/">
                My Blog
              </a>
            </div>
            <div>
              <div className="search-btn">
                <IoSearchOutline />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header-bottom">
        <div className="container">
          <nav>
            <ul>
              <li className="my-3">
                <Link to={`/`}>Нүүр</Link>
              </li>
              <li className="my-3">
                <Link to={`/products`}>Бараа</Link>
              </li>
              {/* {categories.map((item) => (
                <li key={item.id}>
                  <a href="/">{item.name}</a>
                </li>
              ))} */}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
