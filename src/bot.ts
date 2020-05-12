import dotenv from "dotenv";
dotenv.config();

import * as fs from "fs";
import * as path from "path";

import Chance from "chance";
import Discord from "discord.js";

const chance = new Chance();
const client = new Discord.Client();
const videoPath = path.join(__dirname, "..", "videos");

import * as videos from "./videos";
import * as Video from "./video";

const video = Video.init(videoPath, chance);

client.on("message", (message) => {
    if (message.author.bot) return;

    if (/(rate meme)|(rate .* meme)/gi.test(message.content)) {
        video.sendRandomVideo(videos.allVideos, message.channel, "rating");
    } else switch (message.content.toLowerCase()) {
        case "meme approved":
            video.sendRandomVideo([videos.approved, videos.no, videos.slaughter], message.channel, videos.approved.name);
            break;
        case "meme denied":
            video.sendRandomVideo([videos.denied, videos.no], message.channel, videos.denied.name);
            break;
        case "meme indecisive":
            video.sendVideo(videos.indecisive, message.channel);
            break;
        case "meme illegal":
            video.sendVideo(videos.illegal, message.channel);
            break;
        case "meme failed":
            video.sendVideo(videos.failed, message.channel);
            break;
        default: break;
    }
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user}`);
});

client.login(process.env.TOKEN);
