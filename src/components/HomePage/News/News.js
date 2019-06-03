import React from "react";
import classes from './News.css';
import republicaImage from '../../../assets/img/la-republica.png';

const news = props => {
  return (
    <div className={["panel", classes.News].join(" ")}>
      <div className={["panel-heading", classes.Republica].join(' ')}>
        <h3 className="panel-title">Noticias</h3>
        <img src={republicaImage} alt="La republica" className={classes.ImageRepublica}></img>
      </div>

      <div className={["list-group", classes.Body].join(' ')}>
        {props.news.map((elem, index) => (
          <div key={elem.pubDate + index} className="list-group-item">
            <h4 className="list-group-item-heading">{elem.headline}</h4>
            <p className="list-group-item-text">
              {elem.body ? elem.body.slice(0, 200) : elem.headline}...
            </p>
            <a href={elem.link} className={classes.more}>Leer mas...</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default news;
