import { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FullScreenLoader from '../pages/FullScreenLoader'; 
import errorImage from '../assets/ErrorImage.png';

export default function Error() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // 1 second delay

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <FullScreenLoader />;
    }

    return (
         <Container fluid className="d-flex align-items-center justify-content-center vh-100">
            <Row>
                <Col className="text-center">
                    <img 
                        src={errorImage} 
                        alt="Error illustration" 
                        style={{ maxWidth: '300px', marginBottom: '20px' }} 
                    />
                    <h1>Oops! Something went wrong.</h1>
                    <p>The page you are looking for does not exist.</p>
                    <Link to="/" className="btn btn-primary">Back to Home</Link>
                </Col>
            </Row>
        </Container>
    );
}
