import { IEnvironment } from "./environment-type";

export class Config implements IEnvironment {
    profilePictureUrl!: string;
    logoUrl!: string;
    authenticationBaseURL!: string;
    baseURL!: string;
    toast_delay!: string;
}