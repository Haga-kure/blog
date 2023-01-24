import { useEffect, useState } from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get("https://demo-api-one.vercel.app/api/articles").then((res) => {
      setArticles(res.data.body);
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
