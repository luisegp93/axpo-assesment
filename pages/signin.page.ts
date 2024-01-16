import { Page } from "@playwright/test";

const locators = {
    pageHeader: "h1.text-xs-center",
    inputEmail: "input[name='email']",
    inputPassword: "input[name='password']",
    signInButton: "button[type='submit']"
}

export default class SignInPage {

    constructor(public page: Page) { }

    async getHeaderText() {
        return await this.page.locator(locators.pageHeader)
            .textContent();
    }

    async isEmailVisible() {
        return await  this.page.isVisible(locators.inputEmail);
    }

    async isPasswordVisible() {
        return await  this.page.isVisible(locators.inputPassword);
    }

    async inputEmail(email: string) {
        await this.page.fill(locators.inputEmail, email);
    }

    async inputPassword(password: string) {
        await this.page.fill(locators.inputPassword, password);
    }

    async clickSignInButton(){
        await this.page.locator(locators.signInButton).click();
    }
    
}