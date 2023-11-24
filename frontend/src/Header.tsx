import React from 'react';
import logo from './images/zeus-logo.svg';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Button, makeStyles } from '@material-ui/core';

import { Link } from 'react-router-dom';

function Header(props: any) {
    const useStyles = makeStyles((theme) => ({
        downloadButton: {
            opacity: 1,
            background: '#FFA900',
            top: -5,
            paddingLeft: 15,
            paddingRight: 15,
            '&:hover': {
                cursor: 'pointer',
                backgroundColor: '#D6AB00'
            }
        }
    }));

    const classes = useStyles();

    return (
        <Navbar bg="transparent" variant="dark" expand="lg">
            <Container>
                <Link to="/">
                    <Navbar.Brand>
                        <img
                            src={logo}
                            height="75"
                            className="d-inline-block align-top"
                            alt="ZEUS"
                            style={{ margin: 10 }}
                        />
                    </Navbar.Brand>
                </Link>
                {!props.hideNav && (
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                )}
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto"></Nav>
                    {!props.hideNav && (
                        <Nav>
                            <Nav.Link
                                href="https://store.zeusln.app"
                                target="_blank"
                            >
                                Store
                            </Nav.Link>
                            <Nav.Link
                                href="https://docs.zeusln.app"
                                target="_blank"
                            >
                                Documentation
                            </Nav.Link>
                            <Link to="/about">
                                <Nav.Link href="#about">About</Nav.Link>
                            </Link>
                            <Link to="/download">
                                <Nav.Link href="#download">
                                    <Button className={classes.downloadButton}>
                                        Download
                                    </Button>
                                </Nav.Link>
                            </Link>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
