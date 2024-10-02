const { defineConfig } = require("cypress");
const { connect } = require('./cypress/support/mongo')

const allureWriter = require('@shelex/cypress-allure-plugin/writer')

require('dotenv').config()

module.exports = defineConfig({
  e2e: {
    watchForFileChanges: false,
    async setupNodeEvents(on, config) {
      // implement node event listeners here
      allureWriter(on, config)
      const db = await connect()

      on('task', {
        async removeUser(email) {
          const users = db.collection('users')
          await users.deleteMany({ email: email })
          return null
        },
        async removeTask(taskName, emailUser) {
          const users = db.collection('users')
          const user = users.findOne({ email: emailUser })

          const tasks = db.collection('tasks')
          await tasks.deleteMany({ name: taskName, user: user._id })
          return null
        },
        async removeTaskLike(key) {
          const tasks = db.collection('tasks')
          await tasks.deleteMany({ name: { $regex: key } })
          return null
        },
        

      })

      return config
    },
    baseUrl: process.env.BASE_URL,
    video: false,
    screenshotsFolder: false,
    screenshotOnRunFailure: false,
    env: {
      ampqHost: process.env.AMPQ_HOST,
      ampqQueue: process.env.AMPQ_QUEUE,
      ampqToken: process.env.AMPQ_TOKEN,
      allure: true
    }
  },
});
