import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import ProductService from '../../../services/product.service';
import './add-product.css';
const AddProduct = (props) => {
	const initialFormState = {
		name: '',
		price: 0,
		file: null,
	};
	const navigate = useNavigate();
	const [product, setProduct] = useState(initialFormState);
	const [preview, setPreview] = useState();
	const handleChange = (event) => {
		const { name, value } = event.target;
		setProduct({ ...product, [name]: value });
	};
	const handleFileChange = (event) => {
		const file = event.target.files[0];
		setProduct({ ...product, file });
		const objectUrl = URL.createObjectURL(file);
		setPreview(objectUrl);
		return () => URL.revokeObjectURL(objectUrl);
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		const request = {
			name: product.name,
			price: parseInt(product.price),
		};
		const file = product.file;
		ProductService.createProduct(request, file).then(
			(response) => {
				if (response.data) {
					setProduct(initialFormState);
					navigate('/admin/list');
				}
			},
			(error) => {
				alert('Đã có lỗi xảy ra!!Vui lòng thử lại sau');
			}
		);
	};

	const title = <h2>Thêm sản phẩm</h2>;

	return (
		<div>
			<div className="float-end">
				<Button color="success" tag={Link} to="/admin/list">
					Danh sách sản phẩm
				</Button>
			</div>
			<Container>
				{title}

				<Form onSubmit={handleSubmit}>
					<FormGroup>
						<Label for="name">Nhập tên</Label>
						<Input type="text" name="name" id="name" onChange={handleChange} autoComplete="name" />
					</FormGroup>
					<FormGroup>
						<Label for="price">Nhập giá</Label>
						<Input type="number" name="price" id="price" onChange={handleChange} />
					</FormGroup>
					<FormGroup>
						<Label for="file">Chọn hình ảnh</Label>
						<Input type="file" accept="image/*" name="file" id="file" onChange={handleFileChange} />
						{product.file && <img src={preview} />}
					</FormGroup>
					<FormGroup>
						<Button color="primary" type="submit">
							Save
						</Button>
					</FormGroup>
				</Form>
			</Container>
		</div>
	);
};

export default AddProduct;
