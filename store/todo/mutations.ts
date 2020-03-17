import { deleteProducts } from "@/assets/request"

const mutations = {
  setProducts(state, newProducts) {
    state.products = newProducts
  },

  deleteProduct(state, payload) {
    return new Promise ((resolve, reject) => {
      deleteProducts().then((msg) => {
        resolve(msg.message)
      })
      .catch((err) => {
        reject(err.error)
      })
    })
  }
};

export default mutations;
