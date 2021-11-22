import pkg from 'selenium-webdriver';
const { Builder, Browser, By, until, wait } = pkg;
import { Basic } from './Basic.js';

export class HomePageSitePastebin extends Basic {
    constructor(driver) {
        super(driver);
        this.urlHomePastebin = 'https://pastebin.com';
        this.formXpath = '//*[@id="w0"]';
        this.textareaXpath = '//*[@id="postform-text"]';
        this.buttonCloseBannerXpath = '//*[@id="hideSlideBanner"]';
        this.syntaxSelectXpath = '//*[@id="select2-postform-format-container"]';
        this.expirationSelectXpath =
            '//*[@id="select2-postform-expiration-container"]';
        this.syntaxListXpath =
            '//*[@id="select2-postform-format-results"]/li[2]/ul';
        this.expirationListXpath =
            '//*[@id="select2-postform-expiration-results"]';
        this.syntaxItemXpath = '//li[contains(text(), "Bash")]';
        this.expirationItemXpath = '//li[contains(text(), "10 Minutes")]';
        this.pasteTitleXpath = '//*[@id="postform-name"]';
        this.buttonCreateNewPasteXpath =
            '//*[@class="btn -big" and @type="submit"]';
        this.form = null;
        this.fieldOfPaste = null;
        this.buttonCreateNewPaste = null;
        this.pasteTitle = null;
        this.frameBanner = null;
        this.syntaxSelect = null;
        this.syntaxList = null;
        this.syntaxItem = null;
        this.expirationSelect = null;
        this.expirationItem = null;
        this.expirationList = null;
        this.pasteTitleText = null;
        this.buttonCloseBanner = null;
        this.dataTitleForTaskOne = 'helloweb';
        this.dataTitleForTaskTwo = 'how to gain dominance among developers';
        this.dataTextareaForTaskOne = 'Код: "Hello from WebDriver"';
        this.dataTextareaForTaskTwo =
            'git config --global user.name  "New Sheriff in Town"' +
            '\n' +
            'git reset $(git commit-tree HEAD^{tree} -m "Legacy code")' +
            '\n' +
            'git push origin master --force';
    }

    async addNewPaste(data) {
        this.fieldOfPaste = await this.driver.wait(
            until.elementLocated(By.xpath(this.textareaXpath)),
            20000
        );
        await this.fieldOfPaste.sendKeys(data);
        return this;
    }

    async fillSelect(
        selectXpath,
        select,
        selectList,
        selectListXpath,
        selectItem,
        selectItemXpath
    ) {
        await this.driver.wait(
            until.elementLocated(By.xpath(this.formXpath)),
            20000
        );
        this.form = await this.driver.findElement(By.xpath(this.formXpath));

        await this.driver.wait(
            until.elementLocated(By.xpath(selectXpath)),
            20000
        );

        select = await this.form.findElement(By.xpath(selectXpath));

        try {
            await select.click();
        } catch (error) {
            if (error.message.includes('element click intercepted')) {
                this.buttonCloseBanner = await this.driver.wait(
                    until.elementLocated(By.xpath(this.buttonCloseBannerXpath)),
                    20000
                );
                await this.buttonCloseBanner.click();
                await select.click();
            } else {
                throw error;
            }
        }

        await this.driver.wait(
            until.elementLocated(By.xpath(selectListXpath)),
            20000
        );
        selectList = await this.driver.findElement(By.xpath(selectListXpath));

        await this.driver.wait(
            until.elementLocated(By.xpath(selectItemXpath)),
            20000
        );
        selectItem = await selectList.findElement(By.xpath(selectItemXpath));
        await selectItem.click();
        return this;
    }

    async addPasteName(titleContent) {
        await this.driver.wait(
            until.elementLocated(By.xpath(this.pasteTitleXpath)),
            20000
        );
        this.pasteTitle = await this.form.findElement(
            By.xpath(this.pasteTitleXpath)
        );
        await this.pasteTitle.sendKeys(titleContent);
        this.pasteTitleText = await this.pasteTitle.getText();
        return this;
    }

    async sendPaste() {
        this.buttonCreateNewPaste = await this.driver.wait(
            until.elementLocated(By.xpath(this.buttonCreateNewPasteXpath)),
            20000
        );
        await this.buttonCreateNewPaste.click();
        return this;
    }
}

export let HomePagePastebin = new HomePageSitePastebin('chrome');
