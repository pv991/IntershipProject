import React, { useEffect } from "react";
import { useProduct } from "../../Context/ProductContext";
import styles from "./styles.module.css";
import Spinner from "../../Components/Spinner";
import { useParams } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import { useFavorite } from "../../Context/FavoriteContext";
import Card from "../../Components/Card";

const Products = () => {
  const { addToCart, items, quantity, addQuantity, data, setQuantity } =
    useCart();

  const { addToFavorite, favoriteItems } = useFavorite();

  const { productList, loading, setProductID, setCategory } = useProduct();

  const { category_id } = useParams();

  useEffect(() => {
    setCategory(category_id);
  }, [category_id]);
  console.log(productList);
  return (
    <div className={styles.cardGroup}>
      {!loading ? (
        productList?.map((item, index) => {
          const findCartItem = items.find(
            (cart_item) => cart_item.Id === item.Id
          );
          const findFavoriteItem = favoriteItems.find(
            (favorite_item) => favorite_item.Id === item.Id
          );
          const findQuantity = data?.find(
            (favorite_item) => favorite_item.Id === item.Id
          );

          return (
            <Card
              key={`product-${index}`}
              item={item}
              setProductID={setProductID}
              findCartItem={findCartItem}
              findFavoriteItem={findFavoriteItem}
              addToCart={addToCart}
              addToFavorite={addToFavorite}
              addQuantity={addQuantity}
              findQuantity={findQuantity}
              quantity={quantity}
              setQuantity={setQuantity}
            />
          );
        })
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Products;
