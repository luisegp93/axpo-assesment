import { Page } from "@playwright/test";

const locators = {
    pageHeader: "h1.text-xs-center",
    inputUsername: "input[name='username']",
    inputEmail: "input[name='email']",
    inputPassword: "input[name='password']",
    signupButton: "button[type='submit']"
}

export default class SignUpPage {

    constructor(public page: Page) { }

    async getHeaderText() {
        return await this.page.locator(locators.pageHeader)
            .textContent();
    }

    async isUsernameVisible() {
        return await this.page.isVisible(locators.inputUsername);
    }

    async isEmailVisible() {
        return await this.page.isVisible(locators.inputEmail);
    }

    async isPasswordVisible() {
        return await this.page.isVisible(locators.inputPassword);
    }

    async inputUsername(username: string) {
        await this.page.fill(locators.inputUsername, username);
    }

    async inputEmail(email: string) {
        await this.page.fill(locators.inputEmail, email);
    }

    async inputPassword(password: string) {
        await this.page.fill(locators.inputPassword, password);
    }

    async clickSignupButton(){
        await this.page.locator(locators.signupButton).click();
    }

}