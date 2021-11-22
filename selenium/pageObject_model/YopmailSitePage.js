import { Basic } from './Basic.js';
import pkg from 'selenium-webdriver';
const { Builder, Browser, By, wait, until, Key } = pkg;
import { CalculatorCompletedForm } from './CalculatorCompletedForm.js';

export class YopmailSitePage extends CalculatorCompletedForm {
    constructor(driver) {
        super(driver);
        this.urlYopmail = 'https://yopmail.com';
        this.buttonRandomEmailXpath = '//*[@id="listeliens"]/a[1]/div[2]';
        this.emailAdressXpath = '//*[@id="egen"]';
        this.buttonCheckEmailXpath = '//button[@onclick="egengo();"]';
        this.totalMonthCostXpath =
            '//*[@id="mail"]/div/div/table/tbody/tr[2]/td/table/tbody/tr[3]/td[2]/h3';
        this.iframeMailXpath = '//iframe[@id="ifmail"]';
        this.buttonUpdateXpath = '//*[@id="refresh"]';
        this.iframeMail = null;
        this.buttonRandomEmail = null;
        this.checkEmail = null;
        this.emailContent = null;
        this.totalMonthCost = null;
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
        return this;
    }

    async getEmailAdress() {
        let email = await this.driver.wait(
            until.elementLocated(By.xpath(this.emailAdressXpath)),
            20000
        );
        this.emailContent = await email.getText();
        return this;
    }

    async checkMail() {
        this.buttonCheckEmail = await this.driver.wait(
            until.elementLocated(By.xpath(this.buttonCheckEmailXpath))
        );

        await this.buttonCheckEmail.click();
        return this;
    }

    async updateMail() {
        let buttonUpdate = await this.driver.wait(
            until.elementLocated(By.xpath(this.buttonUpdateXpath)),
            20000
        );

        await this.driver.wait(until.elementIsVisible(buttonUpdate), 20000);
        await buttonUpdate.click();
        return this;
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
        return this;
    }
}

export let YopmailPage = new YopmailSitePage('chrome');
