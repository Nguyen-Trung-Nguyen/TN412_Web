import React from "react";

import ProductItem from './ProductItem';
import styles from './productstyles.module.css';

const ProductsGrid = (props) => {
  const foundProducts = [];  

    props.products.forEach((product) => {
      if (product.name.indexOf(props.filterText) === -1) {
        return;
      }
       // Correct! Key should be specified inside the array.
      foundProducts.push(<ProductItem key={product.name} product={product} currentUser={props.currentUser}/> );
    })

  return (   
    <main className={styles.main_block}>
      <div style={{fontWeight: 'bold'}}> Số sản phẩm tìm thấy: {foundProducts.length}</div>
      <section className={styles.grid_container}>
        {foundProducts}
      </section>

    </main>
 );
};

export default ProductsGrid;
