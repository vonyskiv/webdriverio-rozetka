import { browser } from '@wdio/globals'
import CatalogueModule from "../Page-objects/catalogue-po.js"

describe('Catalogue Rozetka Page', () => {
    before(async() => {
        await browser.url('/');
    });
    it('Go through the catalogue', async () => {
        await CatalogueModule.catalogueCheck()
    });
    // it('Check if clickable', async () => {
    //     await CatalogueModule.verifyCategoryclick()
    // });
    it('Click on catalogue item and verify computers page', async () => {
        await CatalogueModule.selectCatalogueitem()
        await CatalogueModule.selectFirstresult()
    });
    it('Check filtration', async () => {
        await CatalogueModule.verifyFilterbrand()
        await CatalogueModule.verifyPricefilter()
        
    });
    // it('Check sorting', async () => {
    //     await browser.url('/');
    //     await CatalogueModule.verifySorting()
        
    // });


});


