const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports = {
    name: "rename",
    cooldown: 5,
    aliases: ["re"],

    run: async function(client, message, args) {
        try {
            var renameMessage = args.join(' ');
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
                    }, 1000 * 10);
                })
                return
            }
            if (!message.member.hasPermission('MANAGE_CHANNELS')) {
                message.react('⚠');
                message.channel.send({
                  
                    embed: {
                        title: `**<a:glt:929681265752412180> | Error**`,
                        description: `you need same permissions to use this command`,
                        color: 0xFF0000
                    }
                }).then(async function(msg) {
                    setTimeout(() => {
                        msg.delete().catch(err => { return })
                    }, 1000 * 7);
                })
                return
            }
            if (!renameMessage) {
                message.react('⚠');
                message.channel.send({
                    embed: {
                        title: `**<a:glt:929681265752412180> | Error**`,
                        description: `you need same permissions to use this command`,
                        color: 0xFF0000
                    }
                }).then(async function(msg) {
                    setTimeout(() => {
                        msg.delete().catch(err => { return })
                    }, 1000 * 10);
                })
                return
            }
            let btn = new MessageButton()
                .setStyle("green")
                .setEmoji("✅")
                .setID("renameTicketTrue");
            let btn2 = new MessageButton()
                .setStyle("grey")
                .setEmoji("⛔")
                .setID("renameTicketFalse");
            let row = new MessageActionRow()
                .addComponent(btn)
                .addComponent(btn2);
            message.channel.send({
                embed: {
                    title: `**<a:t3gb:929797409444343878> | Confirmation**`,
                    description: `Are you sure about rename this ticket?`,
                    color: 0xFFF200
                },
                component: row
            }).then(async function(msg) {
                setTimeout(() => {
                    msg.delete().catch(err => { return })
                }, 1000 * 10);
                require('quick.db').set(`RenameTicket_${message.channel.id}`, renameMessage)
                require('quick.db').set(`DeleteRenameMessage_${message.channel.id}`, msg.id)
            })
        } catch (err) {
            return;
        }
    }
}