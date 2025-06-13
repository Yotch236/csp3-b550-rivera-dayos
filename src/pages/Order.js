import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Spinner, Alert, Accordion } from "react-bootstrap";
import UserContext from "../context/UserContext";
import OrderSummaryModal from "../components/order/OrderSummaryModal";

const Order = () => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleRowClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const url = user && user.isAdmin ? `${process.env.REACT_APP_API_BASE_URL}/orders/all-orders` : `${process.env.REACT_APP_API_BASE_URL}/orders/`;
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setTimeout(() => {
          const sortedOrders = res.data.sort(
            (a, b) => new Date(b.orderedOn || b.createdAt) - new Date(a.orderedOn || a.createdAt)
          );
          setOrders(sortedOrders);
          console.log(`orders is array?`, Array.isArray(orders));
          setLoading(false);
        }, 800);
      } catch (err) {
        setError("No Orders Found.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]); // user is needed since you use user?.isAdmin

  // Group orders by userId._id
  const groupedOrders = orders.reduce((acc, order) => {
    const uid = order.userId?._id || "Unknown";
    if (!acc[uid]) {
      acc[uid] = {
        userId: uid,
        userName: `${order.userId?.firstName || "Unknown"} ${order.userId?.lastName || ""}`,
        orders: [],
      };
    }
    acc[uid].orders.push(order);
    return acc;
  }, {});

  return (
    <>
      <Container className="py-4">
        <h2 className="mb-4">Order History</h2>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : orders.length === 0 ? (
          <Alert variant="info">You have no past orders.</Alert>
        ) : user?.isAdmin ? (
          // Show accordion for admins
          <Accordion defaultActiveKey="0" alwaysOpen>
            {Object.values(groupedOrders).map((group, idx) => (
              <Accordion.Item eventKey={idx.toString()} key={group.userId}>
                <Accordion.Header>
                  {group.userName} — ID: {group.userId}
                </Accordion.Header>
                <Accordion.Body>
                  <Table striped bordered hover responsive>
                    <thead className="table-dark">
                      <tr>
                        <th>Order ID</th>
                        <th>Total Price</th>
                        <th>Ordered On</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.orders.map((order) => (
                        <tr key={order._id} onClick={() => handleRowClick(order)} className="table-row-clickable">
                          <td>{order._id}</td>
                          <td>₱{order.totalPrice.toLocaleString()}</td>
                          <td>{new Date(order.orderedOn || order.createdAt).toLocaleString()}</td>
                          <td>{order.status || "Processing"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        ) : (
          // Show flat table for regular users
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>Order ID</th>
                <th>Total Price</th>
                <th>Ordered On</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} onClick={() => handleRowClick(order)} className="table-row-clickable">
                  <td>{order._id}</td>
                  <td>₱{order.totalPrice.toLocaleString()}</td>
                  <td>{new Date(order.orderedOn || order.createdAt).toLocaleString()}</td>
                  <td>{order.status || "Processing"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>

      <OrderSummaryModal show={showModal} onHide={handleClose} order={selectedOrder} />
    </>
  );
};

export default Order;
