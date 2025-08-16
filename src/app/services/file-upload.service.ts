import { Injectable, signal } from "@angular/core";
import { Constants } from "../../constants";

@Injectable({
    providedIn: "root"
})
export class FileUploadService {
    #url = signal<string>(Constants.defaultProfileUrl);

    get url() {
        return this.#url();
    }

    set url(value: string) {
        this.#url.set(value);
    }

    onFileSelected(event: any) {
        const file = (event.target as HTMLInputElement)?.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                this.url = reader.result as string;
            };
            reader.readAsDataURL(file);
        }
    }
}