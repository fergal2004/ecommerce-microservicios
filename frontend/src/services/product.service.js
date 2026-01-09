import api from '../api/axiosConfig';

const PRODUCT_URI = '/product/api/v1/products';

export const ProductService = {
  getAll: (available) => api.get(PRODUCT_URI, { params: { available } }),
  getById: (id) => api.get(`${PRODUCT_URI}/${id}`),
};
