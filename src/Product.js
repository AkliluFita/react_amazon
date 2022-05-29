import React, { useContext } from "react";
import "./product.css";
import { Context } from "./context/StateProvider";

export default function Product({ product }) {
  const { id, title, image, price, rating } = product;

  const [state, dispatch] = useContext(Context);

  console.log("the added basket to ", state.basket);

  const handleAddToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  return (
    <div className="product">
      <img className="product__img" src={image} alt="" />
      <div className="product__info">
        <p className="product__title">{title}</p>
        <p className="product__price">
          <small>$</small>
          <big>{price}</big>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p className="starts">🌟</p>
            ))}
        </div>
        <button onClick={handleAddToBasket}>add cart</button>
      </div>
    </div>
  );
}
