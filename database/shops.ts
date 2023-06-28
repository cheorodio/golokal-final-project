import { cache } from 'react';
import { Shop } from '../migrations/1687947524-createShops';
import { sql } from './connect';

type CreateShop = {
  id: number;
  username: string;
  name: string;
  description: string;
  location: string;
};

type ShopName = {
  id: number;
  username: string;
};

// GET ALL SHOPS FOR SHOPS PAGE ///////////////////////////
export const getShops = cache(async () => {
  const shops = await sql<Shop[]>`
    SELECT
      *
    FROM
      shops
 `;
  return shops;
});

// GET SHOP ///////////////////////////////////////////////
export const getShopByUsername = cache(async (username: string) => {
  const shops = await sql<Shop[]>`
    SELECT
      *
    FROM
      shops
    WHERE
      username = ${username}
 `;

  return shops[0];
});

// CREATE SHOP //////////////////////////////
// 1. first verify if the unique shop username is taken
export const verifyShopByShopUsername = cache(async (username: string) => {
  const [shop] = await sql<ShopName[]>`
SELECT
  id,
  username
FROM
  users
WHERE
  users.username = ${username.toLowerCase()}`;
  return shop;
});

// 2. create the shop
export const createShop = cache(
  async (
    username: string,
    name: string,
    description: string,
    location: string,
  ) => {
    const [shop] = await sql<CreateShop[]>`
    INSERT INTO shops
      (username, name, description, location)
    VALUES
      (${username}, ${name}, ${description}, ${location})
    RETURNING
      id,
      username,
      name,
      description,
      location
 `;
    return shop;
  },
);

// GETTING SHOP ///////////////////////////////////////////////
export const getShopById = cache(async (id: number) => {
  const shops = await sql<Shop[]>`
    SELECT
      *
    FROM
      shops
    WHERE
      id = ${id}
  `;

  return shops[0];
});

// UPDATE SHOP //////////////////////////////////////////////////////////
// updating shop page
export const updateShopById = cache(
  async (
    id: number,
    username: string,
    name: string,
    description: string,
    websiteUrl: string,
    location: string,
    shopImageId: number,
  ) => {
    const [shop] = await sql<Shop[]>`
      UPDATE shops
      SET
        username = ${username},
        name = ${name},
        description = ${description},
        website_url = ${websiteUrl},
        location = ${location},
        shop_image_id = ${shopImageId}
      WHERE
        id = ${id}
        RETURNING *
    `;
    return shop;
  },
);

// DELETE SHOP /////////////////////////////////
export const deleteShopById = cache(async (id: number) => {
  const [shop] = await sql<Shop[]>`
      DELETE FROM
        shops
      WHERE
        id = ${id}
        RETURNING *
    `;
  return shop;
});
