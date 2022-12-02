import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import ProductService from '../../../services/product.service';
const EditProduct = () => {
	const initialFormState = {
		name: '',
		price: 0,
		file: null,
	};
	const { id } = useParams();
	const navigate = useNavigate();
	const [product, setProduct] = useState(initialFormState);
	const [preview, setPreview] = useState();

	useEffect(() => {
		ProductService.findById(id).then((res) => {
			if (res.data) {
				const productState = {
					name: res.data.name,
					price: res.data.price,
				};
				setProduct(productState);
				const urlImg = 'http://localhost:8089/api/product/image/' + res.data.photo;
				fetch(urlImg, {
					method: 'GET',
				})
					.then((response) => response.blob())
					.then((data) => {
						const file = new File([data], res.data.photo, {
							type: 'image/png',
						});
						setProduct({ ...productState, file });
						const objectUrl = URL.createObjectURL(file);
						setPreview(objectUrl);
					});
			}
		});
	}, [id, setProduct]);

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
		ProductService.updateById(id, request, file).then(
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

	const title = <h2>Sửa sản phẩm</h2>;

	return (
		<div className="container wrapper">
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
						<Input
							type="text"
							name="name"
							id="name"
							value={product.name}
							onChange={handleChange}
							autoComplete="name"
						/>
					</FormGroup>
					<FormGroup>
						<Label for="price">Nhập giá</Label>
						<Input
							type="number"
							name="price"
							id="price"
							value={product.price}
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="file">Chọn hình ảnh</Label>
						<Input type="file" accept="image/*" name="file" id="file" onChange={handleFileChange} />
						{product.file && <img src={preview} />}
					</FormGroup>
					<FormGroup>
						<Button color="primary" type="submit">
							Update
						</Button>
					</FormGroup>
				</Form>
			</Container>
		</div>
	);
};

export default EditProduct;
