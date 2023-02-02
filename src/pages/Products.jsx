import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import currencyFormatter from "../utils/currencyFormatter";

import relateTime from "dayjs/plugin/relativeTime";
import { Link, useLocation, useNavigate } from "react-router-dom";
dayjs.extend(relateTime);

export default function Products() {
  const [isReady, setIsReady] = useState(false);

  const [page, setPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [searchQuery, setSearchQuery] = useState(" ");

  const [locationQuery, setLocationQuery] = useState(" ");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const newQuery = new URLSearchParams();
    newQuery.set("pageSize", pageSize);
    newQuery.set("page", currentPage);
    if (searchQuery !== " ") {
      newQuery.set("q", searchQuery);
    }
    setLocationQuery(newQuery.toString());
  }, [pageSize, currentPage, searchQuery]);

  useEffect(() => {
    navigate(`/products?${locationQuery}`);
  }, [locationQuery]);

  useEffect(() => {
    if (isReady) {
      getResult();
    }
  }, [isReady]);

  const getResult = () => {
    const urlParams = new URLSearchParams();
    urlParams.set("pageSize", pageSize);
    urlParams.set("page", currentPage);
    if (searchQuery !== " ") {
      urlParams.set("q", searchQuery);
    }
    axios
      .get(`http://localhost:8000/products?${urlParams.toString()}`)
      .then((res) => {
        setPage(res.data);
      });
  };

  if (!page) {
    return (
      <div className="spinner-grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  const getPagination = () => {
    let result = [];

    result.push(
      <li className={`page-item ${1 === page.page && "active"}`}>
        <a className="page-link" href="#">
          1
        </a>
      </li>
    );

    if (page.page - 3 > 0) {
      result.push(
        <li className={`page-item`}>
          <span className="page-link">...</span>
        </li>
      );
    }

    if (page.page !== 1 && page.page !== page.totalPages) {
      result.push(
        <li className={`page-item active}`}>
          <a className="page-link" href="#">
            {page.page}
          </a>
        </li>
      );
    }

    if (page.page - 3 >= page.page) {
      result.push(
        <li className={`page-item}`}>
          <span className="page-link">...</span>
        </li>
      );
    }

    result.push(
      <li className={`page-item ${page.totalPages === page.page && "active"}`}>
        <a className="page-link" href="#">
          {page.totalPages}
        </a>
      </li>
    );
    return result;
  };

  return (
    <main>
      <div className="container">
        <div className="d-flex justify-content-end mb-4">
          <label className="me-4">
            Search by Name
            <input
              type="text"
              className="from-control"
              placeholder="Name"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </label>
          <label>
            Pages
            <select
              className="from-control"
              onChange={(e) => {
                setCurrentPage(1);
                setPageSize(e.target.value);
              }}
              value={pageSize}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </label>
        </div>
        <div className="row gy-4">
          {page?.items?.map((product) => {
            return (
              <div className="col-sm-3" key={product.id}>
                <div className="product-card">
                  <div className="product-card-img">
                    <img src={product.imageUrl} alt={product.name} />
                  </div>
                  <div className="product-card-desc">
                    <div className="product-card-date">
                      {dayjs(Number(product.createdAt) * 1000).fromNow()}
                    </div>
                    <div className="product-card-name">{product.name}</div>
                    <div className="product-card-price">
                      {currencyFormatter(product.price)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <nav aria-label="..." className="my-4">
            <ul className="pagination pagination-lg justify-content-center">
              <li className={`page-item ${page.page === 1 && "disabled"}`}>
                <Link
                  to={`/products?pageSize=${pageSize}&page=${currentPage - 1}`}
                  className="page-link"
                ></Link>
              </li>
              {getPagination()}
              <li
                className={`page-item ${
                  page.page === page.totalPages && "disabled"
                }`}
              >
                <Link
                  to={`/products?pageSize=${pageSize}&page=${currentPage + 1}`}
                  className="page-link"
                ></Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </main>
  );
}
