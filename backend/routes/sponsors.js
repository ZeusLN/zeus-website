import { Router } from 'express';
const router = new Router();

const MOCK_SPONSORS = [
    {
        handle: 'evankaloudis',
        imageUrl:
            'https://pbs.twimg.com/profile_images/1437955120726220800/85FwH_SC_400x400.jpg'
    },
    {
        handle: '_bosch_',
        imageUrl:
            'https://pbs.twimg.com/profile_images/1455754605174792197/2vZp2zfE_400x400.jpg'
    },
    {
        handle: 'GBKS',
        imageUrl:
            'https://pbs.twimg.com/profile_images/480862734633156609/IRuw4KRU_400x400.jpeg'
    },
    {
        handle: 'StephenDeLorme',
        imageUrl:
            'https://pbs.twimg.com/profile_images/1389599658176098304/127o8jVE_400x400.jpg'
    },
    {
        handle: 'xo__Tiana',
        imageUrl:
            'https://pbs.twimg.com/profile_images/1464863627803074564/ni4817Ot_400x400.jpg'
    },
    {
        handle: 'HRF',
        imageUrl:
            'https://pbs.twimg.com/profile_images/1191843285284851713/VXOM10vt_400x400.jpg'
    },
    {
        handle: 'BeatsPerMinute',
        imageUrl:
            'https://pbs.twimg.com/profile_images/1270008867632689153/pnunOnxe_400x400.jpg'
    },
    {
        handle: 'ConorOkus',
        imageUrl:
            'https://pbs.twimg.com/profile_images/1450028060942770179/wJhOn6UD_400x400.jpg'
    },
    {
        handle: 'pavlenex',
        imageUrl:
            'https://pbs.twimg.com/profile_images/1463168067077353489/59tUAnQf_400x400.jpg'
    },
    {
        handle: 'bankofengland',
        imageUrl:
            'https://pbs.twimg.com/profile_images/1148600581407301632/bCM-3Fin_400x400.png'
    },
    {
        handle: 'wef',
        imageUrl:
            'https://pbs.twimg.com/profile_images/565498192171507712/r2Hb2gvX_400x400.png'
    },
    {
        handle: 'ecb',
        imageUrl:
            'https://pbs.twimg.com/profile_images/1420052598611185670/8TPNnyt3_400x400.jpg'
    },
    {
        handle: 'federalreserve',
        imageUrl:
            'https://pbs.twimg.com/profile_images/766274287129006080/8B5hXHv__400x400.jpg'
    },
    {
        handle: 'mempool',
        imageUrl:
            'https://pbs.twimg.com/profile_images/1466752580185329664/QAVb1J5b_400x400.jpg'
    },
    {
        handle: 'LNJunkies',
        imageUrl:
            'https://pbs.twimg.com/profile_images/1277337042632900608/C_m7c5s4_400x400.jpg'
    },
    {
        handle: 'STOmarova',
        imageUrl:
            'https://pbs.twimg.com/profile_images/1105508491970646016/14rm4wUi_400x400.jpg'
    },
    {
        handle: 'ambosstech',
        imageUrl:
            'https://pbs.twimg.com/profile_images/1434620342593544194/HaB5PWzc_400x400.jpg'
    },
    {
        handle: 'RTL_App',
        imageUrl:
            'https://pbs.twimg.com/profile_images/1362595482783080448/4zBJ1MFj_400x400.jpg'
    },
    {
        handle: 'davetroy',
        imageUrl:
            'https://pbs.twimg.com/profile_images/1462707970056273923/0Lx6F9qz_400x400.jpg'
    },
    {
        handle: 'SecYellen',
        imageUrl:
            'https://pbs.twimg.com/profile_images/1333421043772375043/N3Z22RJ1_400x400.jpg'
    },
    {
        handle: 'Lagarde',
        imageUrl:
            'https://pbs.twimg.com/profile_images/1420053180860207115/BUvRX57p_400x400.jpg'
    },
    {
        handle: 'paulkrugman',
        imageUrl:
            'https://pbs.twimg.com/profile_images/2044852218/NYT_Twitter_Krugman_400x400.png'
    },
    {
        handle: 'futurepaul',
        imageUrl:
            'https://pbs.twimg.com/profile_images/1362748387276320774/OoFJWBld_400x400.jpg'
    },
    {
        handle: 'peterschiff',
        imageUrl:
            'https://pbs.twimg.com/profile_images/1265705916298641408/qK7MHnk9_400x400.jpg'
    },
    {
        handle: 'fiatjaf',
        imageUrl:
            'https://pbs.twimg.com/profile_images/539211568035004416/sBMjPR9q_400x400.jpeg'
    },
    {
        handle: 'ZeusLN',
        imageUrl:
            'https://pbs.twimg.com/profile_images/1428206613370920963/z_--ZTFF_400x400.jpg'
    },
    {
        handle: 'HillaryClinton',
        imageUrl:
            'https://pbs.twimg.com/profile_images/1291192333199958017/SvH8J8_P_400x400.jpg'
    },
    {
        handle: 'ProfKlausSchwab',
        imageUrl:
            'https://pbs.twimg.com/profile_images/1329021203152035842/2zhAiMCv_400x400.jpg'
    },
    {
        handle: 'BTCSessions',
        imageUrl:
            'https://pbs.twimg.com/profile_images/1467239093465616389/CA3_JZkU_400x400.jpg'
    },
    {
        handle: 'JoeBiden',
        imageUrl:
            'https://pbs.twimg.com/profile_images/1308769664240160770/AfgzWVE7_400x400.jpg'
    }
];

router.get('/getCommunitySponsors', (req, res) => {
    res.send(MOCK_SPONSORS);
});

export default router;
