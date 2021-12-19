// export const getProducts = state => state.products;

export const getAllProducts = (state) => {
    // console.log("aaa", state);
    return state.entities.products.allIds
    .map(id => state.entities.products.byId[id]);
}