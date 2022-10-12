import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import cartSlice from "../data/cartSlice";
// import productList from "../data/productList.json"; // this is for when we don't have fetch data
import { fetchAllProducts } from "../data/productSlice";
import "../styles/home.scss";

const Home = () => {
  const state = useSelector((state) => state.cart);
  const { cart, products } = state;

  const { addToCart, removeFromCart } = cartSlice.actions;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts("http://localhost:3000/products"));
  }, [dispatch]);

  return (
    <div className="container product-catalogue">
      <div className="row">
        {/* {productList.products.map((product) => { */}
        {products.data.map((product) => {
          return (
            <div className="wrapper col-md-4" key={product.id}>
              <div className="card">
                <img
                  className="card-img-top center-block"
                  src={product.imageUrl}
                  alt="Card cap"
                />

                <div className="card-body text-center">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">${product.price}</p>

                  {!cart.cartProductIds.includes(product.id) && (
                    <button
                      className="btn btn-primary"
                      onClick={() => dispatch(addToCart(product.id))}
                    >
                      Add to cart
                    </button>
                  )}
                  {cart.cartProductIds.includes(product.id) && (
                    <button
                      className="btn btn-primary"
                      onClick={() => dispatch(removeFromCart(product.id))}
                    >
                      Remove from cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
