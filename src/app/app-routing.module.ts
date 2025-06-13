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
import { OpdListComponent } from './admin/opd-list/opd-list.component';
import { SurgeryListComponent } from './admin/surgery-list/surgery-list.component';
import { GstComponent } from './admin/gst/gst.component';
import { OpticalBillingComponent } from './admin/optical-billing/optical-billing.component';
import { OpticalBillingListComponent } from './admin/optical-billing-list/optical-billing-list.component';
import { OpticalBillingListTodayComponent } from './admin/optical-billing-list-today/optical-billing-list-today.component';
import { MedicineComponent } from './admin/medicine/medicine.component';
import { CategoryComponent } from './admin/category/category.component';
import { OpdListTodayComponent } from './admin/opd-list-today/opd-list-today.component';
import { SurgeryListTodayComponent } from './admin/surgery-list-today/surgery-list-today.component';
import { BillItemComponent } from './admin/bill-item/bill-item.component';
import { BillingItemComponent } from './admin/billing-item/billing-item.component';
import { BillingItemListComponent } from './admin/billing-item-list/billing-item-list.component';
import { BillingItemListTodayComponent } from './admin/billing-item-list-today/billing-item-list-today.component';
import { SurgeryPackageComponent } from './admin/surgery-package/surgery-package.component';
import { SurgeryBillComponent } from './admin/surgery-bill/surgery-bill.component';

const routes: Routes = [
  { path: '', redirectTo: "/admin-login", pathMatch: 'full' },
  { path: 'admin-login', component: AdminLoginComponent },
  {
    path: 'admin', component: AdminMasterComponent, children: [
      { path: 'gst', component: GstComponent },
      { path: 'bill-item', component: BillItemComponent },
      { path: 'billing-item', component: BillingItemComponent },
      { path: 'billing-item-list', component: BillingItemListComponent },
      { path: 'billing-item-list-today', component: BillingItemListTodayComponent },
      { path: 'category', component:CategoryComponent },
      { path: 'medicine', component: MedicineComponent },
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
      {path:'surgery-package',component:SurgeryPackageComponent},
      {path:'surgery-bill',component:SurgeryBillComponent},
      {path:'opd-List',component:OpdListComponent},
      {path:'opd-List-today', component: OpdListTodayComponent },
      {path:'surgery-List',component:SurgeryListComponent},
      {path:'surgery-List-today',component:SurgeryListTodayComponent},
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
