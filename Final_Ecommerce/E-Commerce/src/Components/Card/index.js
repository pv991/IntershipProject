import styles from "./styles.module.css";
import {
  StarIcon,
  ShoppingCartIcon,
  HeartIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import { Link } from "react-router-dom";

const Card = ({
  item,
  addToFavorite,
  findFavoriteItem,
  addToCart,
  findCartItem,
  quantity,
  addQuantity,
  findQuantity,
  setQuantity,
}) => {
  return (
    <div
      key={`${item.Id}-item`}
      className={styles.card}
      title={item.ProductName}
    >
      <div className={styles.cardLink}>
       {localStorage.getItem('id')?(<button
          className={
            !findFavoriteItem ? styles.favButton : styles.removeFavButton
          }
          onClick={() => {
            addToFavorite(item, findFavoriteItem);
          }}
        >
          <HeartIcon className={styles.heartIcon} />
        </button>):('')} 
        <Link to={`/product/${item.Id}`}>
          <div className={styles.cardHeader}>
            <img
              className={styles.cardImg}
              src={`http://localhost:5000/${item.ProductImage}`}
              alt=""
            />
          </div>
        </Link>
        <div className={styles.cardBody}>
          <div>
            <p className={styles.cardTitle} title={item.ProductName}>
              <span className={styles.brand} title="Brand">
                Brand,
              </span>{" "}
              {item.ProductName}
            </p>
          </div>
          <div>
            <div className="my-auto" title={`$${item.ProductPrice}`}>
              <span className={styles.priceSub}>&#8377;</span>
              <span className={styles.priceTop}>
                {Math.trunc(item.ProductPrice)}
              </span>

              {parseInt((item.ProductPrice % 1).toFixed(2).substring(2)) !==
              0 ? (
                <span className={styles.priceSub}>
                  {parseInt((item.ProductPrice % 1).toFixed(2).substring(2))}
                </span>
              ) : (
                ""
              )}

              {/* <span className={styles.favButton}>
                <PlusIcon
                  className={styles.heartIcon}
                  onClick={() => addQuantity(item, "ADD", quantity)}
                />
              </span>
              {findQuantity ? (
                <span className={styles.favButton}>{quantity}</span>
              ) : (
                <span className={styles.favButton}>1</span>
              )}
              <span className={styles.favButton}>
                <MinusIcon
                  className={styles.heartIcon}
                  onClick={() => addQuantity(item, "REMOVE", quantity)}
                />
              </span> */}

              {/* {findQuantity ? (
                <input
                  placeholder="Enter quantity"
                  type="number"
                  min="0"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              ) : (
                <input
                  placeholder="Enter quantity"
                  type="number"
                  min="0"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              )} */}
            </div>
          </div>
          {localStorage.getItem('id')?( <div className={styles.addToCart}>
             <button
              className={
                !findCartItem ? styles.addToCartButton : styles.removeButton
              }
              onClick={() => addToCart(item, findCartItem, quantity)}
            >
              <ShoppingCartIcon
                className={styles.shoppingCartIcon}
                aria-hidden="true"
              />
              <div className="flex flex-col self-center">
                <span className={styles.buttonText}>
                  {findCartItem ? "Remove from cart" : "Add to Cart"}
                </span>
              </div>
            </button>
          </div> ):('')}
        </div>
      </div>
    </div>
  );
};

export default Card;
