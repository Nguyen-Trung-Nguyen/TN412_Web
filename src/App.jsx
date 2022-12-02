import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { Fragment, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';

import BoardAdmin from './components/admin/BoardAdmin';
import Cart from './components/cart/cart';
import Footer from './components/common/footer/footer';
import Header from './components/common/header/header';
import AddProduct from './components/crud-product/add-product/add-product';
import EditProduct from './components/crud-product/eidt-product/edit-product';
import ListProduct from './components/crud-product/list-product/list-product';
import FilterableProductGrid from './components/FilterableProductGrid';
import Home from './components/Home';
import Login from './components/Login';
import BoardModerator from './components/mod/BoardModerator';
import Profile from './components/Profile';
import Register from './components/Register';
import AuthService from './services/auth.service';
const App = () => {
	const [currentUser, setCurrentUser] = useState(undefined);
	useEffect(() => {
		const user = AuthService.getCurrentUser();

		if (user) {
			setCurrentUser(user);
		}
	}, []);

	return (
		<Fragment>
			<Header />
			<div className="container mt-3 my-root">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/products" element={<FilterableProductGrid currentUser={currentUser} />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/cart" element={<Cart />} />
					{/* <Route path="/user" element={<BoardUser/>} /> */}
					<Route path="/mod" element={<BoardModerator />} />

					<Route path="/admin" element={<BoardAdmin />} />
					<Route path="/admin/add" element={<AddProduct />} />
					<Route path="/admin/list" element={<ListProduct />} />
					<Route path="/admin/edit/:id" element={<EditProduct />} />
				</Routes>
			</div>
			<Footer />
		</Fragment>
	);
};

export default App;
