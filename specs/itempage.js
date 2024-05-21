import { browser } from '@wdio/globals'
import ItemPage from "../Page-objects/itempage-po.js"

describe('Testing product page', () => {
    before(async() => {
        await browser.url('/' + 'a_ba_ba_ga_la_ma_ga_9786175850350/p14005772/');
    });
    it('Verify that the product page contains all necessary sections', async () => {
        await ItemPage.navBarSetions()
        await ItemPage.sellersSection()
        await ItemPage.verifyCurrency()
        await ItemPage.verifyButtonBuy()
    });
    
});