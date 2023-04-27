import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCartIcon, HeartIcon, StarIcon } from "@heroicons/react/solid";
import Spinner from "../../Components/Spinner";
import { useProduct } from "../../Context/ProductContext";
import { useCart } from "../../Context/CartContext";
import { useFavorite } from "../../Context/FavoriteContext";
import styles from "./styles.module.css";

const ProductDetail = () => {
  const { product_id } = useParams();
  const { addToCart, items } = useCart();
  const { addToFavorite, favoriteItems } = useFavorite();
  const { productList, loading, setProductID } = useProduct();
  const findCartItem = items.find(
    (item) => item.Id.toString() === product_id.toString()
  );
  const findFavoriteItem = favoriteItems.find(
    (item) => item.Id.toString() === product_id.toString()
  );

  const product = productList.find(
    (x) => x.Id.toString() == product_id.toString()
  );
  console.log("product_id", product);
  // setProductID(product_id);
  useEffect(() => {}, []);

  return (
    <>
      {product ? (
        <div className="card col-4 ms-auto mr-auto mt-2 mb-2">
          <h1 className="text-success text-center m-4"> Product Details</h1>
          <hr/>
          <img
            alt="ecommerce"
            className="productimage ms-5 me-5"
            src={`http://localhost:5000/${product.ProductImage}`}
          />
          <div className="ps-5 pe-5 mt-3 ms-auto mr-auto">
            {/* <h2 className={styles.brand}>BRAND</h2> */}

            <p className="text-muted mb-2">
              Product Name:
              <span className="fw-bold text-body">
                &emsp;{product.ProductName}
              </span>
            </p>
            <p className="text-muted mb-2">
              Product Category:
              <span className="fw-bold text-body">
                &emsp;{product.ProductCategory}
              </span>
            </p>
            <p className="text-muted mb-2">
              Product Description: <br />
              <span className="fw-bold text-body">
                {product.ProductDescription}
              </span>
            </p>
            <p className="text-muted mb-2">
              Product Price:
              <span className="fw-bold text-body">
                &emsp; &#8377; {product.ProductPrice}
              </span>
            </p>
            <hr />
            <div className="row">
              <div className="col-10">
                {" "}
                {localStorage.getItem("id") ?(

                  <div className={styles.addToCart}>
                    <button
                      className={
                        !findCartItem
                          ? styles.addToCartButton
                          : styles.removeButton
                      }
                      onClick={() => addToCart(product, findCartItem)}>
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
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="col-2 mb-3">
                {localStorage.getItem("id") ? (
                  <button
                    className={
                      !findFavoriteItem
                        ? styles.favButton
                        : styles.removeFavButton
                    }
                    onClick={() => {
                      addToFavorite(product, findFavoriteItem);
                    }}>
                    <HeartIcon className={styles.heartIcon} />
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default ProductDetail;
