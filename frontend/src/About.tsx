import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import { Button, makeStyles } from '@material-ui/core';
import LoadingButton from '@mui/lab/LoadingButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import logo from './images/zeus-logo.svg';

// social
import github from './images/github-alt.svg';
import telegram from './images/telegram-alt.svg';
import twitter from './images/twitter-alt.svg';

// implementations
import lnd from './images/implementations/lnd.webp';
import clightning from './images/implementations/c-lightning.webp';
import eclair from './images/implementations/eclair.png';

// integrations
import raspiblitz from './images/integrations/raspiblitz.png';
import btcpay from './images/integrations/btcpay.png';
import umbrel from './images/integrations/umbrel.jpg';
import mynode from './images/integrations/mynode.jpg';
import citadel from './images/integrations/citadel.webp';
import lnbits from './images/integrations/lnbits.jpg';
import nodl from './images/integrations/nodl.jpg';
import start9 from './images/integrations/start9.png';

// integrations
import mempool from './images/frens/mempool.jpg';
import amboss from './images/frens/amboss.jpg';

// top contributors
import shubhamkmr04 from './images/contributors/shubhamkmr04.jpg';
import gabidi from './images/contributors/gabidi.png';
import futurepaul from './images/contributors/futurepaul.jpg';
import fiatjaf from './images/contributors/fiatjaf.jpg';
import marytsahas from './images/contributors/marytsahas.png';
import deregs from './images/contributors/deregs.jpg';

// design contributors
import bitcoin_design from './images/design/bitcoin_design.jpg';
import stephenDeLorme from './images/design/stephenDeLorme.jpg';
import xo__Tiana from './images/design/xo__Tiana.jpg';
import gbks from './images/design/GBKS.jpeg';
import johnsBeharry from './images/design/johnsBeharry.jpg'

// top maintainers
import kaloudis from './images/maintainers/kaloudis.jpg';
import bosch from './images/maintainers/bosch.png';

import appleAppStore from './images/apple-app-store.png';
import googlePlay from './images/google-play.png';
import androidDownload from './images/android-download.png';

import * as config from './config.json';

const androidUrl = `https://zeusln.app/zeus-${config.latestVersion}.apk`;

interface donor {
  handle: string;
  imageUrl: string;
}

export default function About() {
  const [data, setData] = useState<null |  Array<donor>>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [makeDonation, toggleDonation] = useState(false);
  const [donationType, setDonationType] = useState('community');
  const [twitterHandle, setTwitterHandle] = useState('');

  const useStyles = makeStyles((theme) => ({
  mainButton: {
    opacity: 1,
    background: theme.palette.getContrastText(theme.palette.error.main),
    '&:hover': {
       cursor: 'pointer',
       backgroundColor: '#FFD93F'
    }
  }
}));

  useEffect(() => {
      setLoading(true);
      fetch(`${process.env.NODE_ENV === 'development' ? '' : '/api'}/sponsors/getCommunitySponsors`)
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
              setError(true);
          })
          .finally(() => {
              setLoading(false);
          })
  }, []);

  const handleInput = (event: any) => {
      setTwitterHandle(event.target.value);
  };

  const makeDonationCall = (handle: string) => {
      axios.post(`${process.env.NODE_ENV === 'development' ? '' : '/api'}/donations/makeDonation`, {
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

  if (data && data.length === 0 ) {
        donorDisplay.push(<p>No community sponsors yet. Be the first!</p>);
  } else if (data) {
      for (let donor of data) {
          donorDisplay.push(<div className="avatar"><a href={`https://twitter.com/${donor.handle}`} target="_blank" rel="noreferrer"><Avatar src={`${process.env.NODE_ENV === 'development' ? '' : '/api'}/twitter-images/${donor.handle}.jpg`} sx={{ width: 100, height: 100 }} /></a></div>);
      }
  }

  const implementationDisplay = (
    <div className="avatarDisplay">
        <div className="avatar"><a href={'https://github.com/LightningNetwork/lnd'} target="_blank" rel="noreferrer"><Avatar src={lnd} sx={{ width: 100, height: 100 }} /></a></div>
        <div className="avatar"><a href={'https://github.com/ElementsProject/lightning'} target="_blank" rel="noreferrer"><Avatar src={clightning} sx={{ width: 100, height: 100 }} /></a></div>
        <div className="avatar"><a href={'https://github.com/ACINQ/eclair'} target="_blank" rel="noreferrer"><Avatar src={eclair} sx={{ width: 100, height: 100 }} /></a></div>
    </div>
  );

  const integrationDisplay = (
    <div className="avatarDisplay">
        <div className="avatar"><a href={'https://github.com/rootzoll/raspiblitz'} target="_blank" rel="noreferrer"><Avatar src={raspiblitz} sx={{ width: 100, height: 100 }} /></a></div>
        <div className="avatar"><a href={'https://btcpayserver.org/'} target="_blank" rel="noreferrer"><Avatar src={btcpay} sx={{ width: 100, height: 100 }} /></a></div>
        <div className="avatar"><a href={'https://getumbrel.com/'} target="_blank" rel="noreferrer"><Avatar src={umbrel} sx={{ width: 100, height: 100 }} /></a></div>
        <div className="avatar"><a href={'https://mynodebtc.com/'} target="_blank" rel="noreferrer"><Avatar src={mynode} sx={{ width: 100, height: 100 }} /></a></div>
        <div className="avatar"><a href={'https://runcitadel.space/'} target="_blank" rel="noreferrer"><Avatar src={citadel} sx={{ width: 100, height: 100 }} /></a></div>
        <div className="avatar"><a href={'https://lnbits.com/'} target="_blank" rel="noreferrer"><Avatar src={lnbits} sx={{ width: 100, height: 100 }} /></a></div>
        <div className="avatar"><a href={'https://www.nodl.it/'} target="_blank" rel="noreferrer"><Avatar src={nodl} sx={{ width: 100, height: 100 }} /></a></div>
        <div className="avatar"><a href={'https://start9.com/'} target="_blank" rel="noreferrer"><Avatar src={start9} sx={{ width: 100, height: 100 }} /></a></div>
    </div>
  );

  const frensDisplay = (
    <div className="avatarDisplay">
        <div className="avatar"><a href={'https://mempool.space/'} target="_blank" rel="noreferrer"><Avatar src={mempool} sx={{ width: 100, height: 100 }} /></a></div>
        <div className="avatar"><a href={'https://amboss.space/'} target="_blank" rel="noreferrer"><Avatar src={amboss} sx={{ width: 100, height: 100 }} /></a></div>
    </div>
  );


  const contributorsDisplay = (
    <div className="avatarDisplay">
        <div className="avatar"><a href={'https://github.com/shubhamkmr04'} target="_blank" rel="noreferrer"><Avatar src={shubhamkmr04} sx={{ width: 100, height: 100 }} /></a></div>
        <div className="avatar"><a href={'https://github.com/gabidi'} target="_blank" rel="noreferrer"><Avatar src={gabidi} sx={{ width: 100, height: 100 }} /></a></div>
        <div className="avatar"><a href={'https://github.com/futurepaul'} target="_blank" rel="noreferrer"><Avatar src={futurepaul} sx={{ width: 100, height: 100 }} /></a></div>
        <div className="avatar"><a href={'https://github.com/fiatjaf'} target="_blank" rel="noreferrer"><Avatar src={fiatjaf} sx={{ width: 100, height: 100 }} /></a></div>
        <div className="avatar"><a href={'https://github.com/marytsahas'} target="_blank" rel="noreferrer"><Avatar src={marytsahas} sx={{ width: 100, height: 100 }} /></a></div>
        <div className="avatar"><a href={'https://github.com/deregs'} target="_blank" rel="noreferrer"><Avatar src={deregs} sx={{ width: 100, height: 100 }} /></a></div>
    </div>
  );

  const designDisplay = (
    <div className="avatarDisplay">
        <div className="avatar"><a href={'https://twitter.com/StephenDeLorme'} target="_blank" rel="noreferrer"><Avatar src={stephenDeLorme} sx={{ width: 100, height: 100 }} /></a></div>
        <div className="avatar"><a href={'https://twitter.com/xo__Tiana'} target="_blank" rel="noreferrer"><Avatar src={xo__Tiana} sx={{ width: 100, height: 100 }} /></a></div>
        <div className="avatar"><a href={'https://twitter.com/GBKS'} target="_blank" rel="noreferrer"><Avatar src={gbks} sx={{ width: 100, height: 100 }} /></a></div>
        <div className="avatar"><a href={'https://twitter.com/johnsBeharry'} target="_blank" rel="noreferrer"><Avatar src={johnsBeharry} sx={{ width: 100, height: 100 }} /></a></div>
        <div className="avatar"><a href={'https://twitter.com/bitcoin_design'} target="_blank" rel="noreferrer"><Avatar src={bitcoin_design} sx={{ width: 100, height: 100 }} /></a></div>
    </div>
  );


  const maintainersDisplay = (
    <div className="avatarDisplay">
        <div className="avatar"><a href={'https://github.com/kaloudis'} target="_blank" rel="noreferrer"><Avatar src={kaloudis} sx={{ width: 100, height: 100 }} /></a></div>
        <div className="avatar"><a href={'https://github.com/Bosch-0'} target="_blank" rel="noreferrer"><Avatar src={bosch} sx={{ width: 100, height: 100 }} /></a></div>
    </div>
  );

  const classes = useStyles();

  if (makeDonation) {
      return (
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
                        <div style={{ marginBottom: 20 }}>
                            <span className="twitter-handle">
                                @
                                <input style={{ padding: 10, color: '#2b74b4', borderWidth: 0, width: 128 }} onChange={handleInput} placeholder="Twitter handle" type="text" />
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
                    <div style={{ marginTop: 20 }}>
                        <Button className={classes.mainButton} onClick={() => toggleDonation(false)}>Go back</Button>
                    </div>
                </div>
            </header>
          </div>
      );
  }

  return (
    <div className="About">
      <header className="App-header">
        <p className="Zeus-intro">
            <img
              src={logo}
              height="110"
              className="d-inline-block align-top"
              alt="Zeus"
            />
            <p className="Zeus-intro-text">Zeus is a Bitcoin Lightning wallet that gives users complete control over how they make bitcoin payments.</p>
            <div className="social2">
              <a href="https://github.com/ZeusLN/zeus" target="_blank" rel="noreferrer">
                <img
                  src={github}
                  height="100"
                  className="d-inline-block align-top"
                  alt="GitHub"
                />
              </a>
              <a href="https://t.me/ZeusLN" target="_blank" rel="noreferrer">
                <img
                  src={telegram}
                  height="100"
                  className="d-inline-block align-top"
                  alt="Telegram"
                />
              </a>
              <a href="https://twitter.com/ZeusLN" target="_blank" rel="noreferrer">
                <img
                  src={twitter}
                  height="100"
                  className="d-inline-block align-top"
                  alt="Twitter"
                />
              </a>
            </div>
        </p>
        <p className="About-section">
            <h3>Community Sponsors ⚡❤️</h3>
            {loading && <LoadingButton loading={loading} sx={{ width: 250, height: 250 }} />}
            <div className="sectionContent">
                {!error ? donorDisplay.reverse() : <p style={{ color: '#ffcccb' }}>Error fetching community sponsors. Please check back later.</p>}
            </div>
            <div className="donateButton">
                <Button className={classes.mainButton} onClick={() => toggleDonation(true)}>Become a Community Sponsor</Button>
            </div>
        </p>
        <p className="About-section">
            <h3>Supported Lightning Implementations</h3>
            <div className="sectionContent">
                {implementationDisplay}
            </div>
        </p>
        <p className="About-section">
            <h3>Community Integrations 🔌</h3>
            <p className="About-text">You can connect Zeus to these platforms</p>
            <div className="sectionContent">
                {integrationDisplay}
            </div>
        </p>
        <p className="About-section">
            <h3>Friends and Integrated Services 🤜🤛</h3>
            <p className="About-text">You'll find these services integrated in Zeus today or in the near future</p>
            <div className="sectionContent">
                {frensDisplay}
            </div>
        </p>
        <p className="About-section">
            <h3>Branding and Design Contributors</h3>
            <div className="sectionContent">
                {designDisplay}
            </div>
        </p>
        <p className="About-section">
            <h3>Translators</h3>
            <p className="About-text">67 translators and counting...</p>
            <Button className={classes.mainButton} onClick={() => window.open('https://www.transifex.com/ZeusLN/zeus/', '_link')}>Transifex</Button>
        </p>
        <p className="About-section">
            <h3>Code Contributors</h3>
            <p className="About-text">Here are our top contributors on GitHub</p>
            <Button className={classes.mainButton} onClick={() => window.open('https://github.com/ZeusLN/zeus/graphs/contributors', '_link')}>GitHub</Button>
            <div className="sectionContent">
                {contributorsDisplay}
            </div>
        </p>
        <p className="About-section">
            <h3>Maintainers</h3>
            <p className="About-text">Zeus is an open-source, self-custody, Bitcoin wallet. Don’t trust us? You don’t have to.</p>
            <Button className={classes.mainButton} onClick={() => window.open('https://github.com/ZeusLN/zeus/graphs/contributors', '_link')}>GitHub</Button>
            <div className="sectionContent">
                {maintainersDisplay}
            </div>
        </p>

        <div className="appStores3">
          <a href="https://apps.apple.com/us/app/zeus-ln/id1456038895" target="_blank" rel="noreferrer">
            <img
              src={appleAppStore}
              width="240"
              className="d-inline-block align-top"
              alt="Apple App Store"
            />
          </a>
          <a href="https://play.google.com/store/apps/details?id=app.zeusln.zeus" target="_blank" rel="noreferrer">
            <img
              src={googlePlay}
              width="240"
              className="d-inline-block align-top"
              alt="Google Play"
            />
          </a>
          <a href={androidUrl} target="_blank" rel="noreferrer">
            <img
              src={androidDownload}
              width="240"
              className="d-inline-block align-top"
              alt="Android Download"
            />
          </a>
        </div>
      </header>
    </div>
  );
}
