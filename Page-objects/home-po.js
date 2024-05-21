import { browser } from '@wdio/globals'

class HomePage {
    get languageSigns() { return $ ('.lang.lang-header') }
    get selectedLang() { return $ ('span.lang__link--active') }
    get headerLogo() { return $ ('header .header__logo') }
    get accountIcon() { return $ ('rz-user .header__button') }
    get cartIcon() { return $('rz-cart')}
    get sideMenu() { return $('rz-mobile-user-menu')}
    get searchField() { return $('.header-search,search-form')}
    get userPopup() { return $ ('rz-single-modal-window .modal__holder') } 
    get loginButton() { return $ ('.button--green.auth-modal__submit') }
    get validationMessage() { return $ ('.error-message') }
    get closePopup() { return $ ('button.modal__close') }
    get helpCenter() { return $('a[href="https://help.rozetka.com.ua/"]')}
    get chatRozetka() { return $('a[href="https://t.me/Rozetka_helpBot?start=src=hc"]')}
    get storesRozetka() { return $('a[href*=retail]')}
    get welcomeBlock() {return $('h3.main-auth__heading')}
    get welcomeButton() {return $('.main-auth>button')}
    get socialMedia() {return $$('rz-social-icons ul li:nth-child(-n+6)>a')}
    get footerText() { return $ ('.main-copyright p:nth-child(3)')}

async findLanguage(){ 
    await expect(this.languageSigns).toBeDisplayed() 
}
async verifyLanguage() {
    await expect(this.selectedLang).toHaveText("UA")
}
async verifyLogo() {
    await expect(this.headerLogo).toBeDisplayed()
}
async verifyCart() {
    await expect(this.cartIcon).toBeDisplayed()
}
async verifySidemenu() {
    await expect(this.sideMenu).toBeDisplayed()
}
async verifySearch() {
    await expect(this.searchField).toBeDisplayed()
}
async accountPopup() {
    await this.accountIcon.click()
    await expect(this.userPopup).toBeDisplayed()
}
async errorCheck() {
    await this.loginButton.click()
    await expect(this.validationMessage).toHaveText("Введено невірну адресу ел. пошти або номер телефону")
}
async closeButton() {
    await this.closePopup.click()
}
async verifyHelpcenter() {
    await this.helpCenter.click()
    await expect(browser).toHaveUrl('https://help.rozetka.com.ua/')

}
async verifyChatlink() {
    await expect(this.chatRozetka).toBeDisplayed()
}
async verifyStorespage() {
    await this.storesRozetka.click()
    await expect(browser).toHaveTitle(expect.stringContaining('Магазини ROZETKA у місті'))
}
async verifyWelcomeblock() {
   await expect(this.welcomeBlock).toHaveText(expect.stringContaining('Ласкаво просимо!'))
   await expect(this.welcomeButton).toBeClickable()
}
async verifySocialmedia() {
    const socialPlatforms = await this.socialMedia
    
    const expectedPlatforms = [
        'https://www.facebook.com/rozetka.ua',
        'https://twitter.com/rozetka_ua',
        'http://bit.ly/RZTK_UA',
        'https://instagram.com/rozetkaua',
        'https://invite.viber.com/?g2=AQB9mwM%2F5f%2FxJUlMxP4V9flr2%2BvXTC1MpxdGFZ0P6d%2Fs6Ws%2FFe%2FQtLiZwA4E28sj',
        'https://t.me/rrozetka']
    const actualPlatforms = []

    for (const links of socialPlatforms) {
        const iconLink = await links.getAttribute('href');
         actualPlatforms.push(iconLink)
    }
    
    await expect(actualPlatforms).toEqual(expectedPlatforms)  
    
}
async verifyFootertext() {
    await expect(this.footerText).toHaveText('© 2001–2024 Інтернет-магазин «Розетка™» — Щоразу що треба')
}
}
    
export default new HomePage()