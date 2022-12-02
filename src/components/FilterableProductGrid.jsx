import React, { useEffect, useState } from 'react';

import ProductService from '../services/product.service';
import ProductGrid from './ProductGrid';
import styles from './productstyles.module.css';
import Search from './Search';

const FilterableProduct = (props) => {
	const [products, setProducts] = useState([]);
	const [filterName, setFilterName] = useState('');

	useEffect(() => {
		ProductService.getAllProduct().then(
			(response) => {
				setProducts(response.data);
			},
			(error) => {
				const _products = [
					(error.response && error.response.data) || error.message || error.toString(),
				];

				setProducts(_products);
			}
		);
	}, []);

	const handleChangeFilterProductsByName = (productName) => {
		setFilterName(productName);
	};

	return (
		<main className={styles.main_block}>
			<Search filterText={filterName} onFilterTextChange={handleChangeFilterProductsByName} />
			<ProductGrid products={products} filterText={filterName} currentUser={props.currentUser} />
		</main>
	);
};

export default FilterableProduct;
