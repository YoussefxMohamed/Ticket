require("./server/express");
const { Client, Collection } = require("discord.js");
const client = new Client();
require('discord-buttons')(client);
const chalk = require("chalk");
const fs = require("fs");
const { MessageEmbed } = require("discord.js");

client.commands = new Collection();

fs.readdir(__dirname + "/bot/events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let event = require(__dirname + "/bot/events/" + file);
        let eventName = file.split(".")[0];
        console.log(
            chalk.blue.bold("Loading event ") + chalk.magenta.bold(`"${eventName}"`)
        );
        client.on(eventName, event.bind(null, client));
    });
});

fs.readdir(__dirname + "/bot/commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(__dirname + "/bot/commands/" + file);
        let commandName = file.split(".")[0];
        console.log(
            chalk.blue.bold("Loading command ") + chalk.red.bold(`"${commandName}"`)
        );
        client.commands.set(commandName, props);
    });
});

/// send message time
client.on('ready', () => {
  setInterval(function() {
  let asar1 = client.channels.cache.find(ch => ch.id === '939794527433158770')
     if(client){
  const client = new Client();
  let embed = new MessageEmbed()
  .setColor("#FF0000")
  .setDescription(`**BOT TICKET ONLINE 🟢**`)
     asar1.send(embed)
     }
    }, 60000)
});



client.login(require("./config/bot").token).catch(err => console.log(chalk.red.bold(err)))