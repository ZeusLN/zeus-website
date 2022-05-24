import React from 'react';

import Header from './Header';
import Footer from './Footer';

function PrivacyPolicy() {
    return (
        <div className="App">
            <Header />
            <div className="PrivacyPolicy">
                <h4>Privacy Policy</h4>
                <div className="PrivacyPolicyText">
                    <p>
                        This Zeus Privacy Notice describes the privacy practices
                        that are applicable to your use of the Zeus mobile
                        application (the "App") provided by Zeus LN LLC (the
                        "Author").
                    </p>

                    <b>A. Privacy Practices</b>
                    <p>
                        The Author intends for users to be able to use the
                        functionality of the App on a decentralized, anonymous
                        basis. The Author therefore does not collect, use,
                        maintain or share any personal information about you
                        when you use the App, and the Author does not use any
                        tracking technology to track your use of the App. The
                        Author also does not allow third parties to collect
                        personal information about you when you use the App, or
                        to use tracking technology to track your use of the App.
                        Any information that you provide to us when you
                        communicate with our customer or technical support
                        departments will only be used for purposes of addressing
                        your specific support request.
                    </p>

                    <b>B. Third Party App Stores</b>
                    <p>
                        If you purchase or access the App through a third party
                        app store, such as iTunes or Google Play (an "App
                        Store"), you will have a separate, additional account
                        relationship with that App Store and the information you
                        provide to that App Store will be handled in accordance
                        with the privacy practices of the applicable App Store.
                        App Stores are not partners or representatives of the
                        Author and the Author is not responsible for the acts or
                        omissions of an App Store with regard to the collection,
                        use, maintenance or disclosure of your information. If
                        you want to change your preferences with regard to how
                        an applicable App Store collects or uses your
                        information, you should review the privacy practices of
                        the applicable App Store and adjust your privacy or
                        other settings directly through the applicable App
                        Store. The Author will not receive or have access to any
                        of the information you provide to, or that is collected
                        by, an applicable App Store.
                    </p>

                    <b>C. No Use by Children</b>
                    <p>
                        The App is not intended for use by children under the
                        age of thirteen (13). If you are under the age of
                        thirteen (13), please do not use the App.
                    </p>

                    <b>D. Modifications to this Privacy Notice</b>
                    <p>
                        We will notify you of material changes to this Privacy
                        Notice, including changes regarding how we collect, use,
                        maintain or share your information, by posting the
                        modified privacy notice on the App at least thirty (30)
                        days before the effective date of the changes. If you do
                        not agree to the changes, you should discontinue your
                        use of the App prior to the time the modified privacy
                        notice takes effect. If you continue using the App after
                        the modified privacy notice takes effect, you will be
                        bound by the modified privacy notice.
                    </p>

                    <b>E. How to Contact Us</b>
                    <p>
                        Please also feel free to contact us at
                        zeusln@tutanota.com if you have any questions about this
                        Privacy Notice.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default PrivacyPolicy;
