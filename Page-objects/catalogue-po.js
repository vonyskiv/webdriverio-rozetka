import { browser } from '@wdio/globals'
import { getRandomNumber } from "../helpers/randomfunctions.js"

class CatalogueModule {
    get catalogueList() { return $$('.fat-wrap ul li')  } 
    get computersPage() { return $$('rz-list-tile')}
    get schoolPage() { return $$('rz-list-tile')}
    get filterBrand() { return $$('rz-filter-section-autocomplete li')}
    get priceInput() { return $('form input[formcontrolname="max"]')}
    get minPrice() { return $('form input[formcontrolname="min"]')}
    get priceButton() { return $('button[type="submit"]')}
    get sortingDropdown() { return $('rz-sort select')}
    get sortingValue() { return $('.select-css [value="1: cheap"]')}
    get quantityInput() { return $('[formcontrolname="quantity"]')}
    
    



async catalogueCheck() {
    const itemsList = await this.catalogueList
    
   
    const expectedMenuItems = 
    ["Ноутбуки та комп’ютери", 
    "Смартфони, ТВ і електроніка", 
    "Товари для геймерів", 
    "Побутова техніка", 
    "Товари для дому", 
    "Інструменти та автотовари", 
    "Сантехніка та ремонт", 
    "Дача, сад і город", 
    "Спорт і захоплення", 
    "Одяг, взуття та прикраси", 
    "Краса та здоров’я", 
    "Дитячі товари", 
    "Зоотовари", 
    "Офіс, школа, книги", 
    "Алкогольні напої та продукти", 
    "Побутова хімія",
    "До Дня вишиванки до -45%",
    ]

    const actualMenuItems = []

    for (const elements of itemsList) {
        const text = await elements.getText();
        actualMenuItems.push(text); 
    }
   await expect(expectedMenuItems).toEqual(actualMenuItems)
    }
async verifyCategoryclick() {
    await expect(this.catalogueList).toBeClickable()
    }

async selectCatalogueitem() {
    await this.catalogueList[0].click()
    await expect(browser).toHaveUrlContaining('computers-notebooks')
}
async selectFirstresult() {
    await browser.waitUntil(async () => {
        return await this.computersPage[0].isDisplayed();
    }, {
        timeout: 5000, 
    });
    await this.computersPage[0].click()
    await expect(browser).toHaveTitle(expect.stringContaining('Ноутбуки'))
}

async verifyFilterbrand() {
    await browser.pause(2000)

    const filterBrandElements = await this.filterBrand;
    const randomIndex = Math.floor(Math.random() * filterBrandElements.length);
    await filterBrandElements[randomIndex].click();

await browser.waitUntil(async () => {
    const currentUrl = await browser.getUrl();
    return currentUrl.includes('rozetka');
}, {
    timeout: 20000, 
});

const filterText = await filterBrandElements[randomIndex].getText();
await browser.pause(2000)
const wordsArray = filterText.split(' ');
const firstWord = wordsArray[0].trimEnd();
await browser.pause(2000)
await expect(browser).toHaveUrl(expect.stringContaining(firstWord.toLowerCase()))
    
}
async verifyPricefilter() {
    
    const priceMax = await this.priceInput
    const priceMin = await this.minPrice

    let existingMaxvalue = await priceMax.getValue();
    existingMaxvalue=parseInt(existingMaxvalue)
   
    await browser.pause(2000)
    let existingMinprice = await priceMin.getValue();
    existingMinprice=parseInt(existingMinprice)

   
    const insertedPrice = await getRandomNumber(existingMinprice, existingMaxvalue)

    if (existingMinprice < existingMaxvalue)
        {
            await priceMax.clearValue();
            await browser.pause(3000)
            await priceMax.setValue(insertedPrice);
            
        }
        await browser.pause(3000)
       
        await this.priceButton.click()
        
    if (existingMinprice < existingMaxvalue)
    {
    await expect(browser).toHaveUrlContaining(insertedPrice) 
    }
   
}

async verifySorting() {
    await this.catalogueList[13].click()
    
    await browser.waitUntil(async () => {
        return await this.schoolPage[0].isDisplayed();
    }, {
        timeout: 5000, 
    });
    const schoolPageOption = await this.schoolPage
    await schoolPageOption[0].click()
    await this.sortingDropdown.click()
    await this.sortingValue.click()
    expect(browser).toHaveUrl(expect.stringContaining('sort=cheap'))
   
}
}

export default new CatalogueModule()
 