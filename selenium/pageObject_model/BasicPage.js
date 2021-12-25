import pkg from 'selenium-webdriver';
const { Builder, Capabilities, Browser, By, until, wait } = pkg;

export class BasicPage {
    constructor() {
        this.browser = 'chrome';
    }

    async initBrowser() {
        this.driver = new Builder().forBrowser(this.browser).build();
        await this.driver;
        await this.driver.manage().window().maximize();
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
    }

    async switchTab(window) {
        await this.driver.switchTo().window(window);
    }
}

export let GoogleChrome = new BasicPage('chrome');

class Paste {
    constructor(pasteParametrs) {
        this.name = pasteParametrs.name;
        this.text = pasteParametrs.text;
        this.syntax = pasteParametrs.syntax;
        this.expirationTime = pasteParametrs.expirationTime;
    }
}

 class PasteFactory{
    constructor();
    getFirstPaste() {
        const pasteParametrs = {
            name: 'helloweb',
			text: 'Hello from WebDriver',
			expirationTime: '10 Minutes'
        } return new Paste(pasteParametrs)
    }   



let a = PasteFactory.getFirstPaste()
console.log(a)