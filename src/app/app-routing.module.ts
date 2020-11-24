import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    // {
    //     path: '',
    //     loadChildren: () => import('./pets/pets.module').then(m => m.PetsModule)
    // },
    {
        path: '',
        loadChildren: () => import('./owner/owner.module').then(m => m.OwnerModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}