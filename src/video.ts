import Chance from "chance";
import Discord from "discord.js";

import fs from "fs-extra";
import path from "path";

export default interface Video {
    name: string;
    filename: string;
    data?: Buffer;
    weight: number;
}

export const init = (videoPath: string, chance: Chance.Chance) => {
    const sendVideo = async (video: Video, channel: Discord.TextBasedChannelFields, displayName?: string) => {
        if (video.data === undefined) {
            const videoFilePath = path.join(videoPath, video.filename)
            if (!(await fs.pathExists(videoFilePath))) throw new Error(`Video ${video.filename} not found`);
            video.data = await fs.readFile(videoFilePath);
        }

        const name = displayName || video.name;
        const attachment = new Discord.MessageAttachment(video.data, name + ".mp4");
        channel.send(attachment);
    }

    const sendRandomVideo = async (videos: Video[], channel: Discord.TextBasedChannelFields, displayName?: string) => {
        await sendVideo(
            chance.weighted(videos, videos.map((value) => value.weight)),
            channel,
            displayName
        );
    }

    return { sendVideo, sendRandomVideo };
};
