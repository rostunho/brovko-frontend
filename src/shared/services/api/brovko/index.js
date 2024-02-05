export {
  getAllCategories,
  addNewCategory,
  getCategoryById,
} from './categories';
export { default as instance } from './instance';
export { addOrder, getAllOrdersAuth } from './orders';
export {
  getAllProducts,
  getProductsByCategory,
  getProductById,
  removeProduct,
  // deleteProductById,
  addNewProduct,
} from './products';
export {
  getReviews,
  approveReview,
  rejectReview,
  getReviewsByStatus,
  getReviewsByProductId,
} from './reviews';
export { register, login, current, logout } from './user';
