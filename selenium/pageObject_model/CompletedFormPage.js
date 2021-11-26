import pkg from 'selenium-webdriver';
const { Builder, Browser, By, until, wait } = pkg;
import { CalculatorHomePage } from './CalculatorHomePage.js';

export class CompletedFormPage extends CalculatorHomePage {
    constructor(browser) {
        super(browser);
        this.CompletedFormXpath = '//*[@id="resultBlock"]';
        this.VMClassXpath =
            '//*[@id="compute"]//div[contains(text(), "VM class")]';
        this.instanceTypeXpath =
            '//*[@id="compute"]//div[contains(text(), "Instance type")]';
        this.regionXpath =
            '//*[@id="compute"]//div[contains(text(), "Region")]';
        this.localSSDXpath =
            '//*[@id="compute"]//div[contains(text(), "Local SSD")]';
        this.termXpath =
            '//*[@id="compute"]//div[contains(text(), "Commitment term")]';
        this.priceXpath =
            '//*[@id="resultBlock"]//b[contains(text(), "Total Estimated Cost:")]';
        this.buttonAddEmailXpath = '//*[@id="email_quote"]';
        this.formEmailXpath = '//form[@name="emailForm"]';
        this.inputEmailXpath = '//input[@ng-model="emailQuote.user.email"]';
        this.buttonSendEmailXpath = '//button[@aria-label="Send Email"]';
    }

    async getTextFromForm(object, key, fieldXpath) {
        await this.driver.wait(
            until.elementLocated(By.xpath(this.CompletedFormXpath)),
            20000
        );

        let completedForm = await this.driver.findElement(
            By.xpath(this.CompletedFormXpath)
        );

        await this.driver.wait(
            until.elementLocated(By.xpath(fieldXpath)),
            20000
        );

        let field = await completedForm.findElement(By.xpath(fieldXpath));
        field = await field.getAttribute('innerText');
        object[key] = await field;
    }

    async getAllField(obj) {
        await this.getTextFromForm(obj, 'VMClass', obj.VMClassXpath);
        await this.getTextFromForm(obj, 'region', obj.regionXpath);
        await this.getTextFromForm(obj, 'localSSD', obj.localSSDXpath);
        await this.getTextFromForm(obj, 'term', obj.termXpath);
        await this.getTextFromForm(obj, 'instanceType', obj.instanceTypeXpath);
        await this.getTextFromForm(obj, 'price', obj.priceXpath);
    }

    async addEmail() {
        this.completedForm = await this.driver.wait(
            until.elementLocated(By.xpath(this.CompletedFormXpath)),
            20000
        );

        await this.driver.wait(
            until.elementLocated(By.xpath(this.buttonAddEmailXpath)),
            20000
        );

        this.buttonAddEmail = await this.completedForm.findElement(
            By.xpath(this.buttonAddEmailXpath)
        );

        await this.buttonAddEmail.click();
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
    }

    async sendEmail() {
        this.form = await this.driver.wait(
            until.elementLocated(By.xpath(this.formEmailXpath)),
            20000
        );

        await this.driver.wait(
            until.elementLocated(By.xpath(this.buttonSendEmailXpath)),
            20000
        );

        this.buttonSend = await this.form.findElement(
            By.xpath(this.buttonSendEmailXpath)
        );

        await this.buttonSend.click();
    }
}

export let CompletedForm = new CompletedFormPage('chrome');
