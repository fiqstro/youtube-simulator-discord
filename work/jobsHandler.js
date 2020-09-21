const jobs = require('./jobs.js');
const chalk = require('chalk')
module.exports.run = client => {
  let jobIndex = 0;
  console.log(`${chalk.yellow("[LOADING]")} Loading jobs...`)
jobs.forEach(job => {
    jobIndex++;
    client.jobs.set(job.id, job)
  })
  console.log(`${chalk.green("[SUCSESS]")} Loaded all jobs!`)
};