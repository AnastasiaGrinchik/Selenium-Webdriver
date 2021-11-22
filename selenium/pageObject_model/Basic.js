import pkg from 'selenium-webdriver';
const { Builder, Capabilities, Browser, By, until, wait } = pkg;

export class Basic {
    constructor(driver) {
        this.driver = driver;
        this.totalCost = null;
        this.firstTab = null;
        this.allTabs = null;
        this.originalWindow = null;
        this.childWindow = null;
    }

    async initAndOpenBrowser() {
        this.driver = await new Builder().forBrowser(this.driver).build();
        await this.driver;
        await this.driver.manage().window().maximize();
        return this;
    }

    async openPage(url) {
        await this.driver.get(url);
    }

    async closeBrowser() {
        await this.driver.quit();
    }

    async openAndSwitchNewTab() {
        this.originalWindow = await this.driver.getWindowHandle();
        await this.driver.switchTo().newWindow('tab');
        this.childWindow = await this.driver.getWindowHandle();
        return this;
    }

    async switchTab(window_) {
        await this.driver.switchTo().window(window_);
        return this;
    }
}

export let GoogleChrome = new Basic('chrome');
