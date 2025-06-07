import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../utils/app.service';
import { ConstantData } from '../../utils/constant-data';
import { Gender, PaymentMode, Status } from '../../utils/enum';
import { LoadDataService } from '../../utils/load-data.service';
import {
  ActionModel,
  RequestModel,
  StaffLoginModel,
} from '../../utils/interface';
import { LocalService } from '../../utils/local.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-package-bill',
  templateUrl: './package-bill.component.html',
  styleUrls: ['./package-bill.component.css'],
})
export class PackageBillComponent {
  dataLoading: boolean = false;
  PatientList: any = [];

  AllChargeList: any[] = [];
  FeeChargeList: any = [];
  PatientListAll: any = [];
  Patient: any = {};
  Package: any = {};

  Payment: any = {};
  isSubmitted = false;
  PageSize = ConstantData.PageSizes;
  p: number = 1;
  Search: string = '';
  reverse: boolean = false;
  sortKey: string = '';
  itemPerPage: number = this.PageSize[0];
  StateList: any[] = [];
  filterState: any[] = [];
  StatusList = this.loadData.GetEnumList(Status);
  GenderList = this.loadData.GetEnumList(Gender);
  PaymentModeList = this.loadData.GetEnumList(PaymentMode);
  action: ActionModel = {} as ActionModel;
  staffLogin: StaffLoginModel = {} as StaffLoginModel;
  AllStatusList = Status;
  AllGenderList = Gender;
  AllPaymentModeList = PaymentMode;
  currentPayment: any = [];
  filteredPatientList: any[] = []; // list shown in autocomplete
  PackageDetail: {};
  PackageList: any;
  PackageDetial: any;
  PackageDetialList: any[] = [];
  ChargeList: any;
  filteredPackageList: any[];
  PaymentCollection: any;
  tempData: any;

  sort(key: any) {
    this.sortKey = key;
    this.reverse = !this.reverse;
  }

  onTableDataChange(p: any) {
    this.p = p;
  }

  constructor(
    private service: AppService,
    private toastr: ToastrService,
    private loadData: LoadDataService,
    private localService: LocalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  redUrl: string = '';

  ngOnInit(): void {
    
    this.staffLogin = this.localService.getEmployeeDetail();
    this.validiateMenu();
    this.tempData = this.service.getSelectedSurgeryData();
    console.log(this.tempData);
    

    this.resetForm();
    this.getPackageList(this.Package.PackageDetailId);
    this.getPatientList(this.Patient.PatientId);
    this.route.queryParams.subscribe((params: any) => {
      this.Patient.PatientId = params.id;
      this.redUrl = params.redUrl;
      if (this.Patient.PatientId > 0) {
        this.getPatientList(this.Patient.PatientId);
      }
    });
    // if (!this.Package.PaymentDate) {
    //   this.Package.PaymentDate = new Date();
    // }
    //    if (!this.Patient.SurgeryDate) {
    //   this.Patient.SurgeryDate = new Date();
    // }
    this.route.queryParams.subscribe((params) => {
      const surgeryId = params['id'];
      const redUrl = params['redUrl'];

      const data = this.service.getSelectedSurgeryData();
      if (data && data.GetSurgery.SurgeryId == surgeryId) {
        this.Patient = data.GetSurgery;
        this.Package = data.GetPaymentCollection;
        this.SelectedPaymentDetailList = data.GetPackageBookingDetail;
        this.SelectedPaymentCollectionList = data.GetPaymentDetails;
   
      } else {
        // Optional: fallback to fetch data again using surgeryId
      }
      console.log(data);
      
    });
  }
  validiateMenu() {
    var request: RequestModel = {
      request: this.localService
        .encrypt(
          JSON.stringify({
            Url: '/admin/PackageBill',
            StaffLoginId: this.staffLogin.StaffLoginId,
          })
        )
        .toString(),
    };
    this.dataLoading = true;
    this.service.validiateMenu(request).subscribe(
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

  @ViewChild('formPatientDetails') formPatientDetails: NgForm;
  resetForm() {
    this.PackageDetail = {};
    // this.PackageDetail.OpdDate = this.loadData.newloadDateYMD(new Date());

    if (this.formPatientDetails) {
      this.formPatientDetails.control.markAsPristine();
      this.formPatientDetails.control.markAsUntouched();
    }
    this.isSubmitted = false;
  }

  getPatientList(PatientId: number) {
    var data = {
      PatientID: PatientId,
    };
    const obj: RequestModel = {
      request: this.localService.encrypt(JSON.stringify(data)).toString(),
    };
    // console.log("Sending request:", obj);
    this.dataLoading = true;

    this.service.getPatientList(obj).subscribe({
      next: (r1) => {
        // console.log("API Response:", r1);
        let response = r1 as any;
        if (response.Message == ConstantData.SuccessMessage) {
          this.PatientListAll = response.PatientList;
               if (!this.Package.PaymentDate) {
      this.Package.PaymentDate = new Date();
    }
       if (!this.Patient.SurgeryDate) {
      this.Patient.SurgeryDate = new Date();
    }
          this.filteredPatientList = [...this.PatientListAll];
          // console.log(this.filteredPatientList);
        } else {
          this.toastr.error(response.Message);
        }
        this.dataLoading = false;
      },
      error: (err) => {
        console.error('API error:', err);
        this.toastr.error('Error while fetching records');
        this.dataLoading = false;
      },
    });
  }

  SelectedPaymentDetailList: any = [];
  addPaymentDetail() {
    if (this.Package.Price == null || this.Package.Price == '') {
      this.toastr.error('Please Select Package!!');
      return;
    }
    if (this.Package.PackageName == null || this.Package.PackageName == '') {
      this.toastr.error('Please Select Package !!!');
      return;
    }

    this.SelectedPaymentDetailList.push(this.Package);
    this.CalculateTotalAmount();
    this.resetHotelPayment();
    this.updatePayment();
  }

  RemoveHotel(index: number) {
    this.SelectedPaymentDetailList.splice(index, 1);
    this.CalculateTotalAmount();
  }

  resetHotelPayment() {
    this.Payment = {};
    this.isSubmitted = false;
  }

  CalculateTotalAmount() {
    let TotalAmount = 0;

    for (let i = 0; i < this.SelectedPaymentDetailList.length; i++) {
      const paymentDetail = this.SelectedPaymentDetailList[i];
      TotalAmount += parseFloat(paymentDetail.Price) || 0;
    }

    this.Package.TotalAmount = TotalAmount;
    this.Package.DiscountAmount = 0;
    this.Package.PayableAmount = TotalAmount;
    this.Package.PaidAmount = 0;
    this.currentPayment.PaidAmount= TotalAmount;
    
  }

  updatePaymentFields() {
    this.Package.PayableAmount =
      this.Package.TotalAmount - this.Package.DiscountAmount;
    this.Package.PaidAmount =
      this.Package.TotalAmount - this.Package.DiscountAmount;
      this.currentPayment.PaidAmount= this.Package.TotalAmount - this.Package.DiscountAmount;
  }

  // ChangeDuesAmount() {
  //   this.Package.DueAmount =
  //     this.Package.PayableAmount - this.Package.PaidAmount;
  // }

  saveSurgery() {
    this.isSubmitted = true;

      if (
        !this.SelectedPaymentCollectionList ||
        this.SelectedPaymentCollectionList.length === 0
      ) {
      this.toastr.error('Please add at least one payment to the list!');
      return;
    }
    if (
      !this.SelectedPaymentDetailList ||
      this.SelectedPaymentDetailList.length === 0
    ) {
      this.toastr.error(
        'Please add at least one registration charge to the list!'
      );
      return;
    }

    this.Patient.CreatedBy = this.staffLogin.StaffId;
    this.Patient.UpdatedBy = this.staffLogin.StaffId;
    this.Patient.SurgeryDate = this.loadData.loadDateYMD(
      this.Patient.SurgeryDate
    );
    this.Package.PaymentDate = this.loadData.loadDateYMD(
      this.Package.PaymentDate
    );
    if (this.tempData !=undefined) {
      this.Package.PaymentCollectionId =
        this.tempData.GetPaymentCollection.PaymentCollectionId;
        console.log("ye bhi kam kar rahai hai");
    }

    const data = {
      GetSurgery: this.Patient,
      GetPaymentCollection: this.Package,
      GetPackageBookingDetail: this.SelectedPaymentDetailList,
      GetPaymentDetails: this.SelectedPaymentCollectionList,
    };

    console.log(data.GetPaymentCollection);

    console.log('the package data', data);
    const obj: RequestModel = {
      request: this.localService.encrypt(JSON.stringify(data)).toString(),
    };

    this.dataLoading = true;
    this.service.saveSurgery(obj).subscribe(
      (r1) => {
        const response = r1 as any;

        if (response.Message === ConstantData.SuccessMessage) {
          if (this.Patient.OpdId > 0) {
            this.toastr.success('Booking Updated successfully');
            $('hashtag#staticBackdrop').modal('hide');
          } else {
            this.toastr.success('Booking added successfully');
          }

          this.SelectedPaymentDetailList = [];
          this.SelectedPaymentCollectionList = [];
          this.resetForm();
        } else {
          this.toastr.error(response.Message);
        }

        this.dataLoading = false;
      },
      (err) => {
        this.toastr.error('Error occurred while submitting data');
        this.dataLoading = false;
      }
    );
  }

  SelectedPaymentCollectionList: any[] = [];

  addToPaymentList() {
    if (
      this.currentPayment.Particular &&
      this.currentPayment.Remarks &&
      this.currentPayment.PaidAmount != null
    ) {
      // Push a copy of the current input
      this.SelectedPaymentCollectionList.push({ ...this.currentPayment });

      // Reset currentPayment fields
      this.currentPayment = {
        Particular: '',
        Description: '',
        PaymentMode: '',
        PaidAmount: null,
      };
    } else {
      alert('Please fill all fields!');
    }
  }

  removePaymentItem(index: number) {
    this.SelectedPaymentCollectionList.splice(index, 1);
  }

  updatePayment() {
    this.currentPayment.PaidAmount =
      this.Package.TotalAmount - this.Package.DiscountAmount;
  }
  filterpatientList(value: string) {
    const filterValue = value?.toLowerCase() || '';

    this.filteredPatientList = this.PatientListAll.filter(
      (option: any) =>
        option.PatientName?.toLowerCase().includes(filterValue) ||
        option.UHID?.toLowerCase().includes(filterValue) ||
        option.ContactNo?.toLowerCase().includes(filterValue)
    );
  }

  clearPatient() {
    this.ChargeList = this.PatientListAll;
    // this.Patient.PackageCollectionId = null;
    this.Patient.PatientName = '';
  }
  afterPatientSelected(event: any) {
    const selectedName = event.option.value;

    const selected = this.PatientListAll.find(
      (x: any) => x.PatientName === selectedName
    );

    if (selected) {
      this.Patient = { ...selected }; // assign full patient object
      this.getPatientList(this.Patient.PatientID); // optional
    }
  }

  getPackageList(PackageDetailId: number) {
    var data = {
      PackageDetailID: PackageDetailId,
    };
    const obj: RequestModel = {
      request: this.localService.encrypt(JSON.stringify(data)).toString(),
    };

    this.dataLoading = true;

    this.service.PackageDetailtypeListAll(obj).subscribe({
      next: (r1) => {
        // console.log("API Response:", r1);
        let response = r1 as any;
        if (response.Message == ConstantData.SuccessMessage) {
          this.PackageDetialList = response.PackageDetialList;
          // console.log(this.PackageDetialList);
        } else {
          this.toastr.error(response.Message);
        }
        this.dataLoading = false;
      },
      error: (err) => {
        console.error('API error:', err);
        this.toastr.error('Error while fetching records');
        this.dataLoading = false;
      },
    });
  }

  filterpackageList(value: string) {
    const filterValue = value?.toLowerCase() || '';

    this.filteredPackageList = this.PackageDetialList.filter(
      (option: any) =>
        option.PackageName?.toLowerCase().includes(filterValue) ||
        option.PackageCode?.toLowerCase().includes(filterValue)
    );
    // console.log(this.filteredPackageList);
  }

  afterPackageSelected(event: any) {
    const selectedName = event.option.value;

    const selected = this.PackageDetialList.find(
      (x: any) => x.PackageName === selectedName
    );

    if (selected) {
      this.Package = { ...selected };
      this.getPackageList(this.Package.PackageDetailId);
    }
  }

  PackageClear() {
    this.PackageList = this.PackageDetialList;
    // this.Patient.PackageCollectionId = null;
    this.Package.PackageName = '';
  }

  // Assuming Package.PayableAmount is a number
// SelectedPaymentCollectionList is an array of items with PaidAmount property

validateCurrentPaymentAmount(): void {
  const totalPaidAmount = this.SelectedPaymentCollectionList.reduce(
    (sum, item) => sum + (item.PaidAmount || 0),
    0
  );

  const remainingAmount = this.Package.PayableAmount - totalPaidAmount;

  if (this.currentPayment.PaidAmount > remainingAmount) {
    this.currentPayment.PaidAmount = remainingAmount;
  }

  // Optionally prevent negative amounts:
  if (this.currentPayment.PaidAmount < 0) {
    this.currentPayment.PaidAmount = 0;
  }
}

}
