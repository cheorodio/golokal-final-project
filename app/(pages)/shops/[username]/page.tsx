import { cookies } from 'next/headers';
// import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { AiOutlineCamera } from 'react-icons/ai';
import { VscLocation } from 'react-icons/vsc';
import { getProducts } from '../../../../database/products';
import { getShopByUsername } from '../../../../database/shops';
import { getUserBySessionToken } from '../../../../database/users';
import styles from '../../../styles/SingleShopPage.module.scss';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: { default: 'golokal | Discover local vendors' },
  description:
    'At golokal, we are passionate about supporting artisans, craftsmen, and local businesses, and our platform serves as a virtual marketplace to showcase their unique creations.',
};

type Props = {
  params: { username: string };
};

export default async function VendorProfilePage(props: Props) {
  const sessionToken = cookies().get('sessionToken');
  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  const shopOwner = user?.id;
  if (!shopOwner) {
    return redirect(`/login?returnTo=/${props.params.username}`);
  }

  const singleShop = await getShopByUsername(props.params.username);
  console.log({ singleShop });

  if (!singleShop) {
    notFound();
  }
  // const getProductsList = await getProducts();

  return (
    <main>
      <div className={styles.shopPage}>
        <div className={styles.shopInfo}>
          <div className={styles.imageBox}>
            <AiOutlineCamera />
          </div>
          <div className={styles.moreInfo}>
            <h1>{singleShop.name}</h1>
            <div>
              <Link href="/">{singleShop.websiteUrl}</Link>
              <button className={styles.followButton}>follow</button>
            </div>
            <p className={styles.shopBio}>{singleShop.description}</p>
            <p>
              <VscLocation /> {singleShop.location}
            </p>
          </div>
        </div>

        {/* <div className={styles.productsFeed}>
          <h2>Products Feed</h2>
          <div className={styles.productsContainer}>
            <div className={styles.productCardsContainer}>
              {getProductsList.map((product) => {
                return (
                  <div
                    key={`product-div-${product.id}`}
                    className={styles.productCard}
                  >
                    <div className={styles.imageBox}>
                      <AiOutlineCamera />
                    </div>
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div> */}
      </div>
    </main>
  );
}
