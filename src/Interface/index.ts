export interface PostPayload {
    id: string;
    userId: number;
    title: string;
    body: string;
    comment: string;
}

export interface Notification {
    msg: string;
    color: string;
}