import PRODUCTS from "../../data/dummy";

const initialState = {
  avaliableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === "u1"),
};

export default (state = initialState, action) => {
  return state;
};
