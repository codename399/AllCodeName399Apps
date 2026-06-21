import { inject, Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { API_CONSTANTS } from '../../../../injectors/common-injector';

@Injectable({
    providedIn: 'root'
})
export class MarketService {
    #apiConstants = inject(API_CONSTANTS);
    private hub!: signalR.HubConnection;

    gainers: any[] = [];

    startConnection(
        callback: (data: any[]) => void
    ) {
        this.hub =
            new signalR.HubConnectionBuilder()
                .withUrl(
                    this.#apiConstants.getUrl(this.#apiConstants.marketHub, false)
                )
                .withAutomaticReconnect()
                .build();

        this.hub.start();

        this.hub.on(
            'GainersUpdated',
            (data) => {
                callback(data);
            });
    }
}