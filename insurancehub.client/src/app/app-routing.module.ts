import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'claim-management',
    loadChildren: () =>
      import('./claim-management/claim-management.module')
        .then(m => m.ClaimManagementModule)
  },
  { path: '', redirectTo: 'claim-management', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
