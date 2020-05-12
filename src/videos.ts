import Video from "./video";

export const approved: Video = {
    name: "approved",
    filename: "approved.mp4",
    weight: 100
}

export const denied: Video = {
    name: "denied",
    filename: "denied.mp4",
    weight: 100
}

export const indecisive: Video = {
    name: "indecisive",
    filename: "indecisive.mp4",
    weight: 80
}

export const illegal: Video = {
    name: "illegal",
    filename: "indecisive.mp4",
    weight: 65
}

export const failed: Video = {
    name: "failed",
    filename: "failed.mp4",
    weight: 35
}

export const no: Video = {
    name: "no",
    filename: "no.mp4",
    weight: 10
}

export const slaughter: Video = {
    name: "man behind the slaughter",
    filename: "manbehindtheslaughter.mp4",
    weight: 3
}

export const allVideos: Video[] = [
    approved, denied,
    indecisive, illegal,
    failed, no, slaughter
];