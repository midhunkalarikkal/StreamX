import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import "./featured.scss";

export default function Featured({ type, setGenre }) {
  const [content, setContent] = useState({});

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(`/movies/random?type=${type}`, {
          headers: {
            token:
              "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setContent(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [type]);

  console.log(content);
  return (
    <div className="featured">
      {type && (
        <div className="category">
          
        </div>
      )}
      <img src={content.img} alt="" />
      <div className="info">
      <h1 className="movietitle">{content.title}</h1>
        <span className="desc">{content.desc}</span>
        <div className="buttons">
        <a href={content.video} className="play" autoPlay={true} loop >
          <button className="play"pathname="/watch">
            <PlayArrow />
            <span>Play</span>
          </button>
          </a>
        </div>
      </div>
    </div>
  );
}
