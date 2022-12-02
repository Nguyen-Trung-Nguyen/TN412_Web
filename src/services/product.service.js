import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8089/api/product';

const getAllProduct = () => {
	return axios.get(API_URL + '/list');
};
const deleteById = (id) => {
	return axios.delete(API_URL + '/' + id, { headers: authHeader() });
};
const createProduct = (request, file) => {
	const json = JSON.stringify(request);
	const blob = new Blob([json], {
		type: 'application/json',
	});
	const formData = new FormData();
	formData.append('file', file);
	formData.append('request', blob);
	return axios.post('http://localhost:8089/api/product', formData, {
		headers: authHeader(),
	});
};

const updateById = (id, request, file) => {
	const json = JSON.stringify(request);
	const blob = new Blob([json], {
		type: 'application/json',
	});
	const formData = new FormData();
	formData.append('file', file);
	formData.append('request', blob);
	return axios.put('http://localhost:8089/api/product/' + id, formData, {
		headers: authHeader(),
	});
};

const findById = (id) => {
	return axios.get(API_URL + '/' + id, { headers: authHeader() });
};
const ProductService = {
	getAllProduct,
	deleteById,
	createProduct,
	findById,
	updateById,
};

export default ProductService;
