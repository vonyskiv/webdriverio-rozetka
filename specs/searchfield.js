import { browser } from '@wdio/globals'
import SearchFunctionality from "../Page-objects/search-po.js"

describe('Rozetka Page, Search field test', () => {
    before(async() => {
        await browser.url('/');
    });
    it('Check that the search field works correctly', async () => {
        await SearchFunctionality.insertTextInsearch('swimming')
        await SearchFunctionality.insertInvalidText("lorem ipsum dolor sit amet")
    });
    it('Check the autocomplete in the search field', async () => {
        await SearchFunctionality.autocompleteFromSearch('Ліна Костенко')
        
    });
});