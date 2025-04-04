import axios from 'axios';
import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Rating from '../components/Rating';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import { Store } from '../Store';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { toast } from 'react-toastify';
import data from '../data';

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'REFRESH_PRODUCT':
//       return { ...state, product: action.payload };
//     case 'CREATE_REQUEST':
//       return { ...state, loadingCreateReview: true };
//     case 'CREATE_SUCCESS':
//       return { ...state, loadingCreateReview: false };
//     case 'CREATE_FAIL':
//       return { ...state, loadingCreateReview: false };
//     case 'FETCH_REQUEST':
//       return { ...state, loading: true };
//     case 'FETCH_SUCCESS':
//       return { ...state, product: action.payload, loading: false };
//     case 'FETCH_FAIL':
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

function ProductScreen() {
  // let reviewsRef = useRef();

  // const [rating, setRating] = useState(0);
  // const [comment, setComment] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

  const navigate = useNavigate();
  const params = useParams();
  const { id } = useParams();
  console.log(data.products,"data.products");
  
  console.log(id,"id");
  
  const product = data.products?.find((p) => p.id === id);
  console.log(product,"product");
  
  // const { slug } = params;

  // const [{ loading, error, product, loadingCreateReview }, dispatch] = useReducer(reducer, {
  //   product: [],
  //   loading: true,
  //   error: '',
  // });
  // useEffect(() => {
  //   const fetchData = async () => {
  //     dispatch({ type: 'FETCH_REQUEST' });
  //     try {
  //       const result = await axios.get(`/api/products/slug/${slug}`);
  //       dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
  //     } catch (err) {
  //       dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
  //     }
  //   };
  //   fetchData();
  // }, [slug]);

  // const { state, dispatch: ctxDispatch } = useContext(Store);
  // const { cart, userInfo } = state;
  
  return (
    <div style={{marginTop:66}}>
      <Row>
        <Col md={6}>
          <img style={{borderRadius:10}} className="img-large" src={selectedImage || product.image} alt={product.name}></img>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row xs={1} md={2} className="g-2">
                {[product.image, ...product.images].map((x) => (
                  <Col key={x}>
                    <Card style={{ objectFit: 'cover' }}>
                      <Button style={{border:selectedImage==x ? "2px solid cadetblue":"none"}} className="thumbnail" type="button" variant="light" onClick={() => setSelectedImage(x)}>
                        <Card.Img variant="top" src={x} alt="product" />
                      </Button>
                    </Card>
                  </Col>
                ))}
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h1 style={{ fontSize: '20px',fontWeight:"bold" }}>{product.name}</h1>
            </ListGroup.Item>
            {/* <ListGroup.Item>
              <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
            </ListGroup.Item> */}
            {/* <ListGroup.Item>
              <span className="text-bold">Giá</span> : ${product.price}
            </ListGroup.Item> */}
            <ListGroup.Item>
              <span className="text-bold" style={{ fontSize:16 }}>Mô tả:</span>
              <p style={{ fontStyle: 'italic',fontSize:17 }}>Chất liệu 100% cotton, thêu logo trước sau, khóa nón đủ loại theo size</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
              <ListGroup.Item>
                  <p style={{ fontSize:15 }}>* Và còn rất nhiều mẫu mã khác vui lòng liên hệ để biết thêm chi tiết.</p>
                  <p style={{ fontSize:15 }}>* Nhận đặt nón theo yêu cầu số lượng lớn</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Giá:</Col>
                    <Col style={{fontWeight: 'bold' }}>Liên hệ</Col>
                  </Row>
                </ListGroup.Item>

                {/* {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button onClick={addToCartHandler} variant="primary">
                        Thêm giỏ hàng
                      </Button>
                    </div>
                  </ListGroup.Item>
                )} */}
                <ListGroup.Item>
                  <div className="d-grid">
                    <span style={{ color: '#dd2f2c', fontWeight: 'bold', fontSize: '20px' }}>0908&nbsp;467&nbsp;682 (Nam) </span>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* <div className="my-3">
        <h2 ref={reviewsRef}>Đánh giá</h2>
        <div className="mb-3">{product.reviews.length === 0 && <MessageBox>Không có đánh giá nào</MessageBox>}</div>
        <ListGroup>
          {product.reviews.map((review) => (
            <ListGroup.Item key={review._id}>
              <strong>{review.name}</strong>
              <Rating rating={review.rating} caption=" "></Rating>
              <p>{review.createdAt.substring(0, 10)}</p>
              <p>{review.comment}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <div className="my-3">
          {userInfo ? (
            <form onSubmit={submitHandler}>
              <h2>Write a customer review</h2>
              <Form.Group className="mb-3" controlId="rating">
                <Form.Label>Rating</Form.Label>
                <Form.Select aria-label="Rating" value={rating} onChange={(e) => setRating(e.target.value)}>
                  <option value="">Select...</option>
                  <option value="1">1- Poor</option>
                  <option value="2">2- Fair</option>
                  <option value="3">3- Good</option>
                  <option value="4">4- Very good</option>
                  <option value="5">5- Excelent</option>
                </Form.Select>
              </Form.Group>
              <FloatingLabel controlId="floatingTextarea" label="Comments" className="mb-3">
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </FloatingLabel>

              <div className="mb-3">
                <Button disabled={loadingCreateReview} type="submit">
                  Submit
                </Button>
                {loadingCreateReview && <LoadingBox></LoadingBox>}
              </div>
            </form>
          ) : (
            <MessageBox>
              Please <Link to={`/signin?redirect=/product/${product.slug}`}>Sign In</Link> to write a review
            </MessageBox>
          )}
        </div>
      </div> */}
    </div>
  );
}
export default ProductScreen;
