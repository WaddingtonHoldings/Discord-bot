require('dotenv').config();
const { REST, Routes } = require('discord.js');
const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;
const COMMAND = process.env.COMMAND;

const commands = [
    {
        name: COMMAND,
        description: 'Prompt for the image generation',
        options: [
            {
                name: 'text',
                type: 3, // 3 is string
                description: 'The prompt text to send',
                required: true,
            },
        ],
    },
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        // Use this line for guild-specific registration (faster for testing)
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });

        // Use this line for global registration (takes up to an hour to update)
        // await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();