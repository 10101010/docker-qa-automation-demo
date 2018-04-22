const SignupPage = require('./_pages/signup.page.js');

describe('Sign Up Form', () => {

    const campaignName = 'test campaign';

    beforeEach(()=>{
        SignupPage.open()
    });

    it('should allow to create a new account', () => {
        SignupPage.registerAs({
            email: 'rkiriluk@lineate.com',
            fullName: 'Ruslan Kirilyuk',
            username: 'grvxz',
            password: '666'
        })

        browser.sleep(5000)

        // expect(CampaignsPage.urlContains('campaign-group'));
    });

    it('should display error if password wasnt entered', () => {
        // SignupPage.registerAs({
        //     email:
        //     fullName:
        //     username:
        //     password:
        // })

        // expect(CampaignsPage.urlContains('campaign-group'));
    });

});