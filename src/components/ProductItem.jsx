import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatNumber } from '../helpers/utils';
import CartService from '../services/cart.service';
import styles from './productstyles.module.css';
// Correct! There is no need to specify the key here:
const ProductItem = (props) => {
	const navigate = useNavigate();
	const createCart = () => {
		const request = {
			productId: props.product.id,
			quantity: 1,
		};
		CartService.createCart(request).then((res) => {
			if (res.data) {
				navigate('/cart');
			}
		});
	};
	return (
		<div className="card card-body">
			<img
				style={{ display: 'block', margin: '0 auto 10px', maxHeight: '200px' }}
				className="img-fluid"
				src={'http://localhost:8089/api/product/image/' + props.product.photo}
				alt=""
			/>
			<p>{props.product.name}</p>
			<h5 className="text-start">{formatNumber(props.product.price)}</h5>
			<div className="text-end">
				{/* https://codesandbox.io/s/react-router-product-detail-pages-dynamic-links-tmcjc?file=/src/Products.js */}

				{props.currentUser ? (
					<button type="button" onClick={createCart} className="btn btn-info btn-sm">
						Thêm vào giỏ
					</button>
				) : (
					<Link to="/login" className={styles.add_cart}>
						Xem chi tiết
					</Link>
				)}

				{/* { //JSX and conditional: https://www.codecademy.com/learn/fecp-react-part-i/modules/fecp-jsx/cheatsheet
                    isInCart(product) && 
                    <button 
                    onClick={() => increase(product)}
                    className="btn btn-outline-primary btn-sm">Add more</button>
                }

                {
                    !isInCart(product) && 
                    <button 
                    onClick={() => addProduct(product)}
                    className="btn btn-primary btn-sm">Add to cart</button>
                } */}
			</div>
		</div>
	);
};

export default ProductItem;
