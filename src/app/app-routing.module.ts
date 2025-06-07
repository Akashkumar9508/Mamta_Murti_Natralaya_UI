import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { AdminMasterComponent } from './admin/admin-master/admin-master.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { DesignationComponent } from './admin/designation/designation.component';
import { DepartmentComponent } from './admin/department/department.component';
import { StaffComponent } from './admin/staff/staff.component';
import { StaffLoginComponent } from './admin/staff-login/staff-login.component';
import { PageGroupComponent } from './admin/page-group/page-group.component';
import { PageComponent } from './admin/page/page.component';
import { MenuComponent } from './admin/menu/menu.component';
import { RoleComponent } from './admin/role/role.component';
import { RoleMenuComponent } from './admin/role-menu/role-menu.component';
import { StateComponent } from './admin/state/state.component';
import { CityComponent } from './admin/city/city.component';
import { ChangePasswordComponent } from './admin/change-password/change-password.component';
import { CompanyComponent } from './admin/company/company.component';
import { ManagePatientComponent } from './admin/manage-patient/manage-patient.component';
import { OpdBookingComponent } from './admin/opd-booking/opd-booking.component';
import { OpticalAddComponent } from './admin/optical-add/optical-add.component';
import { PackageCollectionComponent } from './admin/package-collection/package-collection.component';
import { PackageDetialComponent } from './admin/package-detial/package-detial.component';
import { PackageBillComponent } from './admin/package-bill/package-bill.component';
import { OpdListComponent } from './admin/opd-list/opd-list.component';
import { SurgeryListComponent } from './admin/surgery-list/surgery-list.component';
import { GstComponent } from './admin/gst/gst.component';
import { OpticalBillingComponent } from './admin/optical-billing/optical-billing.component';
import { OpticalBillingListComponent } from './admin/optical-billing-list/optical-billing-list.component';
import { OpticalBillingListTodayComponent } from './admin/optical-billing-list-today/optical-billing-list-today.component';

const routes: Routes = [
  { path: '', redirectTo: "/admin-login", pathMatch: 'full' },
  { path: 'admin-login', component: AdminLoginComponent },
  {
    path: 'admin', component: AdminMasterComponent, children: [
      { path: 'gst', component: GstComponent },
      { path: 'admin-dashboard', component: AdminDashboardComponent },
      { path: 'designation', component: DesignationComponent },
      { path: 'department', component: DepartmentComponent },
      { path: 'staff', component: StaffComponent },
      { path: 'staffLogin', component: StaffLoginComponent },
      { path: 'page-group', component: PageGroupComponent },
      { path: 'page', component: PageComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'role', component: RoleComponent },
      { path: 'role-menu', component: RoleMenuComponent },
      { path: 'role-menu/:id', component: RoleMenuComponent },
      { path: 'state', component: StateComponent },
      { path: 'city', component: CityComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'company', component: CompanyComponent },
      { path: 'manage-patient', component: ManagePatientComponent },
      { path: 'opd-booking', component: OpdBookingComponent},
      {path:'OpticalAdd',component:OpticalAddComponent},
      {path:'PackageCollection',component:PackageCollectionComponent},
      {path:'PackageDetail',component:PackageDetialComponent},
      {path:'PackageBill',component:PackageBillComponent},
      {path:'opd-List',component:OpdListComponent},
      {path:'surgery-List',component:SurgeryListComponent},
      {path:'optical-billing',component:OpticalBillingComponent},
      {path:'optical-billing-list',component:OpticalBillingListComponent},
      {path:'optical-billing-list-today',component:OpticalBillingListTodayComponent}
    ]
  },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
