exports.config = {
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost:3000',
      show: process.env.BROWSER == "false" ? false : true
    }
  },
  include: {
    I: './steps_file.js'
  },
  mocha: {},
  bootstrap: null,
  teardown: null,
  hooks: [],
  gherkin: {
    features: './features/*.feature',
    steps: ['./step_definitions/steps.js']
  },
  plugins: {
    screenshotOnFail: {
      enabled: true
    }
  },
  tests: './*_test.js',
  name: 'tests',
  translation: 'ru-RU'
}