import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
declare var toastr: any;
declare var $: any;

import { AppService } from "../../utils/app.service";
import { ConstantData } from "../../utils/constant-data";
import { LocalService } from "../../utils/local.service";
import { LoadDataService } from '../../utils/load-data.service';
import { Status } from '../../utils/enum';
import { ActionModel ,RequestModel ,StaffLoginModel } from '../../utils/interface';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css']
})
export class MedicineComponent implements OnInit {
  Medicine: any = {};
  employeeDetail: any;
  StatusList = this.loadData.GetEnumList(Status);
  AllStatusList = Status;
  MedicineList: any={};
  dataLoading: boolean = false;
  submitted: boolean;
  Search: string;
  reverse: boolean;
  sortKey: string;
  p: number = 1;
  pageSize = ConstantData.PageSizes;
  itemPerPage: number = this.pageSize[0];
  action: ActionModel = {} as ActionModel;
   staffLogin: StaffLoginModel = {} as StaffLoginModel;

  constructor(
    private service: AppService,
    private localService: LocalService,
    private loadData: LoadDataService,
    private router: Router,
     private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.staffLogin = this.localService.getEmployeeDetail();
    this.validiateMenu();
    this.getMedicineList();
    // this.getCategoryList();
    // this.getUnitList();
    // this.getManufacturerList();
    // this.getGSTList();
    this.employeeDetail = this.localService.getEmployeeDetail();
    this.resetForm();
  }

  validiateMenu() {
    var obj: RequestModel = {
      request: this.localService.encrypt(JSON.stringify({ Url: this.router.url,StaffLoginId:this.staffLogin.StaffLoginId })).toString()
    }
    this.dataLoading = true
    this.service.validiateMenu(obj).subscribe((response: any) => {
      this.action = this.loadData.validiateMenu(response, this.toastr, this.router)
      this.dataLoading = false;
    }, (err => {
      this.toastr.error("Error while fetching records")
      this.dataLoading = false;
    }))
  }

  @ViewChild('formMedicine') formMedicine: NgForm;
  resetForm() {
    this.Medicine = {};
    this.Medicine.Status = 1;
    this.Medicine.UnitId = "";
    this.Medicine.GSTId = "";
    this.Medicine.CategoryId = "";
    this.Medicine.ManufacturerId = "";
    if (this.formMedicine) {
      this.formMedicine.control.markAsPristine();
      this.formMedicine.control.markAsUntouched();
    }
    this.submitted = false
  }

  newMedicine() {
    this.resetForm();
    $('#modal_popUp').modal('show');
  }

  editMedicine(obj: any) {
    this.Medicine = obj;
    $('#modal_popUp').modal('show');
  }

  onTableDataChange(p: any) {
    this.p = p;
  }

  sort(key: any) {
    this.sortKey = key;
    this.reverse = !this.reverse;
  }

getMedicineList() {
  
  var obj: RequestModel = {
    request: this.localService.encrypt(JSON.stringify({ })).toString()
  };
  console.log(obj);
  this.dataLoading = true;
  this.service.getMedicineList(obj).subscribe(r1 => {
    let response = r1 as any;
    if (response.Message == ConstantData.SuccessMessage) {
      this.MedicineList = response.TotalRecords;
      console.log(response.TotalRecords);
      
    } else {
      this.toastr.error(response.Message);
    }
    this.dataLoading = false;
  }, (err => {
    this.toastr.error("Error Occurred while fetching data.");
    this.dataLoading = false;
  }));
}



  // CategoryList: any[] = [];
  // getCategoryList() {
  //   this.dataLoading = true;
  //   this.service.getCategoryList({}).subscribe(r1 => {
  //     let response = r1 as any;
  //     if (response.Message == ConstantData.SuccessMessage) {
  //       this.CategoryList = response.CategoryList;
  //     } else {
  //       toastr.error(response.Message);
  //     }
  //     this.dataLoading = false;
  //   }, (err => {
  //     toastr.error("Error Occured while fetching data.");
  //     this.dataLoading = false;
  //   }));
  // }

  GSTList: any[] = [];
  getGSTList() {
    this.dataLoading = true;
    this.service.getGSTList({}).subscribe(r1 => {
      let response = r1 as any;
      if (response.Message == ConstantData.SuccessMessage) {
        this.GSTList = response.GSTList;
      } else {
        toastr.error(response.Message);
      }
      this.dataLoading = false;
    }, (err => {
      toastr.error("Error Occured while fetching data.");
      this.dataLoading = false;
    }));
  }


  // UnitList: any[] = [];
  // getUnitList() {
  //   this.dataLoading = true;
  //   this.service.getUnitList({}).subscribe(r1 => {
  //     let response = r1 as any;
  //     if (response.Message == ConstantData.SuccessMessage) {
  //       this.UnitList = response.UnitList;
  //     } else {
  //       toastr.error(response.Message);
  //     }
  //     this.dataLoading = false;
  //   }, (err => {
  //     toastr.error("Error Occured while fetching data.");
  //     this.dataLoading = false;
  //   }));
  // }

  ManufacturerList: any[] = [];
  getManufacturerList() {
    this.dataLoading = true;
    this.service.getManufacturerList({}).subscribe(r1 => {
      let response = r1 as any;
      if (response.Message == ConstantData.SuccessMessage) {
        this.ManufacturerList = response.ManufacturerList;
      } else {
        toastr.error(response.Message);
      }
      this.dataLoading = false;
    }, (err => {
      toastr.error("Error Occured while fetching data.");
      this.dataLoading = false;
    }));
  }

  saveMedicine() {
    this.submitted = true;
    if (this.formMedicine.invalid) {
      toastr.warning("Fill all the Required Fields.", "Invailid Form")
      this.dataLoading = false;
      return;
    }
    this.Medicine.UpdatedBy = this.employeeDetail.EmployeeId;
    this.Medicine.CreatedBy = this.employeeDetail.EmployeeId;
    this.dataLoading = true;
    this.service.saveMedicine(this.Medicine).subscribe(r1 => {
      let response = r1 as any;
      if (response.Message == ConstantData.SuccessMessage) {
        if (this.Medicine.MedicineId > 0) {
          toastr.success("Medicine detail successfully.");
          $('#modal_popUp').modal('hide');
        } else {
          toastr.success("Medicine created successfully.");
          this.Medicine.MedicineId = null;
          this.Medicine.Name = "";
          this.Medicine.HSNCode = "";
          if (this.formMedicine) {
            this.formMedicine.control.markAsPristine();
            this.formMedicine.control.markAsUntouched();
          }
          this.submitted = false
        }
        this.getMedicineList();
      } else {
        toastr.error(response.Message);
        this.dataLoading = false;
      }
    }, (err => {
      toastr.error("Error Occured while fetching data.");
      this.dataLoading = false;
    }));
  }

  deleteMedicine(obj: any) {
    if (confirm("Are you sure want to delete this record") == true) {
      this.dataLoading = true;
      this.service.deleteMedicine(obj).subscribe(r1 => {
        let response = r1 as any;
        if (response.Message == ConstantData.SuccessMessage) {
          toastr.success("One record deleted successfully.");
          this.getMedicineList();
        } else {
          toastr.error(response.Message);
        }
        this.dataLoading = false;
      }, (err => {
        toastr.error("Error Occured while fetching data.");
        this.dataLoading = false;
      }));
    }
  }

}

