import { useEffect, useState } from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000").then((res) => {
      setArticles(res.data);
    });
  }, []);

  return (
    <main>
      <div className="container">
        <div className="row gy-4">
          {articles.map((article) => (
            <div className="col-md-3 col-sm-6 col-12" key={article.id}>
              <Link to={`articles/${article.id}`}>
                <Card title={article.name} image={article.imageUrl} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
