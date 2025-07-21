import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'game-detail',
        loadComponent: () => import('../components/game-stash/game-detail/game-detail.component').then(m => m.GameDetailComponent)
    }
];
