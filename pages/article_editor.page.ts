import { Page } from "@playwright/test";

const locators = {
    inputArticleTitle: "input[name='articleTitle']",
    inputArticleDescription: "input[name='description']",
    inputArticleBody: "textarea[name='body']",
    inputArticleTags: "input[name='tags']",
    publishButton: "button[type='button']",
}

export default class ArticleEditorPage {

    constructor(public page: Page) { }

    async inputTitle(title: string) {
        await this.page.fill(locators.inputArticleTitle, title);
    }

    async inputDescription(description: string) {
        await this.page.fill(locators.inputArticleDescription, description);
    }

    async inputBody(body: string) {
        await this.page.fill(locators.inputArticleBody, body);
    }

    async inputTag(tag: string) {
        await this.page.fill(locators.inputArticleTags, tag);
    }

    async clickPublish(){
        await this.page.locator(locators.publishButton).click();
    }

}