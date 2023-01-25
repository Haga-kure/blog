import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Article() {
  const [article, setArticle] = useState({});
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    axios.get(`http://localhost:8000/articles/${id}`).then((res) => {
      setArticle(...res.data);
    });
    // fetch("http//:localhost:8000/articles/1")
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));
  }, []);

  return (
    <div className="container">
      <h1>{article.name}</h1>
      <img style={{ maxWidth: "100%" }} src={article.imageUrl} alt="" />
      <div>{article.text}</div>
    </div>
  );
}
