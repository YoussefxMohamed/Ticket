const chalk = require("chalk");
const figlet = require("figlet");

module.exports = async function (client) {
  console.log(chalk.yellow.bold(figlet.textSync("Turbo Bot")));
  await console.log(
    chalk.red.bold(client.user.tag) + chalk.blue.bold(" Is Ready")
  );

  await client.user.setActivity(require("../../config/bot").prefix + "helpT");
  const request = require("node-superfetch");
  setInterval(async () => {
    try {
      const { body } = await request.get(require("../../config/bot").expressURL);
      console.log(body);
    } catch (err) {
      console.error(err);
    }
  }, 5000)
  await client.user.setStatus("idle");
};
