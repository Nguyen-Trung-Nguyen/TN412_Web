import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EventBus from '../../common/EventBus';
import UserService from '../../services/user.service';

const BoardAdmin = () => {
	const [content, setContent] = useState('');

	useEffect(() => {
		UserService.getAdminBoard().then(
			(response) => {
				setContent(response.data);
			},
			(error) => {
				const _content =
					(error.response && error.response.data && error.response.data.message) ||
					error.message ||
					error.toString();

				setContent(_content);

				if (error.response && error.response.status === 401) {
					EventBus.dispatch('logout');
				}
			}
		);
	}, []);

	return (
		<main className="container mt-4 p-5 bg-primary text-white rounded ">
			<h3>{content}</h3>
			<button type="button" className="btn btn-info ">
				<Link to={'/admin/add'} className="nav-link">
					Add Product
				</Link>
			</button>
			<button type="button" className="btn btn-warning">
				<Link to={'/admin/list'} className="nav-link">
					List Product
				</Link>
			</button>
		</main>
	);
};

export default BoardAdmin;
