import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from './Components/Search/Search';
import { Container, Col, Row, Card } from 'react-bootstrap';
import { useState } from 'react';

function App() {
    const [activeCards, setActiveCards] = useState(4);

    return (
        <div>
            <Container fluid>
                <Row>
                    <Col md={12 / activeCards}>
                        <Card className="search-box">
                            <Search
                                title="Switch Games"
                                url="https://api.sampleapis.com/switch/games"
                            />
                        </Card>
                    </Col>
                    <Col md={12 / activeCards}>
                        <Card className="search-box">
                            <Search
                                title="Coffee"
                                url="https://api.sampleapis.com/coffee/hot"
                            />
                        </Card>
                    </Col>
                    <Col md={12 / activeCards}>
                        <Card className="search-box">
                            <Search
                                title="Coding Resources"
                                url="https://api.sampleapis.com/codingresources/codingResources"
                            />
                        </Card>
                    </Col>
                    <Col md={12 / activeCards}>
                        <Card className="search-box">
                            <Search
                                title="Beers"
                                url="https://api.sampleapis.com/beers/ale"
                            />
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
