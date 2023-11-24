import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Header from './Header';
import Footer from './Footer';

import appleAppStore from './images/apple-app-store.png';
import googlePlay from './images/google-play.png';
import androidDownload from './images/android-download.png';

import fdroid from './images/fdroid.png';

import config from './config.json';

const androidUrl = `/zeus-${config.latestVersion}-universal.apk`;
const manifestUrl = `/manifest-${config.latestVersion}.txt`;

const androidUrlBeta = `/zeus-${config.latestBetaVersion}-universal.apk`;
const manifestUrlBeta = `/manifest-${config.latestBetaVersion}.txt`;

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
                    <a href={manifestUrl}>Manifest</a> |{' '}
                    <a href={manifestUrlBeta}>Beta Manifest</a> |{' '}
                    <a href="/PGP.txt">PGP key</a>
                </p>
                <p className="downloadDetails">
                    Latest beta: {config.latestBetaVersion}
                </p>
                <p className="downloadDetails">
                    <a href={androidUrlBeta}>APK</a> |{' '}
                    <a href={manifestUrlBeta}>Manifest</a> |{' '}
                    <a href="/PGP.txt">PGP key</a> |{' '}
                    <a href="https://testflight.apple.com/join/vVnODWoi">iOS TestFlight</a>
                </p>
            </>
        )}
    </>
);

export default function Download() {
    return (
        <div className="App">
            <Header />
            <div className="About">
                <header className="App-header">
                    <h3>Standard Downloads</h3>
                    <div className="appStores">
                        <AppStores signatures />
                    </div>

                    <h3>F-Droid</h3>
                    <div className="fdroid">
                        <p>
                            Scan and open the QR code on your device with
                            F-Droid installed
                        </p>
                        <section
                            style={{
                                maxWidth: '480px',
                                margin: '0 auto'
                            }}
                        >
                            <a href="https://fdroid.zeusln.app?fingerprint=5E52B63C8A9270B4834DEC159745CE3DC6288E09297C5E4907C683AC412FE7F5">
                                <img
                                    src={fdroid}
                                    style={{
                                        width: '100%',
                                        margin: '15px 0 30px'
                                    }}
                                    className="d-inline-block align-top"
                                    alt="ZEUS F-Droid Repo QR"
                                />
                            </a>
                        </section>

                        <h6>Manual instructions</h6>

                        <p>
                            Open F-Droid and navigate to Settings {'>'}{' '}
                            Repositories {'>'} +
                        </p>

                        <b>Repository address</b>
                        <p>
                            <code>https://fdroid.zeusln.app</code>
                        </p>

                        <b>Fingerprint</b>
                        <p>
                            <code>
                                5E52B63C8A9270B4834DEC159745CE3DC6288E09297C5E4907C683AC412FE7F5
                            </code>
                        </p>
                    </div>
                </header>
            </div>
            <Footer />
        </div>
    );
}
