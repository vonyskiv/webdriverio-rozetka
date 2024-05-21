import { browser } from '@wdio/globals'

class SearchFunctionality {

get searchField() { return $('input[name="search"]') };
get findButton() { return $('button.search-form__submit')};
get textOfError() { return $('.search-nothing h1')};
get autocomplete() { return $$('.search-suggest__group li')}; 
get searchResults() { return $$('rz-grid ul li')}; 
get productName() { return $('rz-title-block h1')};

async insertTextInsearch(searchText) {
    const searchInput = await this.searchField
    await searchInput.setValue(searchText)
    await this.findButton.click()
    await expect(browser).toHaveUrl(expect.stringContaining(searchText))
}

async insertInvalidText(failedText) {
    const searchField = await this.searchField
    await searchField.setValue(failedText)
    await this.findButton.click()
    const errorText = await this.textOfError
    await expect(errorText).toHaveText(expect.stringContaining("нічого не знайдено"))
    
}

async autocompleteFromSearch(searchText) {
    const searchField = await this.searchField
    await searchField.setValue(searchText)
    await browser.pause(2000)
    await this.autocomplete[0].click()
    await browser.pause(3000)
    await this.searchResults[0].click()
    await expect(this.productName).toHaveText(expect.stringContaining("Ліна Костенко"))

}

}

export default new SearchFunctionality()