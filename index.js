require('dotenv').config();
const { Client, GatewayIntentBits, InteractionType } = require('discord.js');
const axios = require('axios');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('interactionCreate', async (interaction) => {
    if (interaction.type === InteractionType.ApplicationCommand && interaction.commandName === process.env.COMMAND) {
        const promptText = interaction.options.getString('text');

        try {
            await interaction.deferReply();
            
            // Fetch the reply to get the message object
            const replyMessage = await interaction.fetchReply();
            const messageId = replyMessage.id; // Get the message ID
            const channelId = interaction.channelId; // Get the channel ID
            
            await axios.post(process.env.MAKE_WEBHOOK_URL, {
                prompt: promptText,
                author: interaction.user.username,
                channel: interaction.channel.name,
                userId: interaction.user.id,
                messageId: messageId, // Include the message ID
                channelId: channelId  // Include the channel ID
            });
            
        } catch (error) {
            console.error('Error sending prompt to Make.com:', error);
            await interaction.editReply('Failed to send the prompt.');
        }
    }
});

client.login(process.env.TOKEN);