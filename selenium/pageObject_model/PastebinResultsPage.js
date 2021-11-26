import pkg from 'selenium-webdriver';
const { Builder, Browser, By, until, wait } = pkg;
import { PastebinHomePage } from './PastebinHomePage.js';

export class PastebinResultsPage extends PastebinHomePage {
    constructor(browser) {
        super(browser);
        this.savedTitleXpath = '//div[@class="info-top"]/h1';
        this.savedTextAreaXpath = '//div[@class="source"]/ol';
        this.savedExpirationXpath = '//div[@class="expire"]';
        this.savedSyntaxXpath = '//a[@class="btn -small h_800"]';
    }

    async getTitleBrowsertab(data) {
        await this.driver.wait(until.titleContains(data), 20000);
        this.titleBrowserTab = await this.driver.getTitle();
        await this.titleBrowserTab;
    }

    async getSyntaxAfter(selectXpath) {
        this.syntaxAfter = await this.driver
            .wait(until.elementLocated(By.xpath(selectXpath)), 20000)
            .getAttribute('innerText');
    }

    async getContentSavedElement(elementXpath) {
        this.savedContentTextarea = await this.driver
            .wait(until.elementLocated(By.xpath(elementXpath)), 20000)
            .getAttribute('innerText');
    }

    async transformText(obj, key, text) {
        text = await text.replace(/\s+/gi, '');
        text = await text.replace(/\\n/gi, '');
        text = await text.toLowerCase();
        obj[key] = await text;
    }
}

export let PastebinResults = new PastebinResultsPage();
