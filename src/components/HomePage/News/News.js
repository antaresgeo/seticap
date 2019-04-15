import React from "react";
import classes from './News.css';

const news = props => {
  
  return (
    <div className={["panel", "panel-danger", classes.News].join(" ")}>
      <div className="panel-heading">
        <h3 className="panel-title">Noticias</h3>
      </div>

      <div className={["list-group", classes.Body].join(' ')}>
        {props.news.map(elem => (
          <div key={elem.id} className="list-group-item">
            <h4 className="list-group-item-heading">{elem.headline}</h4>
            <p className="list-group-item-text">
              {elem.body.slice(0, 100)}...
            </p>
            <a className={classes.more}>Leer mas...</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default news;
