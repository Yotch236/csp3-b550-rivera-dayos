import React, { useEffect, useState } from "react";
import { Modal, Table, Button, Image, Spinner } from "react-bootstrap";
import axios from "axios";

const OrderSummaryModal = ({ show, onHide, order }) => {
  const [detailedProducts, setDetailedProducts] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!order || !order.productsOrdered) return;

      try {
        const productDetails = await Promise.all(
          order.productsOrdered.map(async (p) => {
            const res = await axios.get(`http://localhost:4000/products/${p.productId}`);
            return {
              ...p,
              productInfo: res.data,
            };
          })
        );
        setDetailedProducts(productDetails);
      } catch (err) {
        console.error("Failed to fetch product details:", err);
      }
    };

    if (show) {
      fetchProductDetails();
    }
  }, [order, show]);

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Order Summary</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {order ? (
          <>
            <h5>Order ID: {order._id}</h5>
            <p>
              <strong>Ordered On:</strong> {new Date(order.orderedOn || order.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Status:</strong> {order.status || "Processing"}
            </p>

            {detailedProducts.length === 0 ? (
              <div className="text-center my-3">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Loading product details...</p>
              </div>
            ) : (
              <Table bordered hover responsive className="mt-3">
                <thead className="table-dark">
                  <tr>
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {detailedProducts.map((item, i) => (
                    <tr key={i}>
                      <td>
                        <Image
                          src={`http://localhost:4000${item.productInfo.image}`}
                          alt={item.productInfo.name}
                          thumbnail
                          style={{ maxWidth: "80px" }}
                        />
                      </td>
                      <td>{item.productInfo.name}</td>
                      <td>{item.productInfo.description}</td>
                      <td>{item.quantity}</td>
                      <td>₱{item.subtotal.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderSummaryModal;
