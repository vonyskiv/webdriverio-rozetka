import { browser } from '@wdio/globals'
import { getRandomNumber } from "../helpers/randomfunctions.js"

class ItemPage {

get navBarProduct() { return $$('rz-product-navbar ul li')}
get sellerSection() { return $('rz-seller .seller-title')}
get currencyValue() { return $('.product-price__symbol.currency')}
get buyButton() { return $('rz-product-main-info .product-button__buy')}
get cartModal() { return $('rz-single-modal-window')}
get continueShoppingButton() { return $('[data-testid="continue-shopping-link"]')}
get cartButton() {return $('.header-actions rz-cart')}
get cartGreenSign() { return $('.badge.badge--green')}
get priceInModal() { return $('.cart-footer .cart-receipt__sum-price')}
get plusButton() { return $('[data-testid="cart-counter-increment-button"]')}
get quantityInput() { return $('[formcontrolname="quantity"]')}
get checkoutButton() {return $('rz-checkout-button')}
    

async navBarSetions() {
    const sectionsList = await this.navBarProduct
    const expectedSectionItems = [
        'Усе',
        'Характеристики',
        'Відгуки',
        'Питання',
        'Купують',
        'Цей'
    ]
    const actualSectionItems = []
    
    for (const elements of sectionsList) {
        const sectionText = await elements.getText();
        const firstWord = sectionText.split(' ')[0];
        actualSectionItems.push(firstWord);

    }
    await expect(expectedSectionItems).toEqual(actualSectionItems)
}

async sellersSection() {
    await expect(this.sellerSection).toBeDisplayed()
}
async verifyCurrency() {
const currency = await this.currencyValue.getText()
await expect(currency).toEqual('₴')
}

async verifyButtonBuy() {
    await expect(this.buyButton).toBeDisplayed()
}

async verifyAddingToCart() {
    const buyBtn = await this.buyButton
    await buyBtn.click()
    await expect(this.cartModal).toBeDisplayed()
    await this.continueShoppingButton.click()
    const newBuyButton = await buyBtn.getText()
   await expect(newBuyButton).toEqual('В кошику')
}
async verifyCartSign() {
    await expect(this.cartGreenSign).toBeExisting()
    await this.cartButton.click()
    await expect(this.cartModal).toBeDisplayed()
}
async buyForIncreasedPrice(minValue, maxValue) {

let PriceString = await this.priceInModal.getText();
PriceString = PriceString.slice(0, -1);
PriceString = PriceString.replace(" ","");
let PriceNumb = parseInt(PriceString);

let quantity = await this.quantityInput;
await quantity.clearValue();
const valueToBeSet = await getRandomNumber(minValue, maxValue)
await quantity.setValue(valueToBeSet);
await browser.pause(5000);

let newPrice = await this.priceInModal.getText();
newPrice = newPrice.slice(0, -1).trim();
newPrice = newPrice.replace(" ","");
let newPriceNum = parseInt(newPrice);

await expect(newPriceNum).toEqual(PriceNumb*valueToBeSet)

}
async checkoutPage() {
    await this.checkoutButton.click();
    await expect(browser).toHaveUrl(expect.stringContaining('checkout'));

}
}

export default new ItemPage()