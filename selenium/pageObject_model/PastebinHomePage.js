import pkg from 'selenium-webdriver';
const { Builder, Browser, By, until, wait } = pkg;
import { BasicPage } from './BasicPage.js';

export class PastebinHomePage extends BasicPage {
    constructor(browser) {
        super(browser);
        this.urlPastebinHome = 'https://pastebin.com';
        this.formXpath = '//*[@id="w0"]';
        this.textareaXpath = '//*[@id="postform-text"]';
        this.buttonCloseBannerXpath = '//*[@id="hideSlideBanner"]';
        this.syntaxSelectXpath = '//*[@id="select2-postform-format-container"]';
        this.syntaxListXpath =
            '//*[@id="select2-postform-format-results"]/li[@class="select2-results__option"]/ul';
        this.expirationSelectXpath =
            '//*[@id="select2-postform-expiration-container"]';
        this.expirationListXpath =
            '//*[@id="select2-postform-expiration-results"]';
        this.itemXpath = '//li[contains(text(), "RAW")]';
        this.pasteTitleXpath = '//*[@id="postform-name"]';
        this.buttonCreateNewPasteXpath =
            '//*[@class="btn -big" and @type="submit"]';
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
    }

    async fillSelect(
        selectXpath,
        select,
        selectList,
        selectListXpath,
        selectItem,
        locatorXpath,
        optionText
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

        async function setSearchWordAndSelectOption(
            locatorXpath,
            optionText,
            browser
        ) {
            let itemLocator = await locatorXpath.replace('RAW', optionText);

            await browser.driver.wait(
                until.elementLocated(By.xpath(itemLocator)),
                20000
            );
            selectItem = await selectList.findElement(By.xpath(itemLocator));
            await selectItem.click();
        }

        async function selectOption(browser) {
            await setSearchWordAndSelectOption(
                locatorXpath,
                optionText,
                browser
            );
        }
        selectOption(this);
    }

    async getSelectBefore(selectXpath) {
        this.syntaxBefore = await this.driver
            .wait(until.elementLocated(By.xpath(selectXpath)), 20000)
            .getText();
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
    }

    async sendPaste() {
        this.buttonCreateNewPaste = await this.driver.wait(
            until.elementLocated(By.xpath(this.buttonCreateNewPasteXpath)),
            20000
        );
        await this.buttonCreateNewPaste.click();
    }
}

export let PastebinHome = new PastebinHomePage();
