export function timeAgo(timestamp) {
    const now = new Date();
    const postDate = new Date(timestamp);

    const seconds = Math.floor((now - postDate) / 1000);
    let interval = Math.floor(seconds / 60);

    if (seconds < 60) return "Just now";
    if (interval < 60) return `${interval} minute${interval > 1 ? "s" : ""} ago`;

    interval = Math.floor(interval / 60);
    if (interval < 24) return `${interval} hour${interval > 1 ? "s" : ""} ago`;

    interval = Math.floor(interval / 24);
    if (interval < 7) return `${interval} day${interval > 1 ? "s" : ""} ago`;

    interval = Math.floor(interval / 7);
    if (interval < 4) return `${interval} week${interval > 1 ? "s" : ""} ago`;

    interval = Math.floor(interval / 4);
    return `${interval} month${interval > 1 ? "s" : ""} ago`;
}
