import pkg from 'selenium-webdriver';
const { Builder, Browser, By, until, wait } = pkg;
import { HomePageSitePastebin } from './HomePageSitePastebin.js';

export class PageSitePastebinResults extends HomePageSitePastebin {
    constructor(driver) {
        super(driver);
        this.savedTitleXpath = '//div[@class="info-top"]/h1';
        this.savedTextAreaXpath = '//div[@class="source"]/ol';
        this.savedSyntaxXpath = '//div[@class="btn -small h_800"]';
        this.savedExpirationXpath = '//div[@class="expire"]';
        this.syntaxBashConfigXpath =
            '((//*[@class="li1"])[1]/*[@class="de1"]/span)[1]';
        this.syntaxBashResetXpath =
            '((//*[@class="li1"])[2]/*[@class="de1"]/span)[1]';
        this.syntaxBashCommitXpath =
            '((//*[@class="li1"])[2]/*[@class="de1"]/span)[3]';
        this.syntaxBashThreeXpath =
            '((//*[@class="li1"])[2]/*[@class="de1"]/span)[5]';
        this.syntaxBashPushXpath =
            '((//*[@class="li1"])[3]/*[@class="de1"]/span)[1]';
        this.syntaxBashGlobalXpath =
            '(((//*[@class="li1"])[1]/*[@class="de1"])[1]/span)[2]';
        this.syntaxBashMXpath =
            '((//*[@class="li1"])[2]/*[@class="de1"]/span)[7]';
        this.syntaxBashForceXpath =
            '((//*[@class="li1"])[3]/*[@class="de1"]/span)[2]';
        this.syntaxBashTextNameXpath =
            '(((//*[@class="li1"])[1]/*[@class="de1"])[1]/span)[3]';
        this.syntaxBashTextCommitXpath =
            '((//*[@class="li1"])[2]/*[@class="de1"]/span)[8]';
        this.bashClass = null;
        this.commandColour = 'kw2';
        this.flagColour = 're5';
        this.titleColour = 'st0';
        this.titleBrowserTab = null;
        this.resultSyntaxBashConfig = null;
        this.resultSyntaxBashReset = null;
        this.resultSyntaxBashCommit = null;
        this.resultSyntaxBashThree = null;
        this.resultSyntaxBashPush = null;
        this.resultSyntaxBashGlobal = null;
        this.resultSyntaxBashM = null;
        this.resultSyntaxBashForce = null;
        this.resultSyntaxTextName = null;
        this.resultSyntaxTextCommit = null;
        this.resultTextarea = null;
    }

    async getTitleBrowsertab() {
        await this.driver.wait(
            until.titleContains(this.dataTitleForTaskTwo),
            20000
        );
        this.titleBrowserTab = await this.driver.getTitle();
        await this.titleBrowserTab;
        return this;
    }

    async checkSyntaxBash(elementXpath, colourClass) {
        let element_ = await this.driver.wait(
            until.elementLocated(By.xpath(elementXpath)),
            20000
        );
        this.bashClass = await element_.getAttribute('class');
        if (this.bashClass === (await colourClass)) {
            return true;
        } else {
            return false;
        }
    }

    async getContentSavedElement(elementXpath, callback) {
        let element_ = await this.driver.wait(
            until.elementLocated(By.xpath(elementXpath)),
            20000
        );
        this.elementContent = await element_.getAttribute('innerText');
        await callback(this.elementContent);
        return this;
    }

    async textTrans(text, callback) {
        text = await text.replace(/\s+/gi, '');
        text = await text.replace(/\\n/gi, '');
        text = await text.toLowerCase();
        await callback(text);
        return this;
    }
}

export let PastebinResults = new PageSitePastebinResults('chrome');
