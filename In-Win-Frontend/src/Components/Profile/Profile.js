import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useLocation } from "react-router-dom";
import { BASE_URl } from '../API/Api';
import { CurrencyState } from '../../CurrencyContext';

function Profile() {
    const location = useLocation();
    const { state: { userData } = {} } = location;
    const [showModal, setShowModal] = useState(false);
    const [showProfessionalModal, setShowProfessionalModal] = useState(false);
    const [editedUserData, setEditedUserData] = useState({
        userName: userData ? userData.userName : "",
        email: userData ? userData.email : "",
        password: userData ? userData.password : "",
        mobileNumber: userData ? userData.mobileNumber : "",
        gender: userData ? userData.gender : "",
        fatherName: userData ? userData.fatherName : "",
        dob: userData ? moment(userData.dob).format('YYYY-MM-DD') : "",
        bloodGroup: userData ? userData.bloodGroup : "",
        panNumber: userData ? userData.panNumber : "",
        aadhar: userData ? userData.aadhar : "",
        voterId: userData ? userData.voterId : "",
        drivingLicense: userData ? userData.drivingLicense : "",
        presentAddress: userData ? userData.presentAddress : "",
        permanentAddress: userData ? userData.permanentAddress : ""
    });

    const [editedProfessionalData, setEditedProfessionalData] = useState({
      ctc: userData ? userData.ctc : "",
      yearlyBonus: userData ? userData.yearlyBonus : "",
      pfUAN: userData ? userData.pfUAN : "",
      pfStartDate: userData ? userData.pfStartDate : "",
      pfTotalPaid: userData ? userData.pfTotalPaid : "",
      monthlyEMI: userData ? userData.monthlyEMI : "",
      occupation: userData ? userData.occupation : "",
      designation: userData ? userData.designation : "",
      companyAddress: userData ? userData.companyAddress : "",
      empId: userData ? userData.empId : "",
      companyContact: userData ? userData.companyContact : "",
      companyName: userData ? userData.companyName : "",
      companyPhoneNumber: userData ? userData.companyPhoneNumber : "",
      companyEmail: userData ? userData.companyEmail : "",
      companyLandline: userData ? userData.companyLandline : "",
      emergencyContact: userData ? userData.emergencyContact : ""
  });
  const handleEditProfessional = () => {
    setShowProfessionalModal(true);
};
const handleCloseProfessionalModal = () => {
  setShowProfessionalModal(false);
};

    const handleEdit = () => {
        setShowModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleInputChangeProfessional = (e) => {
      const { name, value } = e.target;
      setEditedProfessionalData(prevData => ({
          ...prevData,
          [name]: value
      }));
  };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSaveUserDetails = () => {
      axios.put(`${BASE_URl}/api/users/updateUser-personal/${userData.id}`, editedUserData)
      .then(response => {
          console.log('User details updated successfully:', response.data);
          Swal.fire({
              icon: 'success',
              title: 'User Details Updated',
              showConfirmButton: false,
              timer: 1500
          });
          setShowModal(false);
      })
      .catch(error => {
          console.error('Error updating user details:', error);
      });
    };
    const handleSaveProfessionalDetails = () => {
      axios.put(`${BASE_URl}/api/users/updateUser-professional/${userData.id}`, editedProfessionalData)
      .then(response => {
          console.log('User details updated successfully:', response.data);
          Swal.fire({
              icon: 'success',
              title: 'User Details Updated',
              showConfirmButton: false,
              timer: 1500
          });
          setShowModal(false);
      })
      .catch(error => {
          console.error('Error updating user details:', error);
      });
    };

    return (
        <div>
            <Button variant="primary" onClick={handleEdit}>Edit Profile</Button>
            <Button variant="primary" onClick={handleEditProfessional}>Edit Professional Details</Button>
            <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Username</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="userName"
                                    value={editedUserData.userName}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Email</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={editedUserData.email}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Password</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={editedUserData.password}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Mobile Number</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="mobileNumber"
                                    value={editedUserData.mobileNumber}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Gender</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    as="select"
                                    name="gender"
                                    value={editedUserData.gender}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </Form.Control>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Father's Name</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="fatherName"
                                    value={editedUserData.fatherName}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Date of Birth</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="date"
                                    name="dob"
                                    value={editedUserData.dob}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Blood Group</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="bloodGroup"
                                    value={editedUserData.bloodGroup}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>PAN Number</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="panNumber"
                                    value={editedUserData.panNumber}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Aadhar Number</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="aadhar"
                                    value={editedUserData.aadhar}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Voter ID</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="voterId"
                                    value={editedUserData.voterId}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Driving License</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="drivingLicense"
                                    value={editedUserData.drivingLicense}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Present Address</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="presentAddress"
                                    value={editedUserData.presentAddress}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Permanent Address</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="permanentAddress"
                                    value={editedUserData.permanentAddress}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                    <Button variant="primary" onClick={handleSaveUserDetails}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showProfessionalModal} onHide={handleCloseProfessionalModal} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Professional Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col md={4}>
                            <Form.Label>CTC</Form.Label>
                        </Col>
                        <Col md={8}>
                            <Form.Control
                                type="text"
                                name="ctc"
                                value={editedProfessionalData.ctc}
                                onChange={handleInputChangeProfessional}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Form.Label>Yearly Bonus</Form.Label>
                        </Col>
                        <Col md={8}>
                            <Form.Control
                                type="text"
                                name="yearlyBonus"
                                value={editedProfessionalData.yearlyBonus}
                                onChange={handleInputChangeProfessional}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Form.Label>PF UAN</Form.Label>
                        </Col>
                        <Col md={8}>
                            <Form.Control
                                type="text"
                                name="pfUAN"
                                value={editedProfessionalData.pfUAN}
                                onChange={handleInputChangeProfessional}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Form.Label>PF Start Date</Form.Label>
                        </Col>
                        <Col md={8}>
                            <Form.Control
                                type="date"
                                name="pfStartDate"
                                value={editedProfessionalData.pfStartDate}
                                onChange={handleInputChangeProfessional}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Form.Label>PF Total Paid</Form.Label>
                        </Col>
                        <Col md={8}>
                            <Form.Control
                                type="text"
                                name="pfTotalPaid"
                                value={editedProfessionalData.pfTotalPaid}
                                onChange={handleInputChangeProfessional}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Form.Label>Monthly EMI</Form.Label>
                        </Col>
                        <Col md={8}>
                            <Form.Control
                                type="text"
                                name="monthlyEMI"
                                value={editedProfessionalData.monthlyEMI}
                                onChange={handleInputChangeProfessional}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Form.Label>Occupation</Form.Label>
                        </Col>
                        <Col md={8}>
                            <Form.Control
                                type="text"
                                name="occupation"
                                value={editedProfessionalData.occupation}
                                onChange={handleInputChangeProfessional}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Form.Label>Designation</Form.Label>
                        </Col>
                        <Col md={8}>
                            <Form.Control
                                type="text"
                                name="designation"
                                value={editedProfessionalData.designation}
                                onChange={handleInputChangeProfessional}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Form.Label>Company Address</Form.Label>
                        </Col>
                        <Col md={8}>
                            <Form.Control
                                type="text"
                                name="companyAddress"
                                value={editedProfessionalData.companyAddress}
                                onChange={handleInputChangeProfessional}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Form.Label>Employee ID</Form.Label>
                        </Col>
                        <Col md={8}>
                            <Form.Control
                                type="text"
                                name="empId"
                                value={editedProfessionalData.empId}
                                onChange={handleInputChangeProfessional}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Form.Label>Company Contact</Form.Label>
                        </Col>
                        <Col md={8}>
                            <Form.Control
                                type="text"
                                name="companyContact"
                                value={editedProfessionalData.companyContact}
                                onChange={handleInputChangeProfessional}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Form.Label>Company Name</Form.Label>
                        </Col>
                        <Col md={8}>
                            <Form.Control
                                type="text"
                                name="companyName"
                                value={editedProfessionalData.companyName}
                                onChange={handleInputChangeProfessional}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Form.Label>Company Phone Number</Form.Label>
                        </Col>
                        <Col md={8}>
                            <Form.Control
                                type="text"
                                name="companyPhoneNumber"
                                value={editedProfessionalData.companyPhoneNumber}
                                onChange={handleInputChangeProfessional}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Form.Label>Company Email</Form.Label>
                        </Col>
                        <Col md={8}>
                            <Form.Control
                                type="text"
                                name="companyEmail"
                                value={editedProfessionalData.companyEmail}
                                onChange={handleInputChangeProfessional}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Form.Label>Company Landline</Form.Label>
                        </Col>
                        <Col md={8}>
                            <Form.Control
                                type="text"
                                name="companyLandline"
                                value={editedProfessionalData.companyLandline}
                                onChange={handleInputChangeProfessional}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Form.Label>Emergency Contact</Form.Label>
                        </Col>
                        <Col md={8}>
                            <Form.Control
                                type="text"
                                name="emergencyContact"
                                value={editedProfessionalData.emergencyContact}
                                onChange={handleInputChangeProfessional}
                            />
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                <Button variant="primary" onClick={handleSaveProfessionalDetails}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
        </div>
    );
}

export default Profile;
