import '@babel/polyfill';
import chai from 'chai';
import { expect } from 'chai';
import pkg from 'selenium-webdriver';
const { Builder, Browser, By, until, wait } = pkg;
import {
    PastebinHome,
    PastebinResults,
} from '../../../pageObject_model/index.js';

describe('New page contains', function () {
    before(async function () {
        await PastebinResults.initBrowser();
        await PastebinResults.openPage(PastebinHome.urlPastebinHome);
        await PastebinResults.addNewPaste(
            'git config --global user.name  "New Sheriff in Town"' +
                '\n' +
                'git reset $(git commit-tree HEAD^{tree} -m "Legacy code")' +
                '\n' +
                'git push origin master --force'
        );

        await PastebinResults.fillSelect(
            PastebinHome.syntaxSelectXpath,
            PastebinHome.syntaxSelect,
            PastebinHome.syntaxList,
            PastebinHome.syntaxListXpath,
            PastebinHome.syntaxItem,
            PastebinHome.itemXpath,
            'Bash'
        );

        await PastebinResults.fillSelect(
            PastebinHome.expirationSelectXpath,
            PastebinHome.expirationSelect,
            PastebinHome.expirationList,
            PastebinHome.expirationListXpath,
            PastebinHome.expirationItem,
            PastebinHome.itemXpath,
            '10 Minutes'
        );
        await PastebinResults.getSelectBefore(PastebinHome.syntaxSelectXpath);
        await PastebinResults.addPasteName(
            'how to gain dominance among developers'
        );
        await PastebinResults.sendPaste();
        await PastebinResults.getTitleBrowsertab(
            'how to gain dominance among developers'
        );
        await PastebinResults.getSyntaxAfter(PastebinResults.savedSyntaxXpath);

        await PastebinResults.getContentSavedElement(
            PastebinResults.savedTextAreaXpath
        );
        await PastebinResults.transformText(
            PastebinResults,
            'savedContentTextarea',
            PastebinResults.savedContentTextarea
        );
        await PastebinResults.transformText(
            PastebinHome,
            'dataTextareaForTaskTwo',
            PastebinResults.dataTextareaForTaskTwo
        );
    });
    // after(async function () {
    //     await PastebinResults.closeBrowser();
    // });
    it('Data entered in the input "Paste title" save to tab', function () {
        expect(PastebinResults.titleBrowserTab).to.include(
            'how to gain dominance among developers'
        );
    });
    it('The syntax matches the selected ', function () {
        expect(PastebinResults.syntaxBefore).to.be.equal(
            PastebinResults.syntaxAfter
        );
    });

    it('Data entered in the input "Paste title" save to textarea field', function () {
        expect(PastebinResults.savedContentTextarea).to.deep.equal(
            PastebinHome.dataTextareaForTaskTwo
        );
    });
});
