import pkg from 'selenium-webdriver';
const { Builder, Browser, By, wait, until, Key } = pkg;
import { Basic } from './Basic.js';

export class HomePageSiteGoogleCloud extends Basic {
    constructor(driver) {
        super(driver);
        this.urlHomeGoogleCloud = 'https://cloud.google.com';
        this.searchButtonXpath =
            '//input[@class="devsite-search-field devsite-search-query"]';
        this.linkCalculatorXpath =
            '//*[@data-ctorig="https://cloud.google.com/products/calculator"]/b';
        this.linkTwoForPricingXpath =
            '//a[@href="https://cloud.google.com/identity-platform/pricing?hl=en"]';
        this.linkTwoForCalculatorXpath =
            '//a[@href="/products/calculator#tab=identity-platform"]';
        this.dataForSearchCalculator =
            'Google Cloud Platform Pricing Calculator';
        this.searchButton = null;
        this.linkCalculator = null;
    }

    async openCalculator() {
        this.searchButton = await this.driver.wait(
            until.elementLocated(By.xpath(this.searchButtonXpath)),
            20000
        );
        await this.searchButton.click();
        await this.searchButton.sendKeys(
            this.dataForSearchCalculator,
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

export let HomePageGoogleCloud = new HomePageSiteGoogleCloud('chrome');
