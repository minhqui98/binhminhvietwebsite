import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <Card className="product-cart">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.imagehome}
          className="card-img-top imgproduct"
          alt={product.name}
          height={200}
          style={{ objectFit: 'cover', borderRadius: 20 }}
        />
      </Link>
      <Card.Body>
        <Link style={{ color: 'black', textDecoration: 'none' }} to={`/product/${product.id}`}>
          <Card.Title style={{ fontSize: '18px',fontWeight:"bold" }}>{product.name}</Card.Title>
        </Link>
        {/* <Rating rating={product.rating} numReviews={product.numReviews} /> */}
        {/* <Card.Text style={{ color: 'black' }}>
          <span style={{ color: 'Highlight', fontWeight: 'bold' }}>0908467682 (Sđt/Zalo)</span>
        </Card.Text> */}
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Link style={{ backgroundColor: 'none',marginTop:50 }} to={`/product/${product.id}`}>
            {/* <Card.Title>{product.name}</Card.Title> */}
            <Button style={{ borderColor: 'black', color: 'black', backgroundColor: 'transparent', borderRadius: 10,marginTop:20,fontSize:16 }}>
              Xem chi tiết
            </Button>
          </Link>
        )}
      </Card.Body>
    </Card>
  );
}
export default Product;
