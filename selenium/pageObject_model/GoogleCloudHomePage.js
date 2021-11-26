import pkg from 'selenium-webdriver';
const { Builder, Browser, By, wait, until, Key } = pkg;
import { BasicPage } from './BasicPage.js';

export class GoogleCloudHomePage extends BasicPage {
    constructor(driver) {
        super(driver);
        this.urlGoogleCloudHome = 'https://cloud.google.com';
        this.searchButtonXpath =
            '//input[@class="devsite-search-field devsite-search-query"]';
        this.linkCalculatorXpath =
            '//*[@data-ctorig="https://cloud.google.com/products/calculator"]/b';
        this.linkTwoForPricingXpath =
            '//a[@href="https://cloud.google.com/identity-platform/pricing?hl=en"]';
        this.linkTwoForCalculatorXpath =
            '//a[@href="/products/calculator#tab=identity-platform"]';
    }

    async openCalculator() {
        this.searchButton = await this.driver.wait(
            until.elementLocated(By.xpath(this.searchButtonXpath)),
            20000
        );
        await this.searchButton.click();
        await this.searchButton.sendKeys(
            'Google Cloud Platform Pricing Calculator',
            Key.ENTER
        );

        try {
            this.linkCalculator = await this.driver.wait(
                until.elementLocated(By.xpath(this.linkCalculatorXpath)),
                20000
            );

            await this.linkCalculator.click();
        } catch (error) {
            if (error.message.includes('Waiting for element')) {
                this.linkCalculator = await this.driver.wait(
                    until.elementLocated(By.xpath(this.linkTwoForPricingXpath)),
                    20000
                );
                await this.linkCalculator.click();

                this.linkCalculator = await this.driver.wait(
                    until.elementLocated(
                        By.xpath(this.linkTwoForCalculatorXpath)
                    ),
                    20000
                );
                await this.linkCalculator.click();
            } else {
                throw error;
            }
        }
    }
}

export let GoogleCloudHome = new GoogleCloudHomePage('chrome');
