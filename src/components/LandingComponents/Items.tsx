import React from 'react'
import { Card, Button, Col } from 'react-bootstrap';
import styles from '~/Style/LandingPage.module.css';

interface Prop {
    title: string,
    src: string,
    desc: string
};

const Items = ({ title, src, desc }: Prop) => {

    return (
        <Col sm={6} md={4} lg={3} className="mb-4">
            <Card className={styles['custom-card']}>
                <Card.Img variant="top" src={src} />
                <Card.Body>
                    <Card.Title className={styles['custom-title']}>{title}</Card.Title>
                    <Card.Text className={styles['custom-text']}>
                        {desc}
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Items