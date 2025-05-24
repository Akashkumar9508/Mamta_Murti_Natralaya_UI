import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../utils/app.service';
import { ConstantData } from '../../utils/constant-data';
import { Gender,PaymentMode, Status } from '../../utils/enum';
import { LoadDataService } from '../../utils/load-data.service';
import { ActionModel, RequestModel, StaffLoginModel } from '../../utils/interface';
import { LocalService } from '../../utils/local.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any
@Component({
  selector: 'app-opd-booking',
  templateUrl: './opd-booking.component.html',
  styleUrls: ['./opd-booking.component.css']
})
export class OpdBookingComponent {
  dataLoading: boolean = false
  PatientList: any = []
  ChargeList: any = []
  FeeChargeList: any = []
  Patient: any = {}
  Payment: any = {}
  isSubmitted = false
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


  sort(key: any) {
    this.sortKey = key;
    this.reverse = !this.reverse;
  }

  onTableDataChange(p: any) {
    this.p = p
  }

  constructor(
    private service: AppService,
    private toastr: ToastrService,
    private loadData: LoadDataService,
    private localService: LocalService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  redUrl: string = '';

  ngOnInit(): void {
    this.staffLogin = this.localService.getEmployeeDetail();
    this.validiateMenu();
    this.resetForm();
    this.getChargeList();
    this.route.queryParams.subscribe((params: any) => {
      this.Patient.PatientId = params.id;
      this.redUrl = params.redUrl;
      if (this.Patient.PatientId > 0) {
        this.getPatientList(this.Patient.PatientId);
      }
    });

  }
  validiateMenu() {
    var request: RequestModel = {
      request: this.localService.encrypt(JSON.stringify({ Url: "/admin/opd-booking", StaffLoginId: this.staffLogin.StaffLoginId })).toString()
    }
    this.dataLoading = true
    this.service.validiateMenu(request).subscribe((response: any) => {
      this.action = this.loadData.validiateMenu(response, this.toastr, this.router)
      this.dataLoading = false;
    }, (err => {
      this.toastr.error("Error while fetching records")
      this.dataLoading = false;
    }))
  }

  @ViewChild('formPatientDetails') formPatientDetails: NgForm;
  resetForm() {
    this.Patient = {};
    this.Patient.OpdDate = this.loadData.newloadDateYMD(new Date());

    if (this.formPatientDetails) {
      this.formPatientDetails.control.markAsPristine();
      this.formPatientDetails.control.markAsUntouched();
    }
    this.isSubmitted = false
  }

  getPatientList(PatientId: number) {

    var data = {
      PatientID: PatientId,
    }
    const obj: RequestModel = {
      request: this.localService.encrypt(JSON.stringify(data)).toString()
    };

    console.log("Sending request:", obj);
    this.dataLoading = true;

    this.service.getPatientList(obj).subscribe({
      next: r1 => {
        console.log("API Response:", r1);
        let response = r1 as any;
        if (response.Message == ConstantData.SuccessMessage) {
          this.PatientList = response.PatientList;

          for (let i = 0; i < this.PatientList.length; i++) {
            const e = this.PatientList[i];

            this.Patient.PatientName = e.PatientName;
            this.Patient.Age = e.Age;
            this.Patient.Gender = e.Gender;
            this.Patient.Address = e.Address;
            this.Patient.ContactNo = e.ContactNo;

          }
        } else {
          this.toastr.error(response.Message);
        }
        this.dataLoading = false;
      },
      error: err => {
        console.error("API error:", err);
        this.toastr.error("Error while fetching records");
        this.dataLoading = false;
      }
    });
  }


  AllChargeList: any[] = [];
  getChargeList() {
    var obj: RequestModel = {
      request: this.localService.encrypt(JSON.stringify({})).toString()
    }
    this.dataLoading = true
    this.service.getChargeList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.AllChargeList = response.ChargeList;
        this.AllChargeList.map(x1 => x1.SearchCharge = `${x1.Particular} - ${x1.Description}`);
        this.ChargeList = this.AllChargeList;
        
      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false
    }, (err => {
      this.toastr.error("Error while fetching records")
      this.dataLoading = false;
    }))
  }

  afterTransportSupplierSelected(event: any) {
    this.Payment.RegistrationChargeId = event.option.id;
    this.Payment.Particular = event.option.value;
    var Transport = this.ChargeList.find((x: any) => x.RegistrationChargeId == this.Payment.RegistrationChargeId);
    this.Payment.Particular = Transport.Particular;
    this.Payment.Amount = Transport.Amount;
    this.Payment.Description = Transport.Description;
    this.Payment.RegistraionChargeId = Transport.RegistrationChargeId;
  }

  filterTransportSupplierList(value: any) {
    if (value) {
      const filterValue = value.toLowerCase();
      this.ChargeList = this.AllChargeList.filter((option: any) => option.SearchCharge.toLowerCase().includes(filterValue));
    } else {
      this.ChargeList = this.AllChargeList;
    }
    this.Payment.RegistrationChargeId = 0;
  }
  clearTransportSupplier() {
    this.ChargeList = this.AllChargeList;
    this.Payment.RegistrationChargeId = null;
    this.Payment = {};
  }



  SelectedPaymentDetailList: any = []
  addPaymentDetail() {


    if (this.Payment.Amount == null || this.Payment.Amount == "") {
      this.toastr.error("Please Enter Paid Amount!!!")
      return;
    }
    if (this.Payment.Particular == null || this.Payment.Particular == "") {
      this.toastr.error("Please Select Payment Mode!!!")
      return;
    }
    this.Payment.RegistrationChargeId = this.Payment.RegistrationChargeId
    this.SelectedPaymentDetailList.push(this.Payment);
    this.CalculateTotalAmount();
    this.resetHotelPayment();

  }

  RemoveHotel(index: number) {
    this.SelectedPaymentDetailList.splice(index, 1);
    this.CalculateTotalAmount();
  }

  resetHotelPayment() {
    this.Payment = {};
    this.isSubmitted = false
  }

  CalculateTotalAmount() {
    let TotalAmount = 0;

    for (let i = 0; i < this.SelectedPaymentDetailList.length; i++) {
      const paymentDetail = this.SelectedPaymentDetailList[i];
      TotalAmount += parseFloat(paymentDetail.Amount) || 0;
    }

    this.Patient.TotalAmount = TotalAmount;
    this.Patient.DiscountAmount = 0;
    this.Patient.PayableAmount = TotalAmount;
    this.Patient.PaidAmount = 0;
  }

  updatePaymentFields() {
    this.Patient.PayableAmount = this.Patient.TotalAmount - this.Patient.DiscountAmount;
    this.Patient.PaidAmount = this.Patient.TotalAmount - this.Patient.DiscountAmount;
  }

  ChangeDuesAmount() {
    this.Patient.DueAmount = this.Patient.PayableAmount - this.Patient.PaidAmount;
  }


 saveOpd() {
 this.isSubmitted = true;

 // Optional: Enable form validation if needed
 // this.formPatient.control.markAllAsTouched();
 // if (this.formPatient.invalid) {
 // this.toastr.error("Fill all the required fields !!");
 // return;
 // }

 // ✅ Check if SelectedPaymentCollectionList is empty
 if (!this.SelectedPaymentCollectionList || this.SelectedPaymentCollectionList.length === 0) {
 this.toastr.error("Please add at least one payment to the list!");
 return;
 }
 if (!this.SelectedPaymentDetailList || this.SelectedPaymentDetailList.length === 0) {
 this.toastr.error("Please add at least one registration charge to the list!");
 return;
 }

 this.Patient.CreatedBy = this.staffLogin.StaffId;
 this.Patient.UpdatedBy = this.staffLogin.StaffId;

 const data = {
 GetOpdBooking: this.Patient,
 GetPaymentCollection: this.Patient,
 GetPaymentBookingDetails: this.SelectedPaymentDetailList,
 GetPaymentDetails: this.SelectedPaymentCollectionList,

};
// console.log(this.Patient);
console.log(data);


 const obj: RequestModel = {
 request: this.localService.encrypt(JSON.stringify(data)).toString()
 };

 this.dataLoading = true;
 this.service.saveOpd(obj).subscribe(r1 => {
 const response = r1 as any;

 if (response.Message === ConstantData.SuccessMessage) {
 if (this.Patient.OpdId > 0) {
 this.toastr.success("Booking Updated successfully");
 $('hashtag#staticBackdrop').modal('hide');
 } else {
 this.toastr.success("Booking added successfully");
 }

 this.SelectedPaymentDetailList = [];
 this.SelectedPaymentCollectionList = [];
 this.resetForm();
 } else {
 this.toastr.error(response.Message);
 }

 this.dataLoading = false;
 }, err => {
 this.toastr.error("Error occurred while submitting data");
 this.dataLoading = false;
 });
}


  SelectedPaymentCollectionList: any[] = [];

  addToPaymentList() {
    if (
      this.currentPayment.Particular &&
      this.currentPayment.Description &&
      this.currentPayment.PaidAmount != null
    ) {
      // Push a copy of the current input
      this.SelectedPaymentCollectionList.push({ ...this.currentPayment });

      // Reset currentPayment fields
      this.currentPayment = {
        Particular: '',
        Description: '',
        PaymentMode: '',
        PaidAmount: null
      };
    } else {
      alert('Please fill all fields!');
    }
  }

  removePaymentItem(index: number) {
    this.SelectedPaymentCollectionList.splice(index, 1);
  }

  updatePayment() {
    // this.Patient.PayableAmount = this.Patient.PaidAmount - this.Patient.DiscountAmount;
    this.currentPayment.PaidAmount = this.Patient.TotalAmount - this.Patient.DiscountAmount;
  }
}