import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
      setLoading(true);
      fetch('https://mempool.space/api/v1/donations')
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
              setError(error);
          })
          .finally(() => {
              setLoading(false);
          })
  }, []);

  const donorDisplay = [];
  if (data) {
      for (let donor of data) {
          donorDisplay.push(<div className="donor"><a href={`https://twitter.com/${donor.handle}`} target="_blank" rel="noreferrer"><Avatar src={donor.imageUrl} sx={{ width: 100, height: 100 }} /></a></div>);
      }
  }

  if (makeDonation) {
      return (
          <div className="App">
            <header className="App-header">
                <Button variant="contained" size="large" sx={{ backgroundColor: '#FFD93F' }} onClick={() => toggleDonation(false)}>Go back</Button>
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
        <div className="appStores">
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
