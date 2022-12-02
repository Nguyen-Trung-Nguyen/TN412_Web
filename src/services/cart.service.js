import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8089/api/cart';

const getAllCart = () => {
	return axios.get(API_URL + '/list', {
		headers: authHeader(),
	});
};

const createCart = (request) => {
	return axios.post(API_URL, request, {
		headers: authHeader(),
	});
};
const deleteCart = (id) => {
	return axios.delete(API_URL + '/' + id, {
		headers: authHeader(),
	});
};

const CartService = {
	getAllCart,
	createCart,
	deleteCart,
};

export default CartService;
