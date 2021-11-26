import { BasicPage } from './BasicPage.js';
import pkg from 'selenium-webdriver';
const { Builder, Browser, By, wait, until, Key } = pkg;
import { CompletedFormPage } from './CompletedFormPage.js';

export class YopmailHomePage extends CompletedFormPage {
    constructor(browser) {
        super(browser);
        this.urlYopmail = 'https://yopmail.com';
        this.buttonRandomEmailXpath =
            '//a[@href="email-generator"]//div[@class="txtlien"]';
        this.emailAdressXpath = '//*[@id="egen"]';
        this.buttonCheckEmailXpath = '//button[@onclick="egengo();"]';
        this.totalMonthCostXpath =
            '//*[@id="mail"]//h3[contains(text(), "USD")]';
        this.iframeMailXpath = '//iframe[@id="ifmail"]';
        this.buttonUpdateXpath = '//*[@id="refresh"]';
    }

    async openRandomEmail() {
        await this.driver.wait(
            until.elementLocated(By.xpath(this.buttonRandomEmailXpath)),
            20000
        );
        this.buttonRandomEmail = await this.driver.findElement(
            By.xpath(this.buttonRandomEmailXpath)
        );
        await this.buttonRandomEmail.click();
    }

    async getEmailAdress() {
        let email = await this.driver.wait(
            until.elementLocated(By.xpath(this.emailAdressXpath)),
            20000
        );
        this.emailContent = await email.getText();
    }

    async checkMail() {
        this.buttonCheckEmail = await this.driver.wait(
            until.elementLocated(By.xpath(this.buttonCheckEmailXpath))
        );

        await this.buttonCheckEmail.click();
    }

    async updateMail() {
        let buttonUpdate = await this.driver.wait(
            until.elementLocated(By.xpath(this.buttonUpdateXpath)),
            20000
        );

        await this.driver.wait(until.elementIsVisible(buttonUpdate), 20000);
        await buttonUpdate.click();
    }

    async getTotalCost() {
        try {
            let cost = await this.driver.wait(
                until.elementLocated(By.xpath(this.totalMonthCostXpath)),
                20000
            );

            this.totalMonthCost = await cost.getText();
        } catch (error) {
            if (error.message.includes('Waiting for element')) {
                await this.updateMail();

                let cost = await this.driver.wait(
                    until.elementLocated(By.xpath(this.totalMonthCostXpath)),
                    20000
                );

                this.totalMonthCost = await cost.getText();
            } else {
                throw error;
            }
        }
    }
}

export let YopmailHome = new YopmailHomePage('chrome');
