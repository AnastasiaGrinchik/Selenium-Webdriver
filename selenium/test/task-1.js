import '@babel/polyfill';
import pkg from 'selenium-webdriver';
const { Builder, Browser, By, until, wait } = pkg;

import { PastebinHome } from '../pageObject_model/index.js';

(async function () {
    await PastebinHome.initBrowser();
    await PastebinHome.openPage(PastebinHome.urlPastebinHome);
    await PastebinHome.addNewPaste('Hello from WebDriver');

    await PastebinHome.fillSelect(
        PastebinHome.expirationSelectXpath,
        PastebinHome.expirationSelect,
        PastebinHome.expirationList,
        PastebinHome.expirationListXpath,
        PastebinHome.expirationItem,
        PastebinHome.itemXpath,
        '10 Minutes'
    );

    await PastebinHome.addPasteName('helloweb');
    await PastebinHome.sendPaste();
})();
