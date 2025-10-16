import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaimManagementComponent } from './claim-management.component';
// import { ClaimComponent } from './components/claim/claim.component';
// import { HibComponent } from './components/hib/hib.component';
// import { SsfComponent } from './components/ssf/ssf.component';

const routes: Routes = [
  {
    path: '',
    component: ClaimManagementComponent,
    children: [
    //   { path: 'claim', component: ClaimComponent },
    //   { path: 'hib', component: HibComponent },
    //   { path: 'ssf', component: SsfComponent },
      { path: '', redirectTo: 'claim', pathMatch: 'full' } // default child
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimManagementRoutingModule {}
