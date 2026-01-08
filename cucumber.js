module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['features/step_definitions/**/*.ts'],
    format: [
      'progress',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json'
    ],
    publishQuiet: true
  }
}
