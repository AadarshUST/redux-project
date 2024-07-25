import { Card, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from '~/Style/LandingPage.module.css';

interface Prop {
    id: string;
    title: string;
    src: string;
    desc: string;
    process: string;

};

const Items = ({ id, title, src, desc, process }: Prop) => {
    return (
        <Col sm={6} md={4} lg={3} className="mb-4">
            <Link to={`/${id}`} className={styles['link']}>
                <Card className={styles['custom-card']}>
                    <Card.Img variant="top" src={`http://localhost:5000/images/` + src} className={styles['imgSize']} />
                    <Card.Body>
                        <Card.Title className={styles['custom-title']}>{title}</Card.Title>
                        <Card.Text className={styles['custom-text']}>
                            <h3>Ingredients</h3>
                            <ul className={styles['threeDots']}>
                                {
                                    desc.split('\n').slice(0, 3).map((ele, i) => (
                                        <li key={i}>{ele.slice(0, 10)}...</li>
                                    ))
                                }
                            </ul>
                            <h3>Process</h3>
                            <ol>
                                {
                                    process.split('\n').slice(0, 3).map((ele, i) => (
                                        <li key={i}> {ele.slice(0, 20)}... </li>
                                    ))
                                }
                            </ol>
                        </Card.Text>
                        <Link to={id}><Button variant="primary">Read More</Button></Link>
                    </Card.Body>
                </Card>
            </Link>
        </Col>
    );
}

export default Items;
