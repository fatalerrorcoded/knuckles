import dotenv from "dotenv";
dotenv.config();

import * as fs from "fs";
import * as path from "path";

import Chance from "chance";
import Discord from "discord.js";

interface Video {
    name: string;
    data: Buffer;
    weight: number;
}

const chance = new Chance();
const client = new Discord.Client();
const videoPath = path.join(__dirname, "..", "videos");
const videos: Video[] = [];
const weights = {
    "approved": 100,
    "denied": 100,
    "indecisive": 80,
    "illegal": 65,
    "failed": 40,
    "no": 10,
    "manbehindtheslaughter": 3,
};

console.log("Loading videos");
const videoFiles = fs.readdirSync(videoPath);
for (let videoFile of videoFiles) {
    const data = fs.readFileSync(path.join(videoPath, videoFile), null);
    const name = path.parse(videoFile).name.toLowerCase()
    let weight;
    if ((weights as any)[name] !== undefined) weight = (weights as any)[name];
    else weight = 5;
    videos.push({ name, data, weight });
    console.log(`Loaded ${videoFile}`);
}

const playVideo = (videoName: string, channel: Discord.TextBasedChannelFields, displayName?: string) => {
    let video = videos.find((video) => video.name == videoName);
    if (video === undefined) throw new Error(`Video ${videoName}.mp4 not found`);

    let name = displayName || video.name;
    const attachment = new Discord.MessageAttachment(video.data, name + ".mp4");
    channel.send(attachment);
}

client.on("message", (message) => {
    if (message.author.bot) return;

    switch (message.content.toLowerCase()) {
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
        case "rate my meme":
            let video = chance.weighted(videos, videos.map((video) => video.weight));
            playVideo(video.name, message.channel, "rating");
            break;
        default: break;
    }
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user}`);
});

client.login(process.env.TOKEN);
