import React from 'react';

import appleAppStore from './images/apple-app-store.png';
import googlePlay from './images/google-play.png';
import androidDownload from './images/android-download.png';

import app1 from './images/app1.svg';
import app2 from './images/app2.svg';
import app3 from './images/app3.svg';

import map from './images/map.png';

const AppStores = () => (
  <>
    <a href="https://apps.apple.com/us/app/zeus-ln/id1456038895">
      <img
        src={appleAppStore}
        width="300"
        className="d-inline-block align-top"
        alt="Apple App Store"
      />
    </a>
    <a href="https://play.google.com/store/apps/details?id=app.zeusln.zeus">
      <img
        src={googlePlay}
        width="300"
        className="d-inline-block align-top"
        alt="Google Play"
      />
    </a>
    <a href="https://zeusln.app/zeus-v0.5.2.apk">
      <img
        src={androidDownload}
        width="300"
        className="d-inline-block align-top"
        alt="Android Download"
      />
    </a>
    <p className="downloadDetails"><a href="https://zeusln.app/zeus-v0.5.2-signatures.txt">Developer Signature</a> | <a href="https://zeusln.app/PGP.txt">PGP key</a></p>
  </>
);

function Home() {
  return (
    <div className="Home">
      <div className="Home-section1">
        <h1>Bitcoin payments <p style={{ color: "#FFD93F" }}>your way</p></h1>
        <p className="App-subheader">
          Zeus is an open-source, non-custodial Bitcoin wallet that gives you full control over how you make payments.
        </p>
        <div className="appStores">
          <AppStores />
        </div>
        <div className="appScreenshots">
          <img
            src={app1}
            width="300"
            className="d-inline-block align-top"
            alt="Zeus screenshot #1"
          />
          <img
            src={app2}
            width="300"
            className="d-inline-block align-top"
            alt="Zeus screenshot #2"
          />
          <img
            src={app3}
            width="300"
            className="d-inline-block align-top"
            alt="Zeus screenshot #3"
          />
        </div>
        <h1>Connect from <p style={{ color: "#FFD93F" }}>anywhere</p></h1>
        <p className="App-subheader">
          Zeus lets you connect to, and manage your own Lightning node no matter where you are.
        </p>
      </div>
      <div className="Home-section2">
        <img
          src={map}
          width="100%"
          className="d-inline-block align-top"
          alt="Zeus connects remotely"
        />
      </div>
      <div className="Home-section3">
        <h2>Put <p style={{ color: "#FFD93F" }}>lightning</p> in the palm of your hand</h2>
        <div className="appStores2">
          <AppStores />
        </div>
      </div>
    </div>
  );
}

export default Home;
