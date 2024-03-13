import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Stocks/Stock.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useLocation } from "react-router-dom";

import { BASE_URl } from '../API/Api';
import { CurrencyState } from '../../CurrencyContext';

function Jewellery() {
  const location = useLocation();
  const { state: { userData } = {} } = location;
  const [showModal, setShowModal] = useState(false);
  const [jewellery, setJewellery] = useState([]);
  const [selectedJewellery, setSelectedJewellery] = useState(null);
  const { exchangeRate, currency } = CurrencyState();
  const [jewelleryPrice,setJewelleryPrice]= useState(0)
  const titleColors = ["#42ff75", "#3ba3ed", "#fc47ed", "#e82e44", "#f5c802", "#f2a04e"];

  const populateModal = () => {
    if (!selectedJewellery) return;
    setNewJewelleryData({
      id: selectedJewellery.id,
      name: selectedJewellery.name,
      goldCarat: selectedJewellery.goldCarat,
      goldQuantity: selectedJewellery.goldQuantity,
      diamondShape: selectedJewellery.diamondShape,
      buyDate: selectedJewellery.buyDate,
      diamondCarat: selectedJewellery.diamondCarat,
      diamondQuantity: selectedJewellery.diamondQuantity,
      purchasePrice: selectedJewellery.purchasePrice,

    });
  };


  useEffect(() => {
    populateModal(selectedJewellery);
  }, [selectedJewellery]);

  const [newJewelleryData, setNewJewelleryData] = useState({
    id: '',
    name: '',
    goldCarat: '',
    goldQuantity: "",
    diamondShape: '',
    diamondCarat: "",
    diamondQuantity: "",
    buyDate: "",
    buyDate: '',
    goldCurrentPrice: "",
    diamondCurrentPrice: '',
    lastUpdateDate: '',
    userName: userData ? userData.userName : ''
  });

  useEffect(() => {
    if (userData && userData.userName) {
      fetchGold();
    }
  }, [userData]);

  const fetchGold = () => {
    axios.get(`${BASE_URl}/api/jewellery/getJewelleryForUser/${userData.userName}`)
      .then(response => {
        setJewellery(response.data);
      })
      .catch(error => {
        console.error('Error fetching Jewellery:', error);
      });
  };

  const renderPrice = (price) => {
    return (price / exchangeRate).toFixed(2);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJewelleryData({ ...newJewelleryData, [name]: value });
  };

  const handleDeleteGold = (jewelleryId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this Jewellery.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${BASE_URl}/api/jewellery/deleteJewellery/${jewelleryId}`)
          .then(response => {
            if (response.status === 200) {
              Swal.fire({
                icon: 'success',
                title: 'Jewellery Deleted',
                text: 'The Jewellery has been deleted successfully.',
              });
              fetchGold();
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Failed to Delete Jewellery',
                text: 'An error occurred while deleting the Jewellery. Please try again later.',
              });
            }
          })
          .catch(error => {
            console.error('Error deleting Jewellery:', error);
            Swal.fire({
              icon: 'error',
              title: 'Failed to Delete Jewellery',
              text: 'An error occurred while deleting the Jewellery. Please try again later.',
            });
          });
      }
    });
  };

  const handleSaveGold = () => {
    if (newJewelleryData.id) {
      axios.put(`${BASE_URl}/api/jewellery/updateJewellery/${newJewelleryData.id}`, newJewelleryData)
        .then(response => {
          console.log('Jewellery updated successfully:', response.data);
          Swal.fire({
            icon: 'success',
            title: 'Jewellery Updated',
            showConfirmButton: false,
            timer: 1500
          });
          // Update local state after successful update
          fetchGold();
          setShowModal(false);
        })
        .catch(error => {
          console.error('Error updating Jewellery:', error);
        });
    } else {
      axios.post(`${BASE_URl}/api/jewellery/save`, newJewelleryData)
        .then(response => {
          console.log('Jewellery saved successfully:', response.data);
          Swal.fire({
            icon: 'success',
            title: 'Jewellery Created',
            showConfirmButton: false,
            timer: 1500
          });
          fetchGold();
          setShowModal(false);
        })
        .catch(error => {
          console.error('Errobr saving Jewellery:', error);
        });
    }
  };
  const handleEdit = (jewellery) => {
    setSelectedJewellery(jewellery);
    setShowModal(true);
  };


  

  useEffect(() => {
    fetch(`${BASE_URl}/api/jewellery/totalJewelleryPrice/${userData.userName}`)
      .then(response => response.json())
      .then(data => {
        setJewelleryPrice(data.totalPrice);
      })
      .catch(error => {
        console.error('Error fetching PF amount :', error);
      });
  }, []);

  return (
    <div>
      <Button variant="primary" onClick={() => setShowModal(true)}>Add Jewellery</Button>
      <div className="row row-cols-1 row-cols-md-3 g-4 " style={{ marginTop: "1px" }}>
        {jewellery.map((jewellery, index) => (
          <div className="col-md-4 mb-3" key={jewellery.id}>
            <div className="card h-100 d-flex flex-column border border-dark" style={{ backgroundColor: index < titleColors.length ? titleColors[index] : titleColors[index % titleColors.length] }}>
              <div className="card-body">
                <h5 className="card-title text-center" style={{ color: "black" }}>{jewellery.name}</h5>
                <p style={{ color: "black" }}><strong >Gold Carat:</strong> {jewellery.goldCarat}</p>
                <p style={{ color: "black" }}><strong >Gold Quantity:</strong> {jewellery.goldQuantity}</p>
                
                <p style={{ color: "black" }}><strong >Diamond Shape:</strong> {jewellery.diamondShape}</p>
                <p style={{ color: "black" }}><strong >Diamond Carat:</strong> {jewellery.diamondCarat}</p>
                <p style={{ color: "black" }}><strong >Diamond Quantity:</strong> {jewellery.diamondQuantity}</p>

                <p style={{ color: "black" }}><strong>Purchase Price:</strong> {renderPrice(jewellery.purchasePrice)} {currency}</p>
                <p style={{ color: "black" }}><strong>Buy Date:</strong> {moment(jewellery.buyDate).format("DD-MM-YYYY")}</p>
              
                <p style={{ color: "black" }}><strong>Current Price:</strong> {renderPrice(jewelleryPrice)} {currency} </p>
                <p style={{ color: "black" }}><strong>Last Update Date:</strong> {moment(jewellery.lastUpdateDate).format("DD-MM-YYYY")}</p>

              </div>
              <div className="card-footer d-flex justify-content-center align-items-center border border-dark ">
                <EditIcon className='fs-4 m-2' onClick={() => { handleEdit(jewellery) }}></EditIcon>
                <DeleteForeverIcon className='fs-4' onClick={() => { handleDeleteGold(jewellery.id) }}></DeleteForeverIcon>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{newJewelleryData.id ? 'Edit' : 'Add'} Jewellery</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={4}>
                <Form.Label>Jewellery Name</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder=''
                  className='border border-dark mb-2'
                  value={newJewelleryData.name}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Label>Gold Carat</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Select
                  type="text"
                  name="goldCarat"
                  placeholder='22,24'
                  className='border border-dark mb-2'
                  value={newJewelleryData.goldCarat}
                  onChange={handleInputChange}
                >
                  <option value="">Select Carat</option>
                  <option value="22">22 Carat</option>
                  <option value="24">24 Carat </option>
                  
                  </Form.Select>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Label>Gold Quantity</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="number"
                  placeholder='In grams'
                  name="goldQuantity"
                  className='border border-dark mb-2'
                  value={newJewelleryData.goldQuantity}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Label>Diamond Shape</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Select
                  type="text"
                  name="diamondShape"
                  placeholder=''
                  className='border border-dark mb-2'
                  value={newJewelleryData.diamondShape}
                  onChange={handleInputChange}
                >
                  <option value="">Select Shape</option>
                  <option value="Round">Round</option>
                  <option value="Oval">Oval</option>
                  <option value="Emerald">Emerald</option>
                </Form.Select>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Label>Diamond Carat</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Select
                  type="text"
                  name="diamondCarat"
                  placeholder='22,24'
                  className='border border-dark mb-2'
                  value={newJewelleryData.diamondCarat}
                  onChange={handleInputChange}
                >
                  <option value="">Select Carat</option>
                  <option value="0.5">0.5 Carat</option>
                  <option value="1.0">1 Carat </option>
                  <option value="2.0">2 Carat </option>

                </Form.Select>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Label>Diamond Quantity</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="number"
                  placeholder='In grams'
                  name="diamondQuantity"
                  className='border border-dark mb-2'
                  value={newJewelleryData.diamondQuantity}
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
                  placeholder='50₹'
                  className='border border-dark mb-2'
                  value={newJewelleryData.purchasePrice}
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
                  value={newJewelleryData.buyDate}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>

          </Form>
        </Modal.Body>
        <Modal.Footer className='d-flex align-items-center justify-content-center '>
          <Button variant="secondary " onClick={handleCloseModal}>Close</Button>
          <Button variant="primary" onClick={handleSaveGold}>{newJewelleryData.id ? 'Update' : 'Save'} Jewellery</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Jewellery;

