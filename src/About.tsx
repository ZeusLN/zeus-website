import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import appleAppStore from './images/apple-app-store.png';
import googlePlay from './images/google-play.png';
import androidDownload from './images/android-download.png';

function About() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bitcoin payments <p style={{ color: "#FFD93F" }}>your way</p></h1>
        <p className="App-subheader">
          About
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

export default About;
