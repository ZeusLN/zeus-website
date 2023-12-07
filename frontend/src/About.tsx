import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { Button, makeStyles } from '@material-ui/core';
import LoadingButton from '@mui/lab/LoadingButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Header from './Header';
import Footer from './Footer';

import logo from './images/zeus-logo.svg';

// social
import github from './images/github.svg';
import telegram from './images/telegram.svg';
import twitter from './images/twitter.svg';
import nostr from './images/nostr.png';

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
import alby from './images/integrations/alby.png';

// integrations
import mempool from './images/frens/mempool.jpg';
// import amboss from './images/frens/amboss.jpg';

// top contributors
import shubhamkmr04 from './images/contributors/shubhamkmr04.jpg';
import myxmaster from './images/contributors/myxmaster.jpg';
import gabidi from './images/contributors/gabidi.png';
import futurepaul from './images/contributors/futurepaul.jpg';
import fiatjaf from './images/contributors/fiatjaf.jpg';
import deregs from './images/contributors/deregs.jpg';
import pseudozach from './images/contributors/pseudozach.jpg';
import aussedatlo from './images/contributors/aussedatlo.jpg';
import Talej from './images/contributors/Talej.jpg';
import otech47 from './images/contributors/otech47.jpg';

// design contributors
import bosch from './images/maintainers/bosch.png';
import bitcoin_design from './images/design/bitcoin_design.jpg';
import stephenDeLorme from './images/design/stephenDeLorme.jpg';
import xo__Tiana from './images/design/xo__Tiana.jpg';
import gbks from './images/design/GBKS.jpeg';
import johnsBeharry from './images/design/johnsBeharry.jpg';

// top maintainers
import kaloudis from './images/maintainers/kaloudis.jpg';

import appleAppStore from './images/apple-app-store.png';
import googlePlay from './images/google-play.png';
import androidDownload from './images/android-download.png';

import config from './config.json';

const androidUrl = `/zeus-${config.latestVersion}.apk`;

interface donor {
    handle: string;
    type: string;
    imageUrl: string;
}

export default function About() {
    const [mortals, setMortals] = useState<null | Array<donor>>(null);
    const [gods, setGods] = useState<null | Array<donor>>(null);
    const [olympians, setOlympians] = useState<null | Array<donor>>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const useStyles = makeStyles((theme) => ({
        mainButton: {
            opacity: 1,
            background: '#FFA900',
            '&:hover': {
                cursor: 'pointer',
                backgroundColor: '#D6AB00'
            }
        }
    }));

    useEffect(() => {
        setLoading(true);
        fetch(
            `${
                process.env.NODE_ENV === 'development' ? '' : '/api'
            }/sponsors/v2/getSponsors`
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                setMortals(data.mortals);
                setGods(data.gods);
                setOlympians(data.olympians);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const olympianDisplay = [];
    const godDisplay = [];
    const mortalDisplay = [];

    if (olympians && olympians.length === 0) {
        olympianDisplay.push(<p>No Olympian sponsors yet. Be the first!</p>);
    } else if (olympians) {
        for (let donor of olympians) {
            olympianDisplay.push(
                <div className="avatar">
                    <a
                        href={
                            donor.type === 'Nostr'
                                ? `https://iris.to/${donor.handle}`
                                : `https://twitter.com/${donor.handle}`
                        }
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Avatar
                            src={`${
                                process.env.NODE_ENV === 'development'
                                    ? ''
                                    : '/api'
                            }${
                                donor.type === 'Nostr'
                                    ? '/nostr-images/'
                                    : '/twitter-images/'
                            }${donor.handle}.jpg`}
                            sx={{ width: 120, height: 120 }}
                        />
                    </a>
                </div>
            );
        }
    }

    if (gods && gods.length === 0) {
        godDisplay.push(<p>No god sponsors yet. Be the first!</p>);
    } else if (gods) {
        for (let donor of gods) {
            godDisplay.push(
                <div className="avatar">
                    <a
                        href={
                            donor.type === 'Nostr'
                                ? `https://iris.to/${donor.handle}`
                                : `https://twitter.com/${donor.handle}`
                        }
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Avatar
                            src={`${
                                process.env.NODE_ENV === 'development'
                                    ? ''
                                    : '/api'
                            }${
                                donor.type === 'Nostr'
                                    ? '/nostr-images/'
                                    : '/twitter-images/'
                            }${donor.handle}.jpg`}
                            sx={{ width: 100, height: 100 }}
                        />
                    </a>
                </div>
            );
        }
    }

    if (mortals && mortals.length === 0) {
        mortalDisplay.push(<p>No mortal sponsors yet. Be the first!</p>);
    } else if (mortals) {
        for (let donor of mortals) {
            mortalDisplay.push(
                <div className="avatar">
                    <a
                        href={
                            donor.type === 'Nostr'
                                ? `https://iris.to/${donor.handle}`
                                : `https://twitter.com/${donor.handle}`
                        }
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Avatar
                            src={`${
                                process.env.NODE_ENV === 'development'
                                    ? ''
                                    : '/api'
                            }${
                                donor.type === 'Nostr'
                                    ? '/nostr-images/'
                                    : '/twitter-images/'
                            }${donor.handle}.jpg`}
                            sx={{ width: 80, height: 80 }}
                        />
                    </a>
                </div>
            );
        }
    }

    const implementationDisplay = (
        <div className="avatarDisplay">
            <div className="avatar">
                <a
                    href={'https://github.com/LightningNetwork/lnd'}
                    target="_blank"
                    rel="noreferrer"
                >
                    <Avatar src={lnd} sx={{ width: 100, height: 100 }} />
                </a>
            </div>
            <div className="avatar">
                <a
                    href={'https://github.com/ElementsProject/lightning'}
                    target="_blank"
                    rel="noreferrer"
                >
                    <Avatar src={clightning} sx={{ width: 100, height: 100 }} />
                </a>
            </div>
            <div className="avatar">
                <a
                    href={'https://github.com/ACINQ/eclair'}
                    target="_blank"
                    rel="noreferrer"
                >
                    <Avatar src={eclair} sx={{ width: 100, height: 100 }} />
                </a>
            </div>
        </div>
    );

    const integrationDisplay = (
        <div className="avatarDisplay">
            <div className="avatar">
                <a
                    href={'https://github.com/rootzoll/raspiblitz'}
                    target="_blank"
                    rel="noreferrer"
                >
                    <Avatar src={raspiblitz} sx={{ width: 100, height: 100 }} />
                </a>
            </div>
            <div className="avatar">
                <a
                    href={'https://btcpayserver.org/'}
                    target="_blank"
                    rel="noreferrer"
                >
                    <Avatar src={btcpay} sx={{ width: 100, height: 100 }} />
                </a>
            </div>
            <div className="avatar">
                <a
                    href={'https://getumbrel.com/'}
                    target="_blank"
                    rel="noreferrer"
                >
                    <Avatar src={umbrel} sx={{ width: 100, height: 100 }} />
                </a>
            </div>
            <div className="avatar">
                <a
                    href={'https://mynodebtc.com/'}
                    target="_blank"
                    rel="noreferrer"
                >
                    <Avatar src={mynode} sx={{ width: 100, height: 100 }} />
                </a>
            </div>
            <div className="avatar">
                <a
                    href={'https://runcitadel.space/'}
                    target="_blank"
                    rel="noreferrer"
                >
                    <Avatar src={citadel} sx={{ width: 100, height: 100 }} />
                </a>
            </div>
            <div className="avatar">
                <a
                    href={'https://lnbits.com/'}
                    target="_blank"
                    rel="noreferrer"
                >
                    <Avatar src={lnbits} sx={{ width: 100, height: 100 }} />
                </a>
            </div>
            <div className="avatar">
                <a
                    href={'https://www.nodl.it/'}
                    target="_blank"
                    rel="noreferrer"
                >
                    <Avatar src={nodl} sx={{ width: 100, height: 100 }} />
                </a>
            </div>
            <div className="avatar">
                <a
                    href={'https://start9.com/'}
                    target="_blank"
                    rel="noreferrer"
                >
                    <Avatar src={start9} sx={{ width: 100, height: 100 }} />
                </a>
            </div>
            <div className="avatar">
                <a
                    href={'https://getalby.com/'}
                    target="_blank"
                    rel="noreferrer"
                >
                    <Avatar src={alby} sx={{ width: 100, height: 100 }} />
                </a>
            </div>
        </div>
    );

    // <div className="avatar">
    //     <a
    //         href={'https://amboss.space/'}
    //         target="_blank"
    //         rel="noreferrer"
    //     >
    //         <Avatar src={amboss} sx={{ width: 100, height: 100 }} />
    //     </a>
    // </div>
    const frensDisplay = (
        <div className="avatarDisplay">
            <div className="avatar">
                <a
                    href={'https://mempool.space/'}
                    target="_blank"
                    rel="noreferrer"
                >
                    <Avatar src={mempool} sx={{ width: 100, height: 100 }} />
                </a>
            </div>
        </div>
    );

    const contributorsDisplay = (
        <div className="avatarDisplay">
            <div className="avatar">
                <a
                    href={'https://github.com/shubhamkmr04'}
                    target="_blank"
                    rel="noreferrer"
                >
                    <Avatar
                        src={shubhamkmr04}
                        sx={{ width: 100, height: 100 }}
                    />
                </a>
            </div>
            <div className="avatar">
                <a
                    href={'https://github.com/myxmaster'}
                    target="_blank"
                    rel="noreferrer"
                >
                    <Avatar src={myxmaster} sx={{ width: 100, height: 100 }} />
                </a>
            </div>
            <div className="avatar">
                <a
                    href={'https://github.com/deregs'}
                    target="_blank"
                    rel="noreferrer"
                >
                    <Avatar src={deregs} sx={{ width: 100, height: 100 }} />
                </a>
            </div>
            <div className="avatar">
                <a
                    href={'https://github.com/pseudozach'}
                    target="_blank"
                    rel="noreferrer"
                >
                    <Avatar src={pseudozach} sx={{ width: 100, height: 100 }} />
                </a>
            </div>
            <div className="avatar">
                <a
                    href={'https://github.com/aussedatlo'}
                    target="_blank"
                    rel="noreferrer"
                >
                    <Avatar src={aussedatlo} sx={{ width: 100, height: 100 }} />
                </a>
            </div>
            <div className="avatar">
                <a
                    href={'https://github.com/gabidi'}
                    target="_blank"
                    rel="noreferrer"
                >
                    <Avatar src={gabidi} sx={{ width: 100, height: 100 }} />
                </a>
            </div>
            <div className="avatar">
                <a
                    href={'https://github.com/Talej'}
                    target="_blank"
                    rel="noreferrer"
                >
                    <Avatar src={Talej} sx={{ width: 100, height: 100 }} />
                </a>
            </div>
            <div className="avatar">
                <a
                    href={'https://github.com/otech47'}
                    target="_blank"
                    rel="noreferrer"
                >
                    <Avatar src={otech47} sx={{ width: 100, height: 100 }} />
                </a>
            </div>
            <div className="avatar">
                <a
                    href={'https://github.com/futurepaul'}
                    target="_blank"
                    rel="noreferrer"
                >
                    <Avatar src={futurepaul} sx={{ width: 100, height: 100 }} />
                </a>
            </div>
            <div className="avatar">
                <a
                    href={'https://github.com/fiatjaf'}
                    target="_blank"
                    rel="noreferrer"
                >
                    <Avatar src={fiatjaf} sx={{ width: 100, height: 100 }} />
                </a>
            </div>
        </div>
    );

    const designDisplay = (
        <div className="avatarDisplay">
            <div className="avatar">
                <a
                    href={'https://github.com/Bosch-0'}
                    target="_blank"
                    rel="noreferrer"
                >
                    <Avatar src={bosch} sx={{ width: 100, height: 100 }} />
                </a>
            </div>
            <div className="avatar">
                <a
                    href={'https://twitter.com/StephenDeLorme'}
                    target="_blank"
                    rel="noreferrer"
                >
                    <Avatar
                        src={stephenDeLorme}
                        sx={{ width: 100, height: 100 }}
                    />
                </a>
            </div>
            <div className="avatar">
                <a
                    href={'https://twitter.com/xo__Tiana'}
                    target="_blank"
                    rel="noreferrer"
                >
                    <Avatar src={xo__Tiana} sx={{ width: 100, height: 100 }} />
                </a>
            </div>
            <div className="avatar">
                <a
                    href={'https://twitter.com/GBKS'}
                    target="_blank"
                    rel="noreferrer"
                >
                    <Avatar src={gbks} sx={{ width: 100, height: 100 }} />
                </a>
            </div>
            <div className="avatar">
                <a
                    href={'https://twitter.com/johnsBeharry'}
                    target="_blank"
                    rel="noreferrer"
                >
                    <Avatar
                        src={johnsBeharry}
                        sx={{ width: 100, height: 100 }}
                    />
                </a>
            </div>
            <div className="avatar">
                <a
                    href={'https://twitter.com/bitcoin_design'}
                    target="_blank"
                    rel="noreferrer"
                >
                    <Avatar
                        src={bitcoin_design}
                        sx={{ width: 100, height: 100 }}
                    />
                </a>
            </div>
        </div>
    );

    const maintainersDisplay = (
        <div className="avatarDisplay">
            <div className="avatar">
                <a
                    href={'https://github.com/kaloudis'}
                    target="_blank"
                    rel="noreferrer"
                >
                    <Avatar src={kaloudis} sx={{ width: 100, height: 100 }} />
                </a>
            </div>
        </div>
    );

    const classes = useStyles();

    return (
        <div className="App">
            <Header />
            <div className="About">
                <header className="App-header">
                    <p className="Zeus-intro">
                        <img
                            src={logo}
                            height="110"
                            className="d-inline-block align-top"
                            alt="Zeus"
                        />
                        <p className="Zeus-intro-text">
                            ZEUS is a Bitcoin Lightning wallet that gives users
                            complete control over how they make bitcoin
                            payments.
                        </p>
                        <div className="social2">
                            <a
                                href="https://github.com/ZeusLN/zeus"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    src={github}
                                    height="70"
                                    className="d-inline-block align-top"
                                    alt="GitHub"
                                />
                            </a>
                            <a
                                href="https://t.me/ZeusLN"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    src={telegram}
                                    height="70"
                                    className="d-inline-block align-top"
                                    alt="Telegram"
                                />
                            </a>
                            <a
                                href="https://twitter.com/ZeusLN"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    src={twitter}
                                    height="70"
                                    className="d-inline-block align-top"
                                    alt="Twitter"
                                />
                            </a>
                            <a
                                href="https://primal.net/zeus"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    src={nostr}
                                    height="70"
                                    className="d-inline-block align-top"
                                    alt="Nostr"
                                />
                            </a>
                        </div>
                        <div className="donateButton">
                            <a href="sponsor">
                                <Button className={classes.mainButton}>
                                    Become a Community Sponsor
                                </Button>
                            </a>
                        </div>
                    </p>
                    <p className="About-section">
                        <h3 id="communitySponsors">Olympians</h3>
                        {loading && (
                            <LoadingButton
                                loading={loading}
                                sx={{ width: 250, height: 250 }}
                            />
                        )}
                        <div className="sectionContent">
                            {!error ? (
                                olympianDisplay.reverse()
                            ) : (
                                <p style={{ color: '#ffcccb' }}>
                                    Error fetching Olympian community sponsors.
                                    Please check back later.
                                </p>
                            )}
                        </div>
                    </p>
                    <p className="About-section">
                        <h3 id="communitySponsors">Gods</h3>
                        {loading && (
                            <LoadingButton
                                loading={loading}
                                sx={{ width: 250, height: 250 }}
                            />
                        )}
                        <div className="sectionContent">
                            {!error ? (
                                godDisplay.reverse()
                            ) : (
                                <p style={{ color: '#ffcccb' }}>
                                    Error fetching god community sponsors.
                                    Please check back later.
                                </p>
                            )}
                        </div>
                    </p>
                    <p className="About-section">
                        <h3 id="communitySponsors">Mortals</h3>
                        {loading && (
                            <LoadingButton
                                loading={loading}
                                sx={{ width: 250, height: 250 }}
                            />
                        )}
                        <div className="sectionContent">
                            {!error ? (
                                mortalDisplay.reverse()
                            ) : (
                                <p style={{ color: '#ffcccb' }}>
                                    Error fetching mortal community sponsors.
                                    Please check back later.
                                </p>
                            )}
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
                        <p className="About-text">
                            You can connect ZEUS to these platforms
                        </p>
                        <div className="sectionContent">
                            {integrationDisplay}
                        </div>
                    </p>
                    <p className="About-section">
                        <h3>Integrated Services</h3>
                        <p className="About-text">
                            You'll find these services integrated in ZEUS
                        </p>
                        <div className="sectionContent">{frensDisplay}</div>
                    </p>
                    <p className="About-section">
                        <h3>Branding and Design Contributors</h3>
                        <div className="sectionContent">{designDisplay}</div>
                    </p>
                    <p className="About-section">
                        <h3>Translators</h3>
                        <p className="About-text">
                            71 translators and counting...
                        </p>
                        <Button
                            className={classes.mainButton}
                            onClick={() =>
                                window.open(
                                    'https://www.transifex.com/ZeusLN/zeus/',
                                    '_link'
                                )
                            }
                        >
                            Transifex
                        </Button>
                    </p>
                    <p className="About-section">
                        <h3>Code Contributors</h3>
                        <p className="About-text">
                            Here are our top contributors on GitHub
                        </p>
                        <Button
                            className={classes.mainButton}
                            onClick={() =>
                                window.open(
                                    'https://github.com/ZeusLN/zeus/graphs/contributors',
                                    '_link'
                                )
                            }
                        >
                            GitHub
                        </Button>
                        <div className="sectionContent">
                            {contributorsDisplay}
                        </div>
                    </p>
                    <p className="About-section">
                        <h3>Maintainers</h3>
                        <p className="About-text">
                            ZEUS is an open-source, self-custody, Bitcoin
                            wallet. Don’t trust us? You don’t have to.
                        </p>
                        <Button
                            className={classes.mainButton}
                            onClick={() =>
                                window.open(
                                    'https://github.com/ZeusLN/zeus/graphs/contributors',
                                    '_link'
                                )
                            }
                        >
                            GitHub
                        </Button>
                        <div className="sectionContent">
                            {maintainersDisplay}
                        </div>
                    </p>

                    <div className="appStores3">
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
                    </div>
                </header>
            </div>
            <Footer />
        </div>
    );
}
