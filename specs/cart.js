import { browser } from '@wdio/globals'
import ItemPage from "../Page-objects/itempage-po.js"

describe('Testing product page', () => {
    before(async() => {
        await browser.url('/' + 'a_ba_ba_ga_la_ma_ga_9786175850350/p14005772/');
    });
        it('Verify that the product is moved to the cart by clicking on "Buy" button on the product page', async () => {
            await ItemPage.verifyAddingToCart();
            await ItemPage.verifyCartSign();
            await ItemPage.buyForIncreasedPrice(2, 10);
            await ItemPage.checkoutPage();
        })
        
    });
