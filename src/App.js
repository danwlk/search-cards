import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from './Components/Search/Search';
import { Container, Col, Row, Card } from 'react-bootstrap';
import { useState } from 'react';

const data = [
    {
        id: 0,
        title: 'Switch Games',
        url: 'https://api.sampleapis.com/switch/games',
    },
    {
        id: 1,
        title: 'Coffee',
        url: 'https://api.sampleapis.com/coffee/hot',
    },
    {
        id: 2,
        title: 'Coding Resources',
        url: 'https://api.sampleapis.com/codingresources/codingResources',
    },
    {
        id: 3,
        title: 'Beers',
        url: 'https://api.sampleapis.com/beers/ale',
    },
];

function App() {
    const [activeCards, setActiveCards] = useState(4);
    const [hide, setHide] = useState([false, false, false, false]);

    const handleHide = (idx) => {
        setHide(
            hide.map((item, i) => {
                return i === idx ? true : item;
            })
        );
        setActiveCards((prev) => prev - 1);
    };

    const handleShow = (idx) => {
        setHide(
            hide.map((item, i) => {
                return i === idx ? false : item;
            })
        );
        setActiveCards((prev) => prev + 1);
    };

    return (
        <div>
            <Container fluid>
                <Row>
                    {data.map((item) => {
                        return (
                            !hide[item.id] && (
                                <Col md={12 / activeCards}>
                                    <Card className="search-box">
                                        <Search
                                            title={item.title}
                                            url={item.url}
                                            handleHide={() =>
                                                handleHide(item.id)
                                            }
                                        />
                                    </Card>
                                </Col>
                            )
                        );
                    })}
                </Row>
            </Container>

            <footer className="footer">
                {data.map((item) => {
                    return (
                        hide[item.id] && (
                            <button onClick={() => handleShow(item.id)}>
                                Show: {item.title}
                            </button>
                        )
                    );
                })}
            </footer>
        </div>
    );
}

export default App;
