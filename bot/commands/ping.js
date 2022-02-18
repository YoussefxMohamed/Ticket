const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    cooldown: 7,
    aliases: ["ping"],
    run: async(client, message) => {
        try {
            var states = "🟢 Excellent";
            var states2 = "🟢 Excellent";
            var msg = `${Date.now() - message.createdTimestamp}`;
            var api = `${Math.round(client.ws.ping)}`;
            if (Number(msg) > 70) states = "🟢 Good";
            if (Number(msg) > 170) states = "🟡 Not Bad";
            if (Number(msg) > 350) states = "🔴 Soo Bad";
            if (Number(api) > 70) states2 = "🟢 Good";
            if (Number(api) > 170) states2 = "🟡 Not Bad";
            if (Number(api) > 350) states2 = "🔴 Soo Bad";
            if (message.author.bot) return;
            message.channel.send(
                new MessageEmbed()
                .setColor("YELLOW")
                .setAuthor("Turbo Bot", "https://cdn.discordapp.com/avatars/880647915595518023/c33967a0863b74a932a0c11654fb1734.png?size=4096")
                .addField("**Time Taken:**", msg + " ms 📶 | " + states, true)
                .addField("**WebSocket:**", api + " ms 📶 | " + states2, true)
                .setFooter(`${message.author.tag}`)
            );
        } catch (err) {
            return;
        }
    }
};