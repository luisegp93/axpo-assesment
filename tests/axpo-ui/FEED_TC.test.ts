import { test, expect } from "@playwright/test";

import HomePage from "../../pages/home.page";
import SignInPage from "../../pages/signin.page";

const testEmail = "testemail@email.com";
const testPassword = "testpassword";

test.describe("FEED_TC", () => {

    test("FEED_TC_01", async ({ page }) => {
        //1. Navigate to the global feed.
        await page.goto('https://conduit.realworld.how/');

        const homePage = new HomePage(page);

        const expectedHomeHeaderText = "conduit";

        expect(await homePage.getNavBarBrand()).toBe(expectedHomeHeaderText);

        //2. Click one tag.
        await homePage.selectRandomTag()

        //2. Content is filtered by the selected tag
        // The chosen tag should be present in all article previews visible in the page. Following logic is to assert that.
        const chosenTag = await homePage.getActiveTag();
        const cleanTagText = chosenTag.replace('#', '');
        const articlesPreviewCount = await homePage.getArticlesPreviewAmount();
        const tagsInArticles = await homePage.getTagsInArticlesPreviews();
        const occurrences = tagsInArticles.filter(item => item === cleanTagText.trim()).length;

        expect(occurrences).toBe(articlesPreviewCount);

        const pageCount = await homePage.getPageCount();

        // If filter shows more than 1 page result then assert than at least second page is also showing consistent filter results
        if (pageCount > 0) {
            await homePage.clickSecondPage();
            const chosenTag = await homePage.getActiveTag();
            const cleanTagText = chosenTag.replace('#', '');
            const articlesPreviewCount = await homePage.getArticlesPreviewAmount();
            const tagsInArticles = await homePage.getTagsInArticlesPreviews();
            const occurrences = tagsInArticles.filter(item => item === cleanTagText.trim()).length;

            expect(occurrences).toBe(articlesPreviewCount);
        }
    });

    test("FEED_TC_02", async ({ page }) => {
        //1. Navigate to the personal feed.
        await page.goto('https://conduit.realworld.how/');

        const signInPage = new SignInPage(page);
        const homePage = new HomePage(page);

        const expectedHomeHeaderText = "conduit";

        expect(await homePage.getNavBarBrand()).toBe(expectedHomeHeaderText);

        await homePage.clickBarSignInButton();

        await signInPage.inputEmail(testEmail);
        await signInPage.inputPassword(testPassword);
        await signInPage.clickSignInButton();

        await homePage.clickYourFeed();

        expect(await homePage.articlesVisible()).toBe(true);

        const pageCount = await homePage.getPageCount();

        if (pageCount > 0) {
            await homePage.clickSecondPage();
            expect(await homePage.articlesVisible()).toBe(true);
        }
    });

});




