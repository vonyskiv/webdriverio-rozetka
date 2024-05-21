import { browser } from '@wdio/globals'
import HomePage from "../Page-objects/home-po.js"

describe('Home Rozetka Page', () => {
     before(async() => {
        await browser.url('/');
    });
    
it('Access URL and verify the title', async () => {

await expect(browser).toHaveUrlContaining('rozetka');
await expect (browser).toHaveTitleContaining('ROZETKA');
    })
it('Rozetka top bar tests', async () => {
    await HomePage.findLanguage();
    await HomePage.verifyLanguage();
    await HomePage.verifyLogo();
    await HomePage.verifyCart();
    await HomePage.verifySidemenu();
    await HomePage.verifySearch();
});
// it('User popup actions', async () => {
//     await HomePage.accountPopup();
//     await HomePage.errorCheck();
//     await HomePage.closeButton();
// });
it('Sidepanel functionality', async() => {
    await HomePage.verifyHelpcenter();
    await browser.url('/');
    await HomePage.verifyChatlink();
    await HomePage.verifyStorespage();
    await browser.url('/');
    await HomePage.verifyWelcomeblock();
    await HomePage.verifyFootertext();
});
it('Social media home page', async() => {
    await HomePage.verifySocialmedia();
});
})