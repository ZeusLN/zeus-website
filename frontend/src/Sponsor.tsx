import React, { useState } from 'react';
import axios from 'axios';
import { Button, makeStyles } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Header from './Header';

export default function Sponsor() {
  const [donationError, setDonationError] = useState('');

  const [donationType, setDonationType] = useState('community');
  const [twitterHandle, setTwitterHandle] = useState('');

  const useStyles = makeStyles((theme) => ({
    mainButton: {
      opacity: 1,
      background: '#FFD93F',
      '&:hover': {
         cursor: 'pointer',
         backgroundColor: '#D6AB00'
      }
    }
  }));

  const handleInput = (event: any) => {
      setTwitterHandle(event.target.value);
  };

  const makeDonationCall = (handle: string) => {
      axios.post(`${process.env.NODE_ENV === 'development' ? '' : '/api'}/donations/makeDonation`, {
          handle: twitterHandle
      })
      .then((response: any) => {
          console.log(response);
          if (response.data && response.data.checkoutLink) {
              window.open(response.data.checkoutLink, '_blank');
          } else {
              setDonationError('Error communicating with BTCPay Server. Please try again later.');
          }
      })
      .catch(function (error) {
          setDonationError('Error communicating with BTCPay Server. Please try again later.');
      });
  };

  const classes = useStyles();

  return (
      <div className="App-basic">
        <Header hideNav />
        <div className="About">
          <header className="App-header">
              <div className="Donate">
                  <div className="Donation-types">
                      <button onClick={() => setDonationType('supporter')} className={donationType === 'supporter' ? 'Donation-type-highlighted' : 'Donation-type'}>
                          <h3>Supporter</h3>
                          <p className="amount">Any amount</p>
                          <p className="Donation-description">Make a donation and support the project</p>
                      </button>
                      <button onClick={() => setDonationType('community')} className={donationType === 'community' ? 'Donation-type-highlighted' : 'Donation-type'}>
                          <h3>Olympian</h3>
                          <p className="highlighted-amount"><span>1M</span> sats</p>
                          <p className="Donation-description">Display your Twitter profile photo on our About page</p>
                      </button>
                      <button onClick={() => setDonationType('corporate')} className={donationType === 'corporate' ? 'Donation-type-highlighted' : 'Donation-type'}>
                          <h3>Corporate</h3>
                          <p className="highlighted-amount"><span>100M</span> sats</p>
                          <p className="Donation-description">Link your organization's website on our About page</p>
                      </button>
                  </div>
                  {donationType === 'supporter' && <a href="https://pay.zeusln.app/" target="_blank" rel="noreferrer"><Button className={classes.mainButton}>Make donation</Button></a>}
                  {donationType === 'community' && <>
                      <p style={{ color: 'red' }}>{donationError}</p>
                      <div style={{ marginBottom: 20 }}>
                          <span className="twitter-handle">
                              @
                              <input style={{ padding: 10, backgroundColor: '#242930', color: '#2b74b4', borderWidth: 0, width: 128 }} onChange={handleInput} placeholder="Twitter handle" type="text" />
                          </span>
                      </div>
                      {twitterHandle && <Button
                          className={classes.mainButton}
                          onClick={() => makeDonationCall(twitterHandle)}
                      >
                          Make donation
                      </Button>}
                  </>}
                  {donationType === 'corporate' && <a href="mailto:zeusln@tutanota.com?subject=Corporate Donation" target="_blank" rel="noreferrer"><Button className={classes.mainButton}>Get in touch</Button></a>}
              </div>
          </header>
        </div>
      </div>
  );
}
