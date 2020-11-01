import { Routes } from '@angular/router';

import { IntroComponent } from './intro';
import { DonoComponent } from './dono';
import { PetComponent } from './pet';

export const TarefaRoutes: Routes = [
    {
        path: 'tarefas',
        redirectTo: 'tarefas/intro'
    },
    {
        path: 'tarefas/intro',
        component: IntroComponent
    },
    {
        path: 'donos',
        redirectTo: 'tarefas/donos'
    },
    {
        path: 'tarefas/donos',
        component: DonoComponent
    },
    {
        path: 'pets',
        redirectTo: 'tarefas/pets'
    },
    {
        path: 'tarefas/pets',
        component: PetComponent
    }
];