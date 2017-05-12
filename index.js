const Discord = require("discord.js");
const bot = new Discord.Client();
const ranks = require("./config/ranks.json");
const config = require("./config/config.json");
const commandError = ':negative_squared_cross_mark: Also ich hab keinen Plan was du von mir willst.';

bot.on('ready', () => {
    console.log('[OK] Eingeloggt als Benutzer "' + bot.user.username + '" mit Token "' + config.token + '"');
        bot.user.setGame('Flozzed.de')
        console.log('[OK] Status gesetzt')
});

//Commands
bot.on('message', message => {
    if(message.author.bot) return;
    if(!message.content.startsWith(config.prefix)) return;

    let command = message.content.split(" ")[0];
    command = command.slice(config.prefix.length);
    console.log('[IN] ' + message.author.username + '/'+ message.author.id + ': !' + command);
    let args = message.content.split(" ").slice(1);

    if(command === 'ping') {
        message.channel.send(':ping_pong: Pong!');
    }

    if(command === 'avatar') {
        if(args.length === 0) {
            message.channel.send(':art: Deinen Avatar findest du unter ' + message.author.avatarURL);
        } else
        if(message.mentions.users.size === 1) {
            let currentuser = message.mentions.users.first()
            message.channel.send(':art: Den Avatar von ' + currentuser + '  findest du unter ' + currentuser.avatarURL);
        } else
        message.channel.send(commandError);
    }

    if(command === 'rolle') {
        if(args.length === 1) {
            let role = message.guild.roles.find("name", args[0]);
            let member = message.member;
            if(message.member.roles.has(role.id)) {
                member.removeRole(role).catch(console.error);
                message.channel.send(':wrench: ' + member + ' hat nun nicht mehr die Rolle **' + role.name + '**!')
            } else {
                member.addRole(role).catch(console.error);
                message.channel.send(':wrench: ' + member + ' hat nun die Rolle **' + role.name + '**!')
            }
        }
    }

    if(command === 'rank') {
        if(args.length >= 1) {
            let game = args[0];
            console.log("[OK] 0 Detected Game: " + game);
            console.log("[LOG] Log Data " + ranks["league"]["rankids"].length);
            /*for (var i = 1; i < ranks.league.length; i++) { 
                //from 0 to amount of rank ids in game

                console.log("[OK] 1");
                member.removeRole(ranks.league.rankids[i]); 
                //remove from role ranks.league.rankids[i]

                console.log('[OK] 2');
            }*/
        }
    }
});


//Bot Login
bot.login(config.token);