import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Stocks/Stock.css';
import EditIcon from '@mui/icons-material/Edit';
import { useLocation } from "react-router-dom";
import { BASE_URl } from '../API/Api';

function Stocks() {
  const location = useLocation();
  const { state: { userData } = {} } = location;
  const [showModal, setShowModal] = useState(false);
  const [stocks, setStocks] = useState([]);
  const titleColors = ["#42ff75", "#3ba3ed", "#fc47ed", "#e82e44", "#f2fa5f", "#f2a04e"];
  const [newStockData, setNewStockData] = useState({

    name: '',
    symbol: '',
    purchasePrice: '',
    buyDate: '',
    quantity: '',
    currentPrice: '',
    lastUpdateDate: '',
    userName: userData ? userData.userName : ''
  });

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = () => {
    axios.get(`${BASE_URl}/api/stocks/getStocksForUser/${newStockData.userName}`)
      .then(response => {
        setStocks(response.data);
      })
      .catch(error => {
        console.error('Error fetching stocks:', error);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStockData({ ...newStockData, [name]: value });
  };

  const handleSaveStock = () => {
    axios.post(`${BASE_URl}/api/stocks/save`, newStockData)
      .then(response => {
        console.log('Stock saved successfully:', response.data);
        fetchStocks();
        setNewStockData({
          name: '',
          symbol: '',
          purchasePrice: '',
          buyDate: '',
          quantity: '',
        });
        setShowModal(false);
      })
      .catch(error => {
        console.error('Error saving stock:', error);
      });
  };

  return (
    <div>
      <Button variant="primary" onClick={() => setShowModal(true)}>Create Stock</Button>
      <div className="row row-cols-1 row-cols-md-3 g-4 mt-2" >
      {stocks.map((stock, index) => (
        <div className="col-md-4 mb-3" key={stock.id}>
          <div className="card h-100 d-flex flex-column border border-dark" style={{backgroundColor:"green"}}> 
            <div className="card-body">
              <h5 className="card-title text-center" style={{color:"white"}}>{stock.name}</h5>
              <p style={{color:"white"}}><strong >Symbol:</strong> {stock.symbol}</p>
              <p style={{color:"white"}}><strong>Purchase Price:</strong> {stock.purchasePrice}</p>
              <p style={{color:"white"}}><strong>Buy Date:</strong> {moment(stock.buyDate).format("DD-MM-YYYY")}</p>
              <p style={{color:"white"}}><strong>Quantity:</strong> {stock.quantity}</p>
              <p style={{color:"white"}}><strong>Current Price:</strong> {stock.currentPrice}</p>
              <p style={{color:"white"}}><strong>Last Update Date:</strong> {moment(stock.lastUpdateDate).format("DD-MM-YYYY")}</p>
            </div>
            <div className="card-footer d-flex justify-content-center align-items-center border border-dark ">
            <EditIcon className='fs-4' onClick={() => {}}></EditIcon>
            </div>
          </div>
        </div>
      ))}
       </div>
      <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Create Stock</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={4}>
                <Form.Label>Stock Name</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  name="name"
                  className='border border-dark mb-2'
                  value={newStockData.name}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Label>Stock Symbol</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  name="symbol"
                  className='border border-dark mb-2'
                  value={newStockData.symbol}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Label>Purchase Price</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="number"
                  name="purchasePrice"
                  className='border border-dark mb-2'
                  value={newStockData.purchasePrice}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Label>Buy Date</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="date"
                  name="buyDate"
                  className='border border-dark mb-2'
                  value={newStockData.buyDate}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Label>Quantity</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="number"
                  name="quantity"
                  className='border border-dark mb-2'
                  value={newStockData.quantity}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            {/* <Row>
              <Col md={4}>
                <Form.Label>Current Price</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="number"
                  name="currentPrice"
                  className='border border-dark mb-2'
                  value={newStockData.currentPrice}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Label>Last Update Date</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="date"
                  name="lastUpdateDate"
                  className='border border-dark mb-2'
                  value={newStockData.lastUpdateDate}
                  onChange={handleInputChange}
                />
              </Col>
            </Row> */}
          </Form>
        </Modal.Body>
        <Modal.Footer className='d-flex align-items-center justify-content-center'>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          <Button variant="primary" onClick={handleSaveStock}>Save Stock</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Stocks;
