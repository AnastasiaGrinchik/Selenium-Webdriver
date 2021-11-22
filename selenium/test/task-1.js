import '@babel/polyfill';
import pkg from 'selenium-webdriver';
const { Builder, Browser, By, until, wait } = pkg;

import { HomePagePastebin } from './../../pageObject_model/index.js';

(async function () {
    await HomePagePastebin.initAndOpenBrowser();
    await HomePagePastebin.openPage(HomePagePastebin.urlHomePastebin);
    await HomePagePastebin.addNewPaste(HomePagePastebin.dataTextareaForTaskOne);

    await HomePagePastebin.fillSelect(
        HomePagePastebin.expirationSelectXpath,
        HomePagePastebin.expirationSelect,
        HomePagePastebin.expirationList,
        HomePagePastebin.expirationListXpath,
        HomePagePastebin.expirationItem,
        HomePagePastebin.expirationItemXpath
    );

    await HomePagePastebin.addPasteName(HomePagePastebin.dataTitleForTaskOne);
    await HomePagePastebin.sendPaste();
})();
