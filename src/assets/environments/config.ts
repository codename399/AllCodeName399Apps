import { IEnvironment } from "./environment-type";

export class Config implements IEnvironment {
    pageSize!: number;
    enableMultiSelection!: boolean;
    profilePictureUrl!: string;
    logoUrl!: string;
    authenticationBaseURL!: string;
    baseURL!: string;
    toast_delay!: number;
}