import pkg from 'selenium-webdriver';
const { Builder, Browser, By, until, wait } = pkg;
import { CalculatorSitePage } from './CalculatorSitePage.js';

export class CalculatorCompletedForm extends CalculatorSitePage {
    constructor(driver) {
        super(driver);
        this.completedFormXpath = '//*[@id="resultBlock"]'; //*
        this.VMClassXpath = '//*[@id="compute"]/md-list/md-list-item[4]/div';
        this.instanceTypeXpath =
            '//*[@id="compute"]/md-list/md-list-item[5]/div[1]';
        this.regionXpath = '//*[@id="compute"]/md-list/md-list-item[1]/div';
        this.localSsdXpath =
            '//*[@id="compute"]/md-list/md-list-item[7]/div[1]';
        this.termXpath = '//*[@id="compute"]/md-list/md-list-item[3]/div';
        this.priceXpath =
            '//*[@id="resultBlock"]/md-card/md-card-content/div/div/div/h2/b';
        this.buttonAddEmailXpath = '//*[@id="email_quote"]';
        this.formEmailXpath = '//form[@name="emailForm"]';
        this.inputEmailXpath = '//input[@ng-model="emailQuote.user.email"]';
        this.buttonSendXpath =
            '//button[@ng-click="emailQuote.emailQuote(true); emailQuote.$mdDialog.hide()"]';
        this.buttonSendEmailXpath =
            '//*[@id="dialogContent_447"]/form/md-dialog-actions/button[2]';
        this.completedForm_ = null;
        this.VMClassText = null;
        this.instanceText = null;
        this.regionText = null;
        this.localSsdText = null;
        this.termText = null;
        this.priceText = null;
        this.buttonAddEmail = null;
        this.inputEmail = null;
        this.buttonSend = null;
    }

    async getTextFromForm(fieldXpath, callback) {
        await this.driver.wait(
            until.elementLocated(By.xpath(this.completedFormXpath)),
            20000
        );

        this.completedForm_ = await this.driver.findElement(
            By.xpath(this.completedFormXpath)
        );

        await this.driver.wait(
            until.elementLocated(By.xpath(fieldXpath)),
            20000
        );

        let field = await this.completedForm_.findElement(By.xpath(fieldXpath));
        let fieldText = await field.getText();
        await callback(fieldText);
        return this;
    }

    async addEmail() {
        this.completedForm_ = await this.driver.wait(
            until.elementLocated(By.xpath(this.completedFormXpath)),
            20000
        );

        await this.driver.wait(
            until.elementLocated(By.xpath(this.buttonAddEmailXpath)),
            20000
        );

        this.buttonAddEmail = await this.completedForm_.findElement(
            By.xpath(this.buttonAddEmailXpath)
        );

        await this.buttonAddEmail.click();
        return this;
    }

    async fillEmail(data) {
        this.form = await this.driver.wait(
            until.elementLocated(By.xpath(this.formEmailXpath)),
            20000
        );
        await this.driver.wait(
            until.elementLocated(By.xpath(this.inputEmailXpath)),
            20000
        );

        this.inputEmail = await this.form.findElement(
            By.xpath(this.inputEmailXpath)
        );

        await this.inputEmail.sendKeys(data);
        return this;
    }

    async sendEmail() {
        this.form = await this.driver.wait(
            until.elementLocated(By.xpath(this.formEmailXpath)),
            20000
        );

        await this.driver.wait(
            until.elementLocated(By.xpath(this.buttonSendXpath)),
            20000
        );

        this.buttonSend = await this.form.findElement(
            By.xpath(this.buttonSendXpath)
        );

        await this.buttonSend.click();
        return this;
    }
}

export let CompletedForm = new CalculatorCompletedForm('chrome');
