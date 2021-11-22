import '@babel/polyfill';
import chai from 'chai';
import { expect } from 'chai';
import pkg from 'selenium-webdriver';
const { Builder, Browser, By, until, wait } = pkg;
import {
    HomePagePastebin,
    PastebinResults,
} from '../../../pageObject_model/index.js';

describe('New page contains', function () {
    before(async function a() {
        await PastebinResults.initAndOpenBrowser();
        await PastebinResults.openPage(HomePagePastebin.urlHomePastebin);
        await PastebinResults.addNewPaste(
            HomePagePastebin.dataTextareaForTaskTwo
        );

        await PastebinResults.fillSelect(
            HomePagePastebin.syntaxSelectXpath,
            HomePagePastebin.syntaxSelect,
            HomePagePastebin.syntaxList,
            HomePagePastebin.syntaxListXpath,
            HomePagePastebin.syntaxItem,
            HomePagePastebin.syntaxItemXpath
        );

        await PastebinResults.fillSelect(
            HomePagePastebin.expirationSelectXpath,
            HomePagePastebin.expirationSelect,
            HomePagePastebin.expirationList,
            HomePagePastebin.expirationListXpath,
            HomePagePastebin.expirationItem,
            HomePagePastebin.expirationItemXpath
        );

        await PastebinResults.addPasteName(
            HomePagePastebin.dataTitleForTaskTwo
        );
        await PastebinResults.sendPaste();
        await PastebinResults.getTitleBrowsertab();

        PastebinResults.resultSyntaxBashConfig =
            await PastebinResults.checkSyntaxBash(
                PastebinResults.syntaxBashConfigXpath,
                PastebinResults.commandColour
            );

        PastebinResults.resultSyntaxBashReset =
            await PastebinResults.checkSyntaxBash(
                PastebinResults.syntaxBashResetXpath,
                PastebinResults.commandColour
            );

        PastebinResults.resultSyntaxBashCommit =
            await PastebinResults.checkSyntaxBash(
                PastebinResults.syntaxBashCommitXpath,
                PastebinResults.commandColour
            );

        PastebinResults.resultSyntaxBashThree =
            await PastebinResults.checkSyntaxBash(
                PastebinResults.syntaxBashThreeXpath,
                PastebinResults.commandColour
            );

        PastebinResults.resultSyntaxBashPush =
            await PastebinResults.checkSyntaxBash(
                PastebinResults.syntaxBashPushXpath,
                PastebinResults.commandColour
            );

        PastebinResults.resultSyntaxBashGlobal =
            await PastebinResults.checkSyntaxBash(
                PastebinResults.syntaxBashGlobalXpath,
                PastebinResults.flagColour
            );

        PastebinResults.resultSyntaxBashM =
            await PastebinResults.checkSyntaxBash(
                PastebinResults.syntaxBashMXpath,
                PastebinResults.flagColour
            );

        PastebinResults.resultSyntaxBashForce =
            await PastebinResults.checkSyntaxBash(
                PastebinResults.syntaxBashForceXpath,
                PastebinResults.flagColour
            );

        PastebinResults.resultSyntaxTextName =
            await PastebinResults.checkSyntaxBash(
                PastebinResults.syntaxBashTextNameXpath,
                PastebinResults.titleColour
            );

        PastebinResults.resultSyntaxTextCommit =
            await PastebinResults.checkSyntaxBash(
                PastebinResults.syntaxBashTextCommitXpath,
                PastebinResults.titleColour
            );

        await PastebinResults.getContentSavedElement(
            PastebinResults.savedTextAreaXpath,
            async function (text) {
                PastebinResults.resultTextarea = await text;
            }
        );

        await PastebinResults.textTrans(
            PastebinResults.resultTextarea,
            async function (a) {
                PastebinResults.resultTextarea = await a;
            }
        );

        await PastebinResults.textTrans(
            PastebinResults.dataTextareaForTaskTwo,
            async function (a) {
                HomePagePastebin.dataTextareaForTaskTwo = await a;
            }
        );
    });
    after(async function () {
        await PastebinResults.closeBrowser();
    });
    describe('Data entered in the input "Paste title"', function () {
        it('Save to tab', function () {
            expect(PastebinResults.titleBrowserTab).to.include(
                HomePagePastebin.dataTitleForTaskTwo
            );
        });
    });
    describe('Data entered in the input "Paste title"', function () {
        it('Syntax highlighting commands', function () {
            expect(PastebinResults.resultSyntaxBashConfig).to.be.true;
        });
        it('Syntax highlighting commands', function () {
            expect(PastebinResults.resultSyntaxBashReset).to.be.true;
        });
        it('Syntax highlighting commands', function () {
            expect(PastebinResults.resultSyntaxBashCommit).to.be.true;
        });
        it('Syntax highlighting commands', function () {
            expect(PastebinResults.resultSyntaxBashThree).to.be.true;
        });
        it('Syntax highlighting commands', function () {
            expect(PastebinResults.resultSyntaxBashPush).to.be.true;
        });
        it('Syntax highlighting flags', function () {
            expect(PastebinResults.resultSyntaxBashGlobal).to.be.true;
        });
        it('Syntax highlighting flags', function () {
            expect(PastebinResults.resultSyntaxBashM).to.be.true;
        });
        it('Syntax highlighting flags', function () {
            expect(PastebinResults.resultSyntaxBashForce).to.be.true;
        });
        it('Syntax highlighting titles', function () {
            expect(PastebinResults.resultSyntaxTextName).to.be.true;
        });
        it('Syntax highlighting titles', function () {
            expect(PastebinResults.resultSyntaxTextCommit).to.be.true;
        });
    });

    describe('The entered data is saved in the appropriate fields', function () {
        it('Textarea field', function () {
            expect(PastebinResults.resultTextarea).to.be.equal(
                HomePagePastebin.dataTextareaForTaskTwo
            );
        });
    });
});
