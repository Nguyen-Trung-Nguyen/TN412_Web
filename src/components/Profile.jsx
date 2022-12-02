import React from 'react';
import AuthService from '../services/auth.service';

const Profile = (props) => {
	const currentUser = AuthService.getCurrentUser();

	return (
		<main className="container">
			<h3 className="mt-4 p-5 bg-primary text-white rounded">
				<strong>{currentUser.username}</strong> Profile
			</h3>

			<p>
				<strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{' '}
				{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
			</p>
			<p>
				<strong>Id:</strong> {currentUser.id}
			</p>
			<p>
				<strong>Email:</strong> {currentUser.email}
			</p>
			<strong>Authorities:</strong>
			<ul>
				{currentUser.roles && currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
			</ul>

			<a style={{ textDecoration: 'none' }} href="/products">
				Click here to go shopping
			</a>
		</main>
	);
};

export default Profile;
