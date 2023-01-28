import React, { useState } from 'react';
import axios from 'axios';
import { Button, Chip, makeStyles } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Header from './Header';

export default function Sponsor() {
    const [donationError, setDonationError] = useState('');

    const [donationType, setDonationType] = useState('god');
    const [handle, setHandle] = useState('');
    const [handleType, setHandleType] = useState('Twitter');
    const [amount, setAmount] = useState('1000000');

    const useStyles = makeStyles((theme) => ({
        mainButton: {
            opacity: 1,
            width: 200,
            height: 60,
            borderRadius: 20,
            margin: 10,
            background: '#FFD93F',
            '&:hover': {
                cursor: 'pointer',
                backgroundColor: '#D6AB00'
            }
        },
        secondaryButton: {
            opacity: 1,
            width: 200,
            height: 60,
            borderRadius: 20,
            margin: 10,
            background: '#616468',
            color: '#fff',
            '&:hover': {
                cursor: 'pointer',
                backgroundColor: '#fff',
                color: '#000'
            }
        }
    }));

    const handleAmountInput = (event: any) => {
        const amount = event.target.value;
        setAmount(amount);
        if (isNaN(amount)) {
            setDonationError('Invalid amount');
            return;
        }
        if (!Number.isInteger(Number(amount))) {
            setDonationError('Whole sats only. Sorry.');
            return;
        }
        if (Number(amount) < 10000) {
            setDonationError(
                'Amount too small to be tracked. Please consider making an anonymous donation.'
            );
            return;
        }
        if (Number(amount) >= 10000 && Number(amount) < 100000) {
            setDonationType('');
            setDonationError('');
            return;
        }
        setDonationError('');
        if (Number(amount) >= 100000 && Number(amount) < 1000000) {
            setDonationType('mortal');
            setDonationError('');
            return;
        }
        if (Number(amount) >= 1000000 && Number(amount) < 100000000) {
            setDonationType('god');
            setDonationError('');
            return;
        }
        if (Number(amount) >= 100000000) {
            setDonationType('olympian');
            setDonationError('');
            return;
        }
    };

    const handleInput = (event: any) => setHandle(event.target.value);

    const makeDonationCall = (
        handle: string,
        handleType: string,
        amount: string
    ) => {
        axios
            .post(
                `${
                    process.env.NODE_ENV === 'development' ? '' : '/api'
                }/donations/makeDonation`,
                {
                    handle,
                    handleType,
                    amount
                }
            )
            .then((response: any) => {
                if (response.data && response.data.checkoutLink) {
                    window.open(response.data.checkoutLink, '_self');
                } else {
                    setDonationError(
                        'Error communicating with BTCPay Server. Please try again later.'
                    );
                }
            })
            .catch(function (error) {
                setDonationError(
                    'Error communicating with BTCPay Server. Please try again later.'
                );
            });
    };

    const classes = useStyles();

    return (
        <div className="App-basic">
            <Header hideNav />
            <div className="About">
                <header className="App-header">
                    <h5>Sponsor Zeus</h5>
                    <div className="Donate">
                        <div className="Donation-types">
                            <button
                                onClick={() => {
                                    setDonationError('');
                                    setDonationType('mortal');
                                    setAmount('100000');
                                }}
                                className={
                                    donationType === 'mortal'
                                        ? 'Donation-type-highlighted'
                                        : 'Donation-type'
                                }
                            >
                                <h3>Mortal</h3>
                                {false && (
                                    <p className="Donation-description">
                                        Donate and supoprt further development
                                        of Zeus
                                    </p>
                                )}
                                <p className="highlighted-amount">
                                    <span>100K</span>+ sats
                                </p>
                            </button>
                            <button
                                onClick={() => {
                                    setDonationError('');
                                    setDonationType('god');
                                    setAmount('1000000');
                                }}
                                className={
                                    donationType === 'god'
                                        ? 'Donation-type-highlighted'
                                        : 'Donation-type'
                                }
                            >
                                <h3>God</h3>
                                {false && (
                                    <p className="Donation-description">
                                        Have your Twitter profile shown on our
                                        about page
                                    </p>
                                )}
                                <p className="highlighted-amount">
                                    <span>1M</span>+ sats
                                </p>
                            </button>
                            <button
                                onClick={() => {
                                    setDonationError('');
                                    setDonationType('olympian');
                                    setAmount('100000000');
                                }}
                                className={
                                    donationType === 'olympian'
                                        ? 'Donation-type-highlighted'
                                        : 'Donation-type'
                                }
                            >
                                <h3>Olympian</h3>
                                {false && (
                                    <p className="Donation-description">
                                        Link your organization's website on our
                                        About page
                                    </p>
                                )}
                                <p className="highlighted-amount">
                                    <span>1</span>+ BTC
                                </p>
                            </button>
                        </div>
                        {donationType === 'supporter' && (
                            <a
                                href="https://pay.zeusln.app/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Button className={classes.mainButton}>
                                    Make donation
                                </Button>
                            </a>
                        )}
                        <>
                            <p style={{ color: 'red' }}>{donationError}</p>
                            <div style={{ marginBottom: 20 }}>
                                <span
                                    className="amount"
                                    style={{
                                        padding: 10,
                                        backgroundColor: '#292a2d',
                                        fontSize: 25,
                                        borderRadius: 13
                                    }}
                                >
                                    <input
                                        style={{
                                            backgroundColor: '#616468',
                                            color: '#FFD93F',
                                            borderWidth: 0,
                                            width: 220,
                                            borderRadius: 13,
                                            textAlign: 'center',
                                            marginRight: 10
                                        }}
                                        value={amount}
                                        onChange={handleAmountInput}
                                        placeholder="Amount (sats)"
                                        type="text"
                                    />
                                    sats
                                </span>
                            </div>
                            <div style={{ marginBottom: 15 }}>
                                <Chip
                                    style={{
                                        margin: 5,
                                        color:
                                            handleType === 'Twitter'
                                                ? undefined
                                                : '#e0e0e0'
                                    }}
                                    onClick={() => setHandleType('Twitter')}
                                    label="Twitter"
                                    variant={
                                        handleType === 'Twitter'
                                            ? undefined
                                            : 'outlined'
                                    }
                                />
                                <Chip
                                    style={{
                                        margin: 5,
                                        color:
                                            handleType === 'Nostr'
                                                ? undefined
                                                : '#e0e0e0'
                                    }}
                                    onClick={() => setHandleType('Nostr')}
                                    label="Nostr"
                                    variant={
                                        handleType === 'Nostr'
                                            ? undefined
                                            : 'outlined'
                                    }
                                />
                            </div>
                            {handleType === 'Nostr' && (
                                <div style={{ marginBottom: 20 }}>
                                    <span
                                        className="nostr-handle"
                                        style={{
                                            padding: 10,
                                            backgroundColor: '#292a2d',
                                            fontSize: 25,
                                            borderRadius: 13
                                        }}
                                    >
                                        <input
                                            style={{
                                                marginLeft: 5,
                                                paddingLeft: 10,
                                                backgroundColor: '#616468',
                                                color: '#fff',
                                                borderWidth: 0,
                                                width: 280,
                                                borderRadius: 13
                                            }}
                                            onChange={handleInput}
                                            placeholder="npub1xnf02f60r9v0e5kty33a404dm79zr7z2eepyrk5gsq3m7pwvsz2sazlpr5"
                                            type="text"
                                            value={handle}
                                        />
                                    </span>
                                </div>
                            )}
                            {handleType === 'Twitter' && (
                                <div style={{ marginBottom: 20 }}>
                                    <span
                                        className="twitter-handle"
                                        style={{
                                            padding: 10,
                                            backgroundColor: '#292a2d',
                                            fontSize: 25,
                                            borderRadius: 13
                                        }}
                                    >
                                        @
                                        <input
                                            style={{
                                                marginLeft: 5,
                                                paddingLeft: 10,
                                                backgroundColor: '#616468',
                                                color: '#fff',
                                                borderWidth: 0,
                                                width: 280,
                                                borderRadius: 13
                                            }}
                                            onChange={handleInput}
                                            placeholder="Twitter handle"
                                            type="text"
                                            value={handle}
                                        />
                                    </span>
                                </div>
                            )}
                            {handle && (
                                <Button
                                    className={classes.mainButton}
                                    onClick={() =>
                                        makeDonationCall(
                                            handle,
                                            handleType,
                                            amount
                                        )
                                    }
                                >
                                    Make donation
                                </Button>
                            )}
                            <div>or</div>
                            <a
                                href="https://pay.zeusln.app"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Button className={classes.secondaryButton}>
                                    Donate anonymously
                                </Button>
                            </a>
                        </>
                    </div>
                </header>
            </div>
        </div>
    );
}
