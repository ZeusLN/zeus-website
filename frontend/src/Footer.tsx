import React from 'react';
import logo from './images/zeus-logo.svg';
import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import github from './images/github.svg';
import telegram from './images/telegram.svg';
import twitter from './images/twitter.svg';
import nostr from './images/nostr.png';

function Footer() {
    return (
        <div className="App-footer">
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Link to="/">
                        <Navbar.Brand>
                            <img
                                src={logo}
                                width="300"
                                height="55"
                                className="d-inline-block align-top"
                                alt="ZEUS"
                                style={{ marginBottom: 30 }}
                            />
                        </Navbar.Brand>
                    </Link>
                    <div className="social">
                        <a
                            href="https://github.com/ZeusLN/zeus"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img
                                src={github}
                                height="55"
                                className="d-inline-block align-top"
                                alt="GitHub"
                            />
                        </a>
                        <a
                            href="https://t.me/ZeusLN"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img
                                src={telegram}
                                height="55"
                                className="d-inline-block align-top"
                                alt="Telegram"
                            />
                        </a>
                        <a
                            href="https://twitter.com/ZeusLN"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img
                                src={twitter}
                                height="55"
                                className="d-inline-block align-top"
                                alt="Twitter"
                            />
                        </a>
                        <a
                            href="https://primal.net/zeus"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img
                                src={nostr}
                                height="55"
                                className="d-inline-block align-top"
                                alt="Nostr"
                            />
                        </a>
                    </div>
                </Container>
            </Navbar>
        </div>
    );
}

export default Footer;
