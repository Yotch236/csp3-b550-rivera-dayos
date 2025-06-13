// components/profile/OrderHistory.js

import React from "react";
import { Card, Table } from "react-bootstrap";

const OrderHistory = ({ orders }) => {
  return (
    <Card className="shadow-sm top-navbar">
      <Card.Body>
        <Card.Title className="mb-4 footer-title">Order History</Card.Title>
        <Table responsive bordered hover>
          <thead className="text-white" style={{ backgroundColor: "var(--woody-accent)" }}>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.date}</td>
                <td>{order.total}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default OrderHistory;
