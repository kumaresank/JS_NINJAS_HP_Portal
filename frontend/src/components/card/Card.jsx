import React from 'react';
import "./Card.css"
import Button from '../button/Button';


function Card({title, content, btnLabel}) {
    console.log("card: btnLable", btnLabel)
  return <div className="card-container">
    <h3 className="card-title">{title}</h3>
    <div className="card-content">{content}</div>
    <div className="card-buttons">
        <Button label={btnLabel}/>
    </div>
  </div>;
}

export default Card;
