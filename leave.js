const { Client } = require('discord.js-selfbot-v13');
require('dotenv').config();

const client = new Client({
    checkUpdate: false, 
});

const ALLOWED_GUILDS = ['0', '1']; 

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    
    for (const [id, guild] of client.guilds.cache) {
        if (!ALLOWED_GUILDS.includes(id)) {
            try {
                await guild.leave();
                console.log(`Left server: ${guild.name} (${id})`);
            } catch (error) {
                console.error(`Failed to leave ${guild.name}:`, error);
            }
        } else {
            console.log(`Skipped server: ${guild.name} (${id})`);
        }
    }

    console.log('Finished leaving servers.');
    process.exit(); 
});

client.login(process.env.TOKEN);
