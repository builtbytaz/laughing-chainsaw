# April Fools' Discord Bot

## Overview

This Discord bot is designed as a playful tool for server administrators looking to engage their community with a light-hearted April Fools' Day joke. It temporarily scrambles the names of channels and user nicknames within a Discord server, adding an element of surprise and fun to the community's daily interactions. The bot ensures that all changes are reversible, making sure that the fun is temporary and does not permanently alter server settings or user data.

## Features

- **Scramble Channel Names**: Randomly rearranges the letters of text and voice channel names.
- **Scramble Nicknames**: Randomly shuffles the letters of user nicknames in the server.
- **Reset Nicknames**: Resets all scrambled nicknames back to their original state, based on the user's Discord username.
- **Rate Limit Compliance**: Executes operations in a controlled manner to comply with Discord's API rate limits, ensuring the bot does not get banned for excessive requests.
- **Progress Updates**: Provides real-time updates on the status of ongoing operations, keeping server members informed about the bot's activities.

## Commands

- `!scramblechannels` - Scrambles the names of all text and voice channels.
- `!scramble` - Scrambles the nicknames of all members in the server.
- `!resetnicks` - Resets all scrambled nicknames to their original form.

## Usage

After starting the bot, use the provided commands in any text channel where the bot has permission to read and send messages. Make sure the bot has the necessary permissions to manage channels and nicknames.

## Safety and Permissions

- The bot requires permissions to read messages, manage channels, and manage nicknames.
- Ensure you trust the server members not to abuse the bot's functionality, as it can disrupt server activities if used excessively.
- All changes made by the bot are temporary and reversible using the `!resetnicks` command.

## Disclaimer

This bot is intended for use as a harmless April Fools' joke. The creators are not responsible for any disruptions or issues caused by the bot within Discord servers. Use responsibly and ensure your community is comfortable with the bot's effects before deploying it.
