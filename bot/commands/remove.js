module.exports = {
    name: "remove",
    cooldown: 6,
    aliases: ['get-out'],

    run: async function(client, message, args) {
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
                }, 1000 * 10);
            })
            return
        }
        message.channel.overwritePermissions([{
            id: require('quick.db').fetch(`TicketControl_${message.channel.id}`),
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
        }, {
            id: require('quick.db').fetch(`TicketAdminRole_${message.guild.id}`),
            allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
        }, {
            id: message.guild.roles.everyone,
            deny: ["VIEW_CHANNEL"]
        }]).then(() => {
            message.react('✅');
            message.channel.send({
                embed: {
                    title: '<a:s7gamda:929797437193867304> | Done',
                    description: `the ticket permission has been rested to default`,
                    color: 0x00D700
                }
            }).then(async function(msg) {
                setTimeout(() => {
                    msg.delete().catch(err => { return })
                }, 1000 * 10);
            })
        })
    }
}