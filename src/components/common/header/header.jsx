import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EventBus from '../../../common/EventBus';
import AuthService from '../../../services/auth.service';
import './header.css';
const Header = () => {
	const [showModeratorBoard, setShowModeratorBoard] = useState(false);
	const [showAdminBoard, setShowAdminBoard] = useState(false);
	const [currentUser, setCurrentUser] = useState(undefined);

	useEffect(() => {
		const user = AuthService.getCurrentUser();

		if (user) {
			setCurrentUser(user);
			setShowModeratorBoard(user.roles.includes('ROLE_MODERATOR'));
			setShowAdminBoard(user.roles.includes('ROLE_ADMIN'));
		}

		EventBus.on('logout', () => {
			logOut();
		});

		return () => {
			EventBus.remove('logout');
		};
	}, []);

	const logOut = () => {
		AuthService.logout();
		setShowModeratorBoard(false);
		setShowAdminBoard(false);
		setCurrentUser(undefined);
	};
	return (
		<header className="header-wrapper bg-dark">
			<Link to={'/cart'} className="navbar-brand">
				<div className="shopping-cart">
					<i className="icon-cart fas fa-shopping-cart"></i>
				</div>
			</Link>

			<nav className="navbar navbar-expand-sm navbar-dark">
				<div className="container-fluid">
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#mynavbar"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="mynavbar">
						<ul className="navbar-nav me-auto">
							<li className="nav-item">
								<Link to={'/products'} className="nav-link">
									Product list
								</Link>
							</li>

							{showModeratorBoard && (
								<li className="nav-item">
									<Link to={'/mod'} className="nav-link">
										Moderator board
									</Link>
								</li>
							)}

							{showAdminBoard && (
								<li className="nav-item">
									<Link to={'/admin'} className="nav-link">
										Admin board
									</Link>
								</li>
							)}
						</ul>

						{currentUser ? (
							<div className="navbar-nav ml-auto d-flex">
								<li className="nav-item">
									<Link to={'/profile'} className="nav-link">
										{currentUser.username.charAt(0).toUpperCase() + currentUser.username.slice(1)}
									</Link>
								</li>
								<li className="nav-item">
									<a href="/products" onClick={logOut} className="nav-link">
										Logout
									</a>
								</li>
							</div>
						) : (
							<div className="navbar-nav ml-auto  d-flex">
								<li className="nav-item">
									<Link to={'/login'} className="nav-link">
										Login
									</Link>
								</li>

								<li className="nav-item">
									<Link to={'/register'} className="nav-link">
										Sign up
									</Link>
								</li>
							</div>
						)}
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Header;
