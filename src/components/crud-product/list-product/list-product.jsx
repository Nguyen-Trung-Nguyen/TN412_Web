import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { formatNumber } from '../../../helpers/utils';
import ProductService from '../../../services/product.service';
import './list-product.css';
const ListProduct = (props) => {
	const [products, setProducts] = useState([]);
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
	const productList = products.map((product, index) => {
		return (
			<tr key={product.id}>
				<td style={{ whiteSpace: 'nowrap' }}>{index + 1}</td>
				<td>{product.name}</td>
				<td>{formatNumber(product.price)}</td>
				<td>
					<img
						className="image"
						src={'http://localhost:8089/api/product/image/' + product.photo}
						alt=""
					/>
				</td>
				<td>
					<ButtonGroup>
						<Button size="sm" color="primary" tag={Link} to={'/admin/edit/' + product.id}>
							Edit
						</Button>
						<Button size="sm" color="danger" onClick={() => remove(product.id)}>
							Xóa
						</Button>
					</ButtonGroup>
				</td>
			</tr>
		);
	});
	const remove = async (id) => {
		let text = 'Bạn có muốn xóa sản phẩm này không?';
		if (window.confirm(text) == true) {
			ProductService.deleteById(id).then(
				(response) => {
					if (response.data) {
						let updatedProduct = [...products].filter((i) => i.id !== id);
						setProducts(updatedProduct);
					}
				},
				(error) => {
					alert('Đã có lỗi xảy ra!!Vui lòng thử lại sau');
				}
			);
		} else {
		}
	};
	return (
		<div className="wrapper">
			<Container fluid>
				<div className="float-end">
					<Button color="success" tag={Link} to="/admin/add">
						Thêm sản phẩm
					</Button>
				</div>
				<h3>Danh sách sản phẩm ({products.length} sản phẩm)</h3>
				<Table className="mt-4">
					<thead>
						<tr>
							<th width="10%">STT</th>
							<th width="20%">Tên</th>
							<th width="20%">Giá</th>
							<th width="30%">Hình ảnh</th>
						</tr>
					</thead>
					<tbody>{productList}</tbody>
				</Table>
			</Container>
		</div>
	);
};

export default ListProduct;
