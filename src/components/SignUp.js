import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
// import axios from 'axios';

const SignUp = () => {
  return (
    <div>
      <div className="container my-4">
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6}>
            <h1>Sign up</h1>
            <Form>
              <Form.Group controlId="firstname">
                <Form.Label>Full Name:</Form.Label>
                <Form.Control type="text" name="fullname" required />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" name="email" required />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  required
                  minLength={8}
                />
              </Form.Group>

              <Form.Group controlId="dob">
                <Form.Label>Date of Birth:</Form.Label>
                <Form.Control type="date" name="dob" required />
              </Form.Group>

              <Form.Group controlId="dob">
                <Form.Label>Gender:</Form.Label>
                <Form.Control as="select" name="gender" required>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="not-specified">Prefer not to say</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="country">
                <Form.Label>Country:</Form.Label>
                <Form.Control type="text" name="country" required />
              </Form.Group>

              <Button className="my-3" variant="primary" type="submit">
                Sign up
              </Button>
            </Form>
            <p className="text-center mt-4">
              Already a user?
              <NavLink
                className="nav-link"
                activeclassname="active"
                to="/sign-in"
              >
                Log in
              </NavLink>
            </p>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SignUp;
