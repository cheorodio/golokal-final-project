import { Sql } from 'postgres';

export const products = [
  {
    id: 1,
    name: 'Ocean',
    categoryId: 1,
    description:
      'Introducing our exquisite hand-poured ocean-scented candles, crafted to bring the refreshing essence of the sea into your living space. Immerse yourself in the tranquil atmosphere of coastal serenity with every flicker of our artisanal candles.',
    productImageId: 1,
  },
  {
    id: 2,
    name: 'Christmas',
    categoryId: 2,
    description:
      'Introducing our enchanting hand-poured Christmas-scented candles, meticulously crafted to infuse your home with the nostalgic and heartwarming aromas of the holiday season. Immerse yourself in the magical ambiance of Christmas with every flicker of our artisanal candles.',
    productImageId: 2,
  },
];

export async function up(sql: Sql) {
  for (const product of products) {
    await sql`
    INSERT INTO products
      (name, category_id, description, product_image_id)
    VALUES
      (${product.name}, ${product.categoryId}, ${product.description}, ${product.productImageId})
  `;
  }
}

export async function down(sql: Sql) {
  for (const product of products) {
    await sql`
      DELETE FROM products WHERE id = ${product.id}
  `;
  }
}
