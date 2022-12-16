import React from 'react';
import { Grid } from '@mui/material';

import Header from './Header';
import Footer from './Footer';

import appleAppStore from './images/apple-app-store.png';
import googlePlay from './images/google-play.png';
import androidDownload from './images/android-download.png';

import app1 from './images/app1.png';
import app2 from './images/app2.png';
import app3 from './images/app3.png';

import zeusLogo from './images/Zeus.svg';

import map from './images/map.png';

import config from './config.json';

const androidUrl = `/zeus-${config.latestVersion}.apk`;
const signatureUrl = `/zeus-${config.latestVersion}-signature.txt`;

const AppStores = ({ signatures = false }: { signatures?: boolean }) => (
    <>
        <a
            href="https://apps.apple.com/us/app/zeus-ln/id1456038895"
            target="_blank"
            rel="noreferrer"
        >
            <img
                src={appleAppStore}
                width="240"
                className="d-inline-block align-top"
                alt="Apple App Store"
            />
        </a>
        <a
            href="https://play.google.com/store/apps/details?id=app.zeusln.zeus"
            target="_blank"
            rel="noreferrer"
        >
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
        {signatures && (
            <>
                <p className="downloadDetails">
                    Latest release: {config.latestVersion}
                </p>
                <p className="downloadDetails">
                    <a href={signatureUrl}>Developer Signature</a> |{' '}
                    <a href="/PGP.txt">PGP key</a>
                </p>
            </>
        )}
    </>
);

function Home() {
    return (
        <div className="App">
            <Header />
            <div className="Home">
                <div className="Home-section1">
                    <h2>
                        <p className="highlighted-text">
                            Bitcoin payments <span>your way</span>
                        </p>
                    </h2>
                    <p className="App-subheader">
                        Zeus is an open-source, non-custodial Bitcoin wallet
                        that gives you full control over how you make payments.
                    </p>
                    <div className="appStores">
                        <AppStores signatures />
                    </div>

                    <div className="appScreenshots">
                        <Grid container spacing={1} columns={16}>
                            <Grid item md={6}>
                                <div className="left">
                                    <img
                                        src={app2}
                                        width="300"
                                        className="d-inline-block align-top"
                                        alt="Zeus screenshot #1"
                                    />
                                </div>
                            </Grid>
                            <Grid item md={8}>
                                <div className="right">
                                    <h3>
                                        <p className="highlighted-text">
                                            Payments <span>made simple</span>
                                        </p>
                                    </h3>
                                    <p>
                                        Zeus offers the easiest way to instantly
                                        send and receive bitcoin.
                                    </p>
                                </div>
                            </Grid>
                        </Grid>

                        <Grid container spacing={1} columns={16}>
                            <Grid item md={8}>
                                <div className="right">
                                    <h3>
                                        <p className="highlighted-text">
                                            Payments you <span>control</span>
                                        </p>
                                    </h3>
                                    <p>
                                        Controlling and managing your Lightning
                                        node channels has never been easier.
                                    </p>
                                </div>
                            </Grid>
                            <Grid item md={6}>
                                <div className="left">
                                    <img
                                        src={app3}
                                        width="300"
                                        className="d-inline-block align-top"
                                        alt="Zeus screenshot #2"
                                    />
                                </div>
                            </Grid>
                        </Grid>

                        <Grid container spacing={1} columns={8}>
                            <Grid item md={4}>
                                <div className="left">
                                    <img
                                        src={app1}
                                        width="300"
                                        className="d-inline-block align-top"
                                        alt="Zeus screenshot #3"
                                    />
                                </div>
                            </Grid>
                            <Grid item md={4}>
                                <div className="right">
                                    <h3>
                                        <p className="highlighted-text">
                                            A bitcoin experience{' '}
                                            <span>fit for the gods</span>
                                        </p>
                                    </h3>
                                    <p>
                                        Feature-rich, powerful, yet simple to
                                        use.
                                    </p>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    <h2>
                        <p className="highlighted-text">
                            Connect from <span>anywhere</span>
                        </p>
                    </h2>
                    <p className="App-subheader">
                        Zeus connects to your Lightning node and lets you manage
                        it anywhere you go.
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
                <div className="Home-section4">
                    <img
                        src={zeusLogo}
                        style={{
                            width: '100%',
                            maxWidth: '500px'
                        }}
                        className="d-inline-block align-top"
                        alt="Zeus mascot"
                    />
                </div>
                <div className="Home-section3">
                    <h2>
                        <p className="highlighted-text">
                            <span>Lightning</span> in the palm of your hand
                        </p>
                    </h2>
                    <div className="appStores2">
                        <AppStores />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
