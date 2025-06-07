import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../utils/app.service';
import { ConstantData } from '../../utils/constant-data';
import { Gender, Status, BookingStatus, BillStatus } from '../../utils/enum';
import { LoadDataService } from '../../utils/load-data.service';
import { ActionModel, RequestModel, StaffLoginModel } from '../../utils/interface';
import { LocalService } from '../../utils/local.service';
import { Router } from '@angular/router';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
declare var $: any

@Component({
  selector: 'app-opd-list',
  templateUrl: './opd-list.component.html',
  styleUrls: ['./opd-list.component.css']
})
export class OpdListComponent {
  opdList: any = [];
  dataLoading = false;
  PageSize = ConstantData.PageSizes;
  p: number = 1;
  action: ActionModel = {} as ActionModel;
  Search: string = '';
  reverse: boolean = false;
  sortKey: string = '';
  itemPerPage: number = this.PageSize[0];
  staffLogin: StaffLoginModel = {} as StaffLoginModel;
  StatusList = this.loadData.GetEnumList(Status);
  GenderList = this.loadData.GetEnumList(Gender);
  AllStatusList = Status;
  AllGenderList = Gender;
  // BookingStatus = this.loadData.GetEnumList(BookingStatus);
  // AllBookingStatus = BookingStatus;

  PaymentStatus = this.loadData.GetEnumList(BillStatus);
  AllPaymentStatus = BillStatus;
  allData: any[] = [];
  pagedData: any[] = [];
  totalAmountPaid: number = 0;
  currentPage: number = 1;
  totalRecords: number = 0;
  OpdTotal: any = {};
  alldata: any;


  constructor(
    private service: AppService,
    private toastr: ToastrService,
    private loadData: LoadDataService,
    private localService: LocalService,
    private router: Router
  ) { }

  sort(key: any) {
    this.sortKey = key;
    this.reverse = !this.reverse;
  }

  ngOnInit() {
    this.staffLogin = this.localService.getEmployeeDetail();
    this.validiateMenu();
    this.getOpdList();
  }

  validiateMenu() {
    var obj: RequestModel = {
      request: this.localService
        .encrypt(
          JSON.stringify({
            Url: this.router.url,
            StaffLoginId: this.staffLogin.StaffLoginId,
          })
        )
        .toString(),
    };
    this.dataLoading = true;
    this.service.validiateMenu(obj).subscribe(
      (response: any) => {
        this.action = this.loadData.validiateMenu(
          response,
          this.toastr,
          this.router
        );
        this.dataLoading = false;
      },
      (err) => {
        this.toastr.error('Error while fetching records');
        this.dataLoading = false;
      }
    );
  }

  getPrint(data:any){
  this.service.PrintOpdBill(data.OpdId)
}


  getOpdList() {
    const requestPayload = {
      OpdId: 0,
      Page: this.p,
      PageSize: this.itemPerPage
    };

    const request: RequestModel = {
      request: this.localService.encrypt(JSON.stringify(requestPayload)).toString()
    };

    this.dataLoading = true;

    this.service.getOpdList(request).subscribe({
      next: (r1) => {
        let response = r1 as any;
        if (response.Message === ConstantData.SuccessMessage) {
          this.opdList = response.OpdBookingList;

          this.OpdTotal.PaidAmount = response.PaidAmountTotal;
          this.totalRecords = response.TotalRecords;
          // console.log(this.totalAmountPaid)
          // console.log(this.totalRecords)
          // console.log(this.OpdTotal.PaidAmount)
          // console.log(response.PaidAmountTotal)
        } else {
          this.toastr.error(response.Message);
        }
        this.dataLoading = false;
      },
      error: (err) => {
        this.toastr.error("Error while fetching records");
        this.dataLoading = false;
      }
    });
  }

  // deleteOPD(obj: any) {
  //   if (confirm("Are your sure you want to delete this recored")) {
  //     var request: RequestModel = {
  //       request: this.localService.encrypt(JSON.stringify(obj)).toString()
  //     }
  //     this.dataLoading = true;
  //     this.service.deletePatient(request).subscribe(r1 => {
  //       let response = r1 as any
  //       if (response.Message == ConstantData.SuccessMessage) {
  //         this.toastr.success("Record Deleted successfully")
  //         this.getPatientList()
  //       } else {
  //         this.toastr.error(response.Message)
  //         this.dataLoading = false;
  //       }
  //     }, (err => {
  //       this.toastr.error("Error occured while deleteing the recored")
  //       this.dataLoading = false;
  //     }))
  //   }
  // }

  //   editPatient(obj: any) {
  //     this.resetForm()
  //     this.Patient = obj
  //   }
  // resetForm() {
  //     this.OpdBooking = {};
  //     if (this.formPatient) {
  //       this.formPatient.control.markAsPristine();
  //       this.formPatient.control.markAsUntouched();
  //     }
  //     this.isSubmitted = false
  //   }

  onTableDataChange(event: number) {
    this.p = event;
    this.getOpdList();
  }

  onPageSizeChange() {
    this.p = 1; // reset to first page
    this.getOpdList();
  }

  editPackageCollection(data: any) {
      
  const obj: RequestModel = {
      request: this.localService.encrypt(JSON.stringify(data)).toString(),
    };
  this.service.getOpdAllList(obj).subscribe(
    (response: any) => {
      try {
        this.alldata = response.opd;
        this.service.setSelectedOpdData(this.alldata);
        this.router.navigate(['/admin/opd-booking'], {
          queryParams: { id: this.alldata.GetOpdBooking.OpdId, redUrl: '/admin/opd-List' }
        });

      } catch (error) {
        this.toastr.error(response.Message || "Error processing data.");
      }
    },
    
  );
}







}

