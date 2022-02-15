import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import appleAppStore from './images/apple-app-store.png';
import googlePlay from './images/google-play.png';
import androidDownload from './images/android-download.png';

interface donor {
  handle: string;
  imageUrl: string;
}

export default function About() {
  const [data, setData] = useState<null |  Array<donor>>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [makeDonation, toggleDonation] = useState(false);
  const [donationType, setDonationType] = useState('community');
  const [twitterHandle, setTwitterHandle] = useState('');

  useEffect(() => {
      setLoading(true);
      fetch('/sponsors/getCommunitySponsors')
          .then(response => {
              if (response.ok) {
                return response.json();
              }
              throw response;
          })
          .then(data => {
              setData(data);
          })
          .catch(error => {
              console.error("Error fetching data: ", error);
              setError(error.toString());
          })
          .finally(() => {
              setLoading(false);
          })
  }, []);

  const handleInput = (event: any) => {
      setTwitterHandle(event.target.value);
  };

  const makeDonationCall = (handle: string) => {
      axios.post('/donations/makeDonation', {
          handle: twitterHandle
      })
      .then((response: any) => {
          console.log(response);
          window.open(response.data.checkoutLink, '_blank');
      })
      .catch(function (error) {
        // TODO handle error
        console.log(error);
      });
  };

  const donorDisplay = [];
  if (data) {
      for (let donor of data) {
          donorDisplay.push(<div className="donor"><a href={`https://twitter.com/${donor.handle}`} target="_blank" rel="noreferrer"><Avatar src={`http://localhost:1337/twitter-images/${donor.handle}.jpg`} sx={{ width: 100, height: 100 }} /></a></div>);
      }
  }

  if (makeDonation) {
      return (
          <div className="App">
            <header className="App-header">
                <div className="Donate">
                    <div className="Donation-types">
                        <button onClick={() => setDonationType('supporter')} className={donationType === 'supporter' ? 'Donation-type-highlighted' : 'Donation-type'}>
                            <h3>Supporter</h3>
                            <p className="amount">Any amount</p>
                            <p>Make a donation and support the project</p>
                        </button>
                        <button onClick={() => setDonationType('community')} className={donationType === 'community' ? 'Donation-type-highlighted' : 'Donation-type'}>
                            <h3>Community Sponsor</h3>
                            <p className="amount">1M sats</p>
                            <p>Display your Twitter profile photo on our About page</p>
                        </button>
                        <button onClick={() => setDonationType('corporate')} className={donationType === 'corporate' ? 'Donation-type-highlighted' : 'Donation-type'}>
                            <h3>Corporate</h3>
                            <p className="amount">100M sats</p>
                            <p>Link your organization's website on our About page</p>
                        </button>
                    </div>
                    {donationType === 'supporter' && <a href="https://pay.zeusln.app/" target="_blank" rel="noreferrer"><Button variant="contained" size="large" sx={{ backgroundColor: '#FFD93F' }}>Make donation</Button></a>}
                    {donationType === 'community' && <>
                        <div style={{ marginBottom: 20 }}>
                            <span className="twitter-handle">
                                @
                                <input style={{ padding: 10, color: '#2b74b4', borderWidth: 0, width: 128 }} onChange={handleInput} placeholder="Twitter handle" type="text" />
                            </span>
                        </div>
                        {twitterHandle && <Button
                            variant="contained"
                            size="large"
                            sx={{ backgroundColor: '#FFD93F', }}
                            onClick={() => makeDonationCall(twitterHandle)}
                        >
                            Make donation
                        </Button>}
                    </>}
                    {donationType === 'corporate' && <a href="mailto:zeusln@tutanota.com?subject=Corporate Donation" target="_blank" rel="noreferrer"><Button variant="contained" size="large" sx={{ backgroundColor: '#FFD93F' }}>Get in touch</Button></a>}
                    <div style={{ marginTop: 20 }}>
                        <Button variant="contained" size="large" sx={{ backgroundColor: '#FFD93F' }} onClick={() => toggleDonation(false)}>Go back</Button>
                    </div>
                </div>
            </header>
          </div>
      );
  }

  return (
    <div className="App">
      <header className="App-header">
        <p className="App-donors">
            <h3>Community Sponsors ⚡❤️</h3>
            <p style={{ color: 'red' }}>{error}</p>
            {loading && <LoadingButton loading={loading} sx={{ width: 250, height: 250 }} />}
            <div className="communitySponsors">
                {donorDisplay}
            </div>
            <div className="donateButton">
                <Button variant="contained" size="large" sx={{ backgroundColor: '#FFD93F' }} onClick={() => toggleDonation(true)}>Become a Community Sponsor</Button>
            </div>
        </p>
        <div className="appStores3">
          <img
            src={appleAppStore}
            width="300"
            className="d-inline-block align-top"
            alt="Apple App Store"
          />
          <img
            src={googlePlay}
            width="300"
            className="d-inline-block align-top"
            alt="Google Play"
          />
          <img
            src={androidDownload}
            width="300"
            className="d-inline-block align-top"
            alt="Android Download"
          />
        </div>
      </header>
    </div>
  );
}
