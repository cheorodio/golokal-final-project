'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Product } from '../../../../../migrations/1687505841-createTableProducts';
import styles from '../../../../styles/ProductsForm.module.scss';

type Props = {
  products: Product[];
};

export default function CreateProductsForm({ products }: Props) {
  const [productList, setProductList] = useState(products);
  const [nameInput, setNameInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [productImageId, setProductImageId] = useState('');
  const router = useRouter();

  async function createProduct() {
    const response = await fetch('/api/products', {
      method: 'POST',
      body: JSON.stringify({
        name: nameInput,
        category: categoryInput,
        description: descriptionInput,
        productImageId: productImageId,
      }),
    });

    const data = await response.json();

    setProductList([...productList, data.product]);

    router.refresh();
  }

  return (
    <div className={styles.addProductsForm}>
      <h3>Add a product</h3>
      <form>
        <label>
          <input
            placeholder="Name"
            value={nameInput}
            onChange={(event) => setNameInput(event.currentTarget.value)}
          />
        </label>

        <label>
          <input
            placeholder="Category"
            value={categoryInput}
            onChange={(event) => setCategoryInput(event.currentTarget.value)}
          />
        </label>

        <label>
          <textarea
            placeholder="Description"
            value={descriptionInput}
            maxLength={200}
            onChange={(event) => setDescriptionInput(event.currentTarget.value)}
          />
        </label>

        {/* <label>
          <input
            type="file"
            value={productImageId}
            onChange={(event) => setProductImageId(event.currentTarget.value)}
          />
        </label> */}

        <button
          className={styles.createProductButton}
          onClick={async () => await createProduct()}
        >
          Add product
        </button>
      </form>
    </div>
  );
}