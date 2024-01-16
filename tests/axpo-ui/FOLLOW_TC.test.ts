import { test, expect } from "@playwright/test";

import HomePage from "../../pages/home.page";
import SignInPage from "../../pages/signin.page";
import ProfilePage from "../../pages/profile.page";

const testEmail = "testemail@email.com";
const testPassword = "testpassword";
const testUsername = "testusername";

test.describe("FOLLOW_TC", () => {

    test("FOLLOW_TC_ALL", async ({ page }) => {
        await page.goto('https://conduit.realworld.how/');

        const signInPage = new SignInPage(page);
        const homePage = new HomePage(page);
        const profilePage = new ProfilePage(page);

        await homePage.clickBarSignInButton();

        await signInPage.inputEmail(testEmail);
        await signInPage.inputPassword(testPassword);
        await signInPage.clickSignInButton();

        await homePage.clickGlobalFeed();
        await homePage.clickCorrectAuthor(testUsername);

        const authorName = await profilePage.getAuthorName();

        //1.Follow Author
        const count = await profilePage.isFollowButtonAvailable();
        debugger

        if(count > 0){
            await profilePage.clickFollowAuthor();
            await page.waitForLoadState('networkidle')
            debugger
        } else {
            await profilePage.clickUnfollowAuthor();
            debugger
            await page.waitForLoadState('networkidle');
            debugger
            await profilePage.clickFollowAuthor();
            debugger
        }
        debugger
        await homePage.clickHomeNavBar();
        debugger
        const authorsNames = await homePage.getAuthorsNames();
        const isAuthorPresent = authorsNames.includes(authorName);
        expect(isAuthorPresent).toBe(true);
        debugger
        await homePage.clickAuthorByName(authorName);
        debugger
        await profilePage.clickUnfollowAuthor();
    });

});




