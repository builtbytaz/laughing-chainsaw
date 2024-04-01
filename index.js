// Import necessary modules and initialize environment variables
const { Client, GatewayIntentBits, ChannelType } = require('discord.js');
require('dotenv').config();
const BOT_TOKEN = process.env.token;
const PREFIX = process.env.prefix;

// Initialize Discord client with specific intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages
    ]
});

// Operation queue for managing commands to avoid rate limits
const operationQueue = [];
let isProcessingQueue = false;

// Log in confirmation
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Listen for messages to handle commands
client.on('messageCreate', async message => {


    const args = message.content.slice(PREFIX.length).trim().split(/\s+/);
    const command = args.shift().toLowerCase();

    if (['scramblechannels', 'scramble', 'resetnicks'].includes(command)) {
        queueOperation(command, message);
    }
});

// Function to delay operations and help in avoiding rate limits
function delay(duration) {
    return new Promise(resolve => setTimeout(resolve, duration));
}

// Queue operations to manage execution pace
function queueOperation(command, message) {
    operationQueue.push({ command, message });
    if (!isProcessingQueue) {
        processQueue();
    }
}

// Process each operation in the queue with a delay to prevent rate limiting
async function processQueue() {
    isProcessingQueue = true;
    while (operationQueue.length > 0) {
        const { command, message } = operationQueue.shift();

        if (command === 'scramblechannels') {
            await scrambleChannelNames(message);
        } else if (command === 'scramble' || command === 'resetnicks') {
            await handleNicknameScrambleOrReset(message, command);
        }

        if (operationQueue.length > 0) {
            message.channel.send(`Progress: ${command} operations remaining: ${operationQueue.length}`);
        }
        await delay(10000); // 10-second delay between operations
    }
    isProcessingQueue = false;
}

// Scramble the names of channels
async function scrambleChannelNames(message) {
    message.guild.channels.cache.forEach(channel => {
        if ([ChannelType.GuildText, ChannelType.GuildVoice].includes(channel.type)) {
            const scrambledName = scrambleString(channel.name);
            channel.setName(scrambledName)
                .then(newChannel => console.log(`Channel renamed to ${newChannel.name}`))
                .catch(console.error);
        }
    });
    message.channel.send('Channel names scrambled!');
}

// Handle the scrambling or resetting of nicknames based on the command
async function handleNicknameScrambleOrReset(message, command) {
    try {
        await message.guild.members.fetch();
        message.guild.members.cache.forEach(member => {
            if (member.manageable) {
                let newName = command === 'scramble' ? scrambleString(member.displayName) : '';
                member.setNickname(newName)
                    .then(() => console.log(`Nickname changed to ${newName}`))
                    .catch(console.error);
            }
        });
        message.channel.send(command === 'scramble' ? 'Nicknames scrambled!' : 'Nicknames reset to default!');
    } catch (error) {
        console.error('An error occurred while fetching members:', error);
        message.channel.send('Failed to perform the operation due to an error.');
    }
}

// Utility function to scramble strings
function scrambleString(str) {
    return str.split('').sort(() => Math.random() - 0.5).join('');
}

// Log the bot in
client.login(BOT_TOKEN);
