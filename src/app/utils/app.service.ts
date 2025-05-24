import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ConstantData } from './constant-data';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private readonly apiUrl: string = ConstantData.getApiUrl();
  private readonly baseUrl: string = ConstantData.getBaseUrl();
  private readonly headers: HttpHeaders = new HttpHeaders({ 'AppKey': ConstantData.getAdminKey() });

  constructor(private http: HttpClient) {
  }

  getImageUrl(): string {
    return ConstantData.getBaseUrl();
  }

  // District
  getDistrictList(obj: any) {
    return this.http.post(this.apiUrl + "District/DistrictList", obj, { headers: this.headers })
  }

  saveDistrict(obj: any) {
    return this.http.post(this.apiUrl + "District/saveDistrict", obj, { headers: this.headers })
  }

  deleteDistrict(obj: any) {
    return this.http.post(this.apiUrl + "District/deleteDistrict", obj, { headers: this.headers })
  }

  // Company
  getCompanyList(obj: any) {
    return this.http.post(this.apiUrl + "Company/CompanyList", obj, { headers: this.headers })
  }

  saveCompany(obj: any) {
    return this.http.post(this.apiUrl + "Company/saveCompany", obj, { headers: this.headers })
  }

  deleteCompany(obj: any) {
    return this.http.post(this.apiUrl + "Company/deleteCompany", obj, { headers: this.headers })
  }

  // Designation 
  getDesignationList(obj: any) {
    return this.http.post(this.apiUrl + "Designation/DesignationList", obj, { headers: this.headers })
  }

  saveDesignation(obj: any) {
    return this.http.post(this.apiUrl + "Designation/saveDesignation", obj, { headers: this.headers })
  }

  deleteDesignation(obj: any) {
    return this.http.post(this.apiUrl + "Designation/deleteDesignation", obj, { headers: this.headers })
  }

  /* ---------------------------------------------------------------------- */

  //Department
  getDepartmentList(obj: any) {
    return this.http.post(this.apiUrl + "Department/DepartmentList", obj, { headers: this.headers })
  }

  saveDepartment(obj: any) {
    return this.http.post(this.apiUrl + "Department/saveDepartment", obj, { headers: this.headers })
  }

  deleteDepartment(obj: any) {
    return this.http.post(this.apiUrl + "Department/deleteDepartment", obj, { headers: this.headers })
  }

  /* ---------------------------------------------------------------------- */

    //Opticals 
  getOpticalList(obj: any) {
    return this.http.post(this.apiUrl + "Opticals/opticalsList", obj, { headers: this.headers })
  }

  saveOptical(obj: any) {
    return this.http.post(this.apiUrl + "Opticals/OpticalSave", obj, { headers: this.headers })
  }

  deleteOptical(obj: any) {
    return this.http.post(this.apiUrl + "Opticals/OpticalDelete", obj, { headers: this.headers })
  }

  /* ---------------------------------------------------------------------- */


  //ChargeDetails

  getChargeList(obj: any) {
    return this.http.post(this.apiUrl + "ChargeDetails/ChargeList", obj, { headers: this.headers })
  }

  saveCharge(obj: any) {
    return this.http.post(this.apiUrl + "ChargeDetails/SaveCharge", obj, { headers: this.headers })
  }
  
  deleteCharge(obj: any) {
    return this.http.post(this.apiUrl + "ChargeDetails/DeleteCharge", obj, { headers: this.headers })
  }
  /* ---------------------------------------------------------------------- */

  //OPD booking services
    getOpdList(obj: any) {
    return this.http.post(this.apiUrl + "OpdBooking/OpdBookingList", obj, { headers: this.headers })
  }

  saveOpd(obj: any) {
    return this.http.post(this.apiUrl + "OpdBooking/SaveOpdBooking", obj, { headers: this.headers })
  }

  deleteOpd(obj: any) {
    return this.http.post(this.apiUrl + "OpdBooking/DeleteOpdBooking", obj, { headers: this.headers })
  }

  /* ---------------------------------------------------------------------- */

  //PaymentBooking Services
    getPaymentDetailList(obj: any) {
    return this.http.post(this.apiUrl + "PaymentDetail/PaymentDetailList", obj, { headers: this.headers })
  }

  savePaymentBooking(obj: any) {
    return this.http.post(this.apiUrl + "PaymentDetail/SavePaymentDetail", obj, { headers: this.headers })
  }

  deletePaymentBooking(obj: any) {
    return this.http.post(this.apiUrl + "PaymentDetail/DeletePaymentDetail", obj, { headers: this.headers })
  }

  /* ---------------------------------------------------------------------- */

  //PaymentCollection Services
    getPaymentCollection(obj: any) {
    return this.http.post(this.apiUrl + "PaymentCollection/PaymentCollectionList", obj, { headers: this.headers })
  }

  savePaymentCollection(obj: any) {
    return this.http.post(this.apiUrl + "PaymentCollection/SavePaymentCollection", obj, { headers: this.headers })
  }

  deletePaymentCollection(obj: any) {
    return this.http.post(this.apiUrl + "PaymentCollection/DeletePaymentCollection", obj, { headers: this.headers })
  }

  /* ---------------------------------------------------------------------- */

    //PaymentDetails Services
    getPaymentDetail(obj: any) {
    return this.http.post(this.apiUrl + "PaymentDetail/PaymentDetailList", obj, { headers: this.headers })
  }

  savePaymentDetail(obj: any) {
    return this.http.post(this.apiUrl + "PaymentDetail/SavePaymentDetail", obj, { headers: this.headers })
  }

  deletePaymentDetail(obj: any) {
    return this.http.post(this.apiUrl + "PaymentDetail/DeletePaymentDetail", obj, { headers: this.headers })
  }

  /* ---------------------------------------------------------------------- */

  // Staff
  getStaffList(obj: any) {
    return this.http.post(this.apiUrl + "Staff/StaffList", obj, { headers: this.headers })
  }

  saveStaff(obj: any) {
    return this.http.post(this.apiUrl + "Staff/saveStaff", obj, { headers: this.headers })
  }

  deleteStaff(obj: any) {
    return this.http.post(this.apiUrl + "Staff/deleteStaff", obj, { headers: this.headers })
  }
 /*  ---------------------------------------------------------------------- */

 
  // Patient
  getPatientList(obj: any) {
    return this.http.post(this.apiUrl + "Patient/PatientList", obj, { headers: this.headers })
  }
  savePatient(obj: any) {
    return this.http.post(this.apiUrl + "Patient/SavePatient", obj, { headers: this.headers })
  }
  deletePatient(obj: any) {
    return this.http.post(this.apiUrl + "Patient/DeletePatient", obj, { headers: this.headers })
  }

  /* ---------------------------------------------------------------------- */

    // PackageCollection
  getPackageCollection(obj: any) {
    return this.http.post(this.apiUrl + "PackageCollection/PackageCollection", obj, { headers: this.headers })
  }
  savePackageCollection(obj: any) {
    return this.http.post(this.apiUrl + "PackageCollection/SavePackageCollection", obj, { headers: this.headers })
  }
  deletePackageCollection(obj: any) {
    return this.http.post(this.apiUrl + "PackageCollection/DeletePackageCollection", obj, { headers: this.headers })
  }

  /* ---------------------------------------------------------------------- */

     //    // PackageCollection
  getPackageDetial(obj: any) {
    return this.http.post(this.apiUrl + "PackageDetial/PackageDetialList", obj, { headers: this.headers })
  }
  savePackageDetial(obj: any) {
    return this.http.post(this.apiUrl + "PackageDetial/SavePackageDetial", obj, { headers: this.headers })
  }
  deletePackageDetial(obj: any) {
    return this.http.post(this.apiUrl + "PackageDetial/DeletePackageDetial", obj, { headers: this.headers })
  }

   PackageDetailtypeListAll(obj: any) {
    return this.http.post(this.apiUrl + "PackageDetial/PackageDetialList", obj, { headers: this.headers })
  }

  PackageCollectiontypeListAll(obj: any) {
    return this.http.post(this.apiUrl + "PackageDetial/PackageCollectiontypeList", obj, { headers: this.headers })
  }

  /* ---------------------------------------------------------------------- */
  
  
  /* ---------------------------------------------------------------------- */

  // Staff Login
  StaffLogin(obj: any) {
    return this.http.post(this.apiUrl + "StaffLogin/StaffLogin", obj, { headers: this.headers })
  }

  getStaffLoginList(obj: any) {
    return this.http.post(this.apiUrl + "StaffLogin/StaffLoginList", obj, { headers: this.headers })
  }

  saveStaffLogin(obj: any) {
    return this.http.post(this.apiUrl + "StaffLogin/saveStaffLogin", obj, { headers: this.headers })
  }

  deleteStaffLogin(obj: any) {
    return this.http.post(this.apiUrl + "StaffLogin/deleteStaffLogin", obj, { headers: this.headers })
  }

  changePassword(obj: any) {
    return this.http.post(this.apiUrl + "StaffLogin/changePassword", obj, { headers: this.headers })
  }

  /* ---------------------------------------------------------------------- */

  //PageGroup
  getPageGroupList(obj: any) {
    return this.http.post(this.apiUrl + "PageGroup/PageGroupList", obj, { headers: this.headers })
  }

  savePageGroup(obj: any) {
    return this.http.post(this.apiUrl + "PageGroup/savePageGroup", obj, { headers: this.headers })
  }

  deletePageGroup(obj: any) {
    return this.http.post(this.apiUrl + "PageGroup/deletePageGroup", obj, { headers: this.headers })
  }

  /* ---------------------------------------------------------------------- */

  //Page
  getPageList(obj: any) {
    return this.http.post(this.apiUrl + "Page/PageList", obj, { headers: this.headers })
  }

  savePage(obj: any) {
    return this.http.post(this.apiUrl + "Page/savePage", obj, { headers: this.headers })
  }

  deletePage(obj: any) {
    return this.http.post(this.apiUrl + "Page/deletePage", obj, { headers: this.headers })
  }

  /* ---------------------------------------------------------------------- */

  //Menu
  getUserMenuList(obj: any) {
    return this.http.post(this.apiUrl + "Menu/UserMenuList", obj, { headers: this.headers })
  }

  validiateMenu(obj: any) {
    return this.http.post(this.apiUrl + "Menu/ValidiateMenu", obj, { headers: this.headers })
  }

  getMenuList(obj: any) {
    return this.http.post(this.apiUrl + "Menu/MenuList", obj, { headers: this.headers })
  }

  saveMenu(obj: any) {
    return this.http.post(this.apiUrl + "Menu/saveMenu", obj, { headers: this.headers })
  }

  deleteMenu(obj: any) {
    return this.http.post(this.apiUrl + "Menu/deleteMenu", obj, { headers: this.headers })
  }

  menuUp(obj: any) {
    return this.http.post(this.apiUrl + "Menu/MenuUp", obj, { headers: this.headers })
  }

  menuDown(obj: any) {
    return this.http.post(this.apiUrl + "Menu/MenuDown", obj, { headers: this.headers })
  }

  /* ---------------------------------------------------------------------- */

  //Role
  getRoleList(obj: any) {
    return this.http.post(this.apiUrl + "Role/RoleList", obj, { headers: this.headers })
  }

  saveRole(obj: any) {
    return this.http.post(this.apiUrl + "Role/saveRole", obj, { headers: this.headers })
  }

  deleteRole(obj: any) {
    return this.http.post(this.apiUrl + "Role/deleteRole", obj, { headers: this.headers })
  }

  /* ---------------------------------------------------------------------- */

  //RoleMenu
  getRoleMenuList(obj: any) {
    return this.http.post(this.apiUrl + "RoleMenu/AllRoleMenuList", obj, { headers: this.headers })
  }

  saveRoleMenu(obj: any) {
    return this.http.post(this.apiUrl + "RoleMenu/saveRoleMenu", obj, { headers: this.headers })
  }

  /* ---------------------------------------------------------------------- */

  //StaffLoginRole
  getStaffLoginRoleList(obj: any) {
    return this.http.post(this.apiUrl + "StaffLoginRole/StaffLoginRoleList", obj, { headers: this.headers })
  }

  saveStaffLoginRole(obj: any) {
    return this.http.post(this.apiUrl + "StaffLoginRole/saveStaffLoginRole", obj, { headers: this.headers })
  }

  deleteStaffLoginRole(obj: any) {
    return this.http.post(this.apiUrl + "StaffLoginRole/deleteStaffLoginRole", obj, { headers: this.headers })
  }

  //State
  getStateList(obj: any) {
    return this.http.post(this.apiUrl + "State/StateList", obj, { headers: this.headers })
  }

  saveState(obj: any) {
    return this.http.post(this.apiUrl + "State/saveState", obj, { headers: this.headers })
  }

  deleteState(obj: any) {
    return this.http.post(this.apiUrl + "State/deleteState", obj, { headers: this.headers })
  }

  /* ---------------------------------------------------------------------- */

  //City
  getCityList(obj: any) {
    return this.http.post(this.apiUrl + "City/CityList", obj, { headers: this.headers })
  }

  saveCity(obj: any) {
    return this.http.post(this.apiUrl + "City/saveCity", obj, { headers: this.headers })
  }

  deleteCity(obj: any) {
    return this.http.post(this.apiUrl + "City/deleteCity", obj, { headers: this.headers })
  }
}
