/* eslint-disable */
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const AllureReporter = require('jasmine-allure-reporter');
const envName = process.env.TARGET_ENV || 'dev';
const _ = require('lodash');

const DEFAULT_TIMEOUT = 20000;

const specReporter = new SpecReporter({
    spec: {
        displayStacktrace: true
    }
});

const headless = process.env.HEADLESS === "true";

const envConfig = require('./config/' + envName); // Require additional config based on TARGET_ENV environment variable

const commonConfig = {
    framework: "jasmine2",

    specs: [
        'tests/signup.spec.js'
    ],

    directConnect: false,

    capabilities: {
        browserName: "chrome"
    },

    jasmineNodeOpts: {
        print: function () {},
        defaultTimeoutInterval: 80000
    },

    onPrepare: function () {
        jasmine.getEnv().addReporter(new AllureReporter({
            resultsDir: 'allure-results'
        }));
        jasmine.getEnv().afterEach(function (done) {
            browser.takeScreenshot().then(function (png) {
                allure.createAttachment('Screenshot', function () {
                    return new Buffer(png, 'base64')
                }, 'image/png')();
                done();
            })
        });

        browser.manage().timeouts().implicitlyWait(DEFAULT_TIMEOUT);
        browser.manage().timeouts().setScriptTimeout(DEFAULT_TIMEOUT);
        browser.manage().timeouts().pageLoadTimeout(DEFAULT_TIMEOUT);
        browser.driver.manage().window().setSize(1920, 1080);
        jasmine.getEnv().addReporter(specReporter);
    }
};

module.exports.config = _.merge(commonConfig, envConfig);
