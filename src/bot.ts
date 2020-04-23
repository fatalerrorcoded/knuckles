import dotenv from "dotenv";
dotenv.config();

import * as fs from "fs";
import * as path from "path";

import Discord from "discord.js";

const client = new Discord.Client();

const playVideo = (video: string, channel: Discord.TextBasedChannelFields) => {
    fs.readFile(path.join(__dirname, "..", "videos", video + ".mp4"), null, (err, videoBuffer) => {
        if (err) {
            console.error(err);
            return;
        }

        const attachment = new Discord.MessageAttachment(videoBuffer, video + ".mp4");
        channel.send(attachment);
    });
}

client.on("message", (message) => {
    if (message.author.bot) return;

    switch (message.content) {
        case "meme approved":
            playVideo("approved", message.channel);
            break;
        case "meme denied":
            playVideo("denied", message.channel);
            break;
        case "meme indecisive":
            playVideo("indecisive", message.channel);
            break;
        case "meme illegal":
            playVideo("illegal", message.channel);
            break;
        case "meme failed":
            playVideo("failed", message.channel);
            break;
        default: break;
    }
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user}`);
});

client.login(process.env.TOKEN);
