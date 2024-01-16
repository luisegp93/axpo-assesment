import { test, expect } from "@playwright/test";

import SignUpPage from "../../pages/signup.page";
import SignInPage from "../../pages/signin.page";
import HomePage from "../../pages/home.page";

const count = 10000;
const randomIndex = Math.floor(Math.random() * count);
const stringRandomIndex = randomIndex.toString();
const username = "luisegarciap" + stringRandomIndex;
const email = "dummy_email_" + stringRandomIndex + "@gmail.com";
const password = "password" + stringRandomIndex;

const testEmail = "testemail@email.com";
const testPassword = "testpassword";

test.describe("AUTH_TC", () => {

    test("AUTH_TC_01", async ({ page }) => {
        // 1. Navigate to the sign-up page.
        await page.goto('https://conduit.realworld.how/register');

        const signUpPage = new SignUpPage(page);

        const expectedSignUpHeaderText = "Sign up";

        //Expected initial conditions
        expect(await signUpPage.getHeaderText()).toBe(expectedSignUpHeaderText);
        expect(await signUpPage.isUsernameVisible()).toBe(true);
        expect(await signUpPage.isEmailVisible()).toBe(true);
        expect(await signUpPage.isPasswordVisible()).toBe(true);

        //2. Fill in valid details and submit.
        await signUpPage.inputUsername(username);
        await signUpPage.inputEmail(email);
        await signUpPage.inputPassword(password);
        await signUpPage.clickSignupButton();

        //Intercepting API response
        const response = await page.waitForResponse('https://api.realworld.io/api/users');
        const status = response.status();

        //Expect Status Code: 201 Created
        expect(status).toBe(201);
    });

    test("AUTH_TC_02", async ({ page }) => {
        // 1. Navigate to the sign-up page.
        await page.goto('https://conduit.realworld.how/');

        const signInPage = new SignInPage(page);
        const homePage = new HomePage(page);

        await homePage.clickBarSignInButton();

        const expectedHomeHeaderText = "conduit";

        expect(await signInPage.isEmailVisible()).toBe(true);
        expect(await signInPage.isPasswordVisible()).toBe(true);

        await signInPage.inputEmail(testEmail);
        await signInPage.inputPassword(testPassword);
        await signInPage.clickSignInButton();

        expect(await homePage.getNavBarBrand()).toBe(expectedHomeHeaderText);
    });

});






