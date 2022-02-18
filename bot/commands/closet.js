const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports = {
    name: "closet",
    cooldown: 5,
    aliases: ["end"],

    run: async function(client, message, args) {
        try {
            if (!message.channel.name.includes("ticket-")) {
                message.react('⚠');
                message.channel.send({
                    embed: {
                        title: `**<a:glt:929681265752412180> | Error**`,
                        description: `This is not a ticket channel`,
                        color: 0xFF0000
                    }
                }).then(async function(msg) {
                    setTimeout(() => {
                        msg.delete().catch(err => { return })
                    }, 1000 * 7);
                })
                return
            }
            let btn = new MessageButton()
                .setStyle("green")
                .setEmoji("✅")
                .setID("closeTicketTrue");
            let btn2 = new MessageButton()
                .setStyle("grey")
                .setEmoji("⛔")
                .setID("closeTicketFalse");
            let row = new MessageActionRow()
                .addComponent(btn)
                .addComponent(btn2);
            message.channel.send({
                embed: {
                    title: `**<a:t3gb:929797409444343878> | Confirmation**`,
                    description: `Are you sure about closing this ticket?`,
                    color: 0xFFF200
                },
                component: row
            }).then(async function(msg) {
                setTimeout(() => {
                    msg.delete().catch(err => { return })
                }, 1000 * 10);
                require('quick.db').set(`DeleteMessage_${message.channel.id}`, msg.id)
            })
        } catch (err) {
            return;
        }
    }
}