import { Page } from "@playwright/test";

const locators = {
    articles: ".article-preview",
    articlesTitles: "h1",
    followButton: ".btn-outline-secondary",
    unfollowButton: ".btn-secondary",
    authorName: "h4",
    bigProfilePicture: "img.user-img"
}

export default class ProfilePage {

    constructor(public page: Page) { }

    async clickFirstArticle() {
        await this.page.locator(locators.articles).nth(0).click();
        await this.page.waitForLoadState('networkidle');
    }

    async getFirstArticleTitle() {
        return await this.page.locator(locators.articlesTitles).nth(0).textContent();
    }

    async getArticlesInProfile() {
        await this.page.waitForSelector(locators.articlesTitles);
        const elements = await this.page.locator(locators.articlesTitles).all();
        const titles = await Promise.all(elements.map(async (element) => {
            return element.innerText();
        }));
        return titles;
    }

    async isFollowButtonAvailable(){
        const count = await this.page.locator(locators.followButton).count();
        return count
    }

    async clickFollowAuthor(){
        await this.page.locator(locators.followButton).click();
        await this.page.waitForLoadState('networkidle');
    }

    async clickUnfollowAuthor(){
        await this.page.locator(locators.unfollowButton).click();
        await this.page.waitForLoadState('networkidle');
    }

    async getAuthorName(){
        return await this.page.locator(locators.authorName).textContent();
    }

    async waitForProfileToLoad(){
        await this.page.waitForSelector(locators.bigProfilePicture);
    }
}