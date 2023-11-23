import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { Router } from '@angular/router';
import { EventEmiterService } from '../services/event-emiter.service';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SerpAPIService } from '../services/serp-api.service';
import { PdfViewerComponent } from 'ng2-pdf-viewer/src/app/pdf-viewer/pdf-viewer.component';


@Component({
  selector: 'app-med-home',
  templateUrl: './med-home.component.html',
  styleUrls: ['./med-home.component.css']
})
export class MedHomeComponent {
  stringToSearch = 'hi';
  quesValue:string ="";
  isChatOpen:boolean = false;
  color1:any="#ffe6e9"
  zoom: number = 1.0;
  panelOpenState = false;
  overview:boolean=false;
  activeMatatb:number=0;
  pdfRotation: number =0;
  accordianData:any = [{
                          "title": "Document Summary",
                          "desc": "This is a prior authorization request for Actemra and contains clinical records of a patient's medical history, including medications, problems, surgeries and encounters. The medications prescribed to the patient include Hydrochlorothiazide 25 MG and 24 HR Metformin hydrochloride 500 MG Oral Tablet. The patient has been diagnosed with Ulcerative Pancolotis, Elevated ESR, Diabetes, Hypertriglyceridemia (disorder), Metabolic Syndrome X (disorder), DVT and Rheumatoid Arthritis. The surgeries performed on the patient include Colonoscopy and Medication Reconciliation (procedure). The encounters include Hemoglobin [Mass/volume] in Blood ; Hematocrit [Volume Fraction] of Blood ; MCV [Entitic volume] by Automated count; MCH [Entitic mass] by Automated count; MCHC [Mass/volume] ; additionally the patient reported worsening pain in their knee as an additional complaint"
                        },
                        {
                          "title": "ICD codes",
                          "desc": "<b>K51.019(Ulcerative Pancolitis)</b> <br> Date: 2019-01-27<br> <a href='javascript:void(0)'> Reference Text: K51.019 </a> <br> Page Number: 5 <br><b>R70.0(Elevated ESR) </b><br> Date: 2019-02-05<br> <a href='javascript:void(0)'>Reference Text: R70.0</a><br> Page Number: 5\
                          <br><b>E118(Diabetes)</b> <br> Date: 2019-02-12<br> <a href='javascript:void(0)'> Reference Text: E118 </a> <br> Page Number: 5 <br><b>E78.1(Hypertriglyceridemia (disorder)) </b><br> Date: 1991-02-15<br> <a href='javascript:void(0)' >Reference Text: E78.1</a><br> Page Number: 5 \
                          <br><b>E88.810(Metabolic syndrome X (disorder))</b> <br> Date: 2017-02-18<br> <a href='javascript:void(0)'> Reference Text: E88.810 </a> <br> Page Number: 5 <br><b> I82.4(DVT) </b><br> Date: 2019-02-18<br> <a href='javascript:void(0)' >Reference Text: I82.40</a><br> Page Number: 5\
                          <br><b>M06.9(Rheumatoid Arthritis)</b> <br> Date: 2019-02-21<br> <a href='javascript:void(0)'> Reference Text: M06.9 </a> <br> Page Number: 5 <br><b> R73.9(Hyperglycemia (disorder)) </b><br> Date: 2019-02-18<br> <a href='javascript:void(0)' >Reference Text: R73.9</a><br> Page Number: 5",
                          "page_num": 5
                        },

                        {
                          "title": "Medication History (Within past 6 months)",
                          "desc": "<b>RxNorm 316049(Hydrochlorothiazide 25 MG)</b> <br> Date: 2019-05-27<br> <a href='javascript:void(0)'> Reference Text: RxNorm 316049</a> <br> Page Number: 3 <br><b>RxNorm 860975(24 HR Metformin hydrochloride 500 MG Extended Release Oral Tablet) </b><br> Date: 2019-06-12<br> <a href='javascript:void(0)'>Reference Text: RxNorm 860975</a><br> Page Number: 3",
                          "page_num": 3
                        },
                        {
                          "title": "Ulcerative collitis",
                          "desc": "<b>K51.019(Ulcerative Pancolitis)</b> <br> Date: 2019-01-27<br> <a href='javascript:void(0)'> Reference Text: K51.019 </a> <br> Page Number: 5",
                          "page_num": 5

                        },
                        {
                          "title": "Cardiac Disease",
                          "desc":"No Data Found"
                        },
                        {
                          "title": "Blood Disorders",
                          "desc":"<b>DVT </b><br> Date: 2019-02-18<br> <a href='javascript:void(0)' >Reference Text: DVT </a><br> Page Number: 5",
                          "page_num": 5
                        },
                        {
                          "title": "Lung Conditions",
                          "desc":"No Data Found"
                        },
                        {
                          "title": "Disease Progression",
                          "desc":"<b>Knee pain - relapsing </b><br> <a href='javascript:void(0)' >Reference Text - worsening pain in the knee</a> <br> Page No: 36",
                          "page_num": 36
                        }
                      ];
  dataInsight:any = [
                      {
                        "title": "Demographics",
                      },
                      {
                        "title": "Physical Condition",
                      }

                    ];
  dataInsight2:any = [
                      {
                        "title": "Filter the data of subject between age 35 and 65 and with precondition as hypertension and either two doses or no vaccine??",
                      },
                      {
                        "title": "What is the distribution of male and female in subjects??",
                      }

                    ];
  pdfSrc = "../../assets/ActemraPrior_Auth_Request_synthetic.pdf";
  isUpload:boolean=false;
  pageVariable: number= 1;
  showAll:boolean=true;
  answer:string="";
  statusClass: string = "nonactive";
  statusClass2: string = "nonactive";


  constructor(
    public dialog: MatDialog,
    private _signInService: EventEmiterService,
    private ngxLoader: NgxUiLoaderService,
    private serpAPIService: SerpAPIService,

  ) {
    this._signInService.fileUpload.subscribe((data: boolean) => {

      this.ngxLoader.start();
      setTimeout(() => {
        this.ngxLoader.stop();
        this.isUpload = data;
      }, 15000);

    });
  }
  ngOnInit() {

  }

  onChangeMedical(event:any){
    this.activeMatatb = event.index;
    this.overview= !this.overview;

  }
 //Zoom funtion for pdf section
  incrementZoom(amount: number) {
    this.zoom += amount;
  }
  //Zoom funtion for pdf section
  incrementZoom2() {
    this.zoom = 2.5;
  }
  //Zoom funtion for pdf section
  incrementZoom3() {
    this.zoom = 1;
  }
  rotatePdf(){
    this.pdfRotation = this.pdfRotation +=90;
  }

  openQuery(){
    this.isChatOpen = !this.isChatOpen
  }
  uploadDialog() {

    const dialogRef = this.dialog.open(FileUploadComponent, {
      width: '800px',
      height: '390px',
    });
  }
  sendMessage(){


    if(this.quesValue.length>0){
      let temp_dict =  {
          "title": this.quesValue,
          "desc": "Please wait, We are working....."
      }
      this.accordianData.push(temp_dict);
    }
    let maxlength:number = 0;
    maxlength = this.accordianData.length
    let data = {
      "question": this.quesValue,
      "container":"clinicaldocinsights"
    }
    this.serpAPIService.fetchLoadAuditData(data).subscribe((res:any)=>{
      if(res){
        this.answer = res.response
        this.accordianData[maxlength-1].desc = this.answer;
        setTimeout(() => {

          this.accordianData[maxlength-1].desc = this.answer;

        }, 100);
      }

    },(error) => {
      console.log(error,"error------->")
      this.accordianData[maxlength-1].desc = error;
    })

    this.quesValue = '';

  }
  changePage(pageNum:any){
    this.pageVariable= pageNum;
    this.showAll= false;

  }
  showAllTrue(event:any){
    console.log(" this.showAll", this.showAll)
    this.showAll= true;
  }
  changefeedback(){
    if(this.statusClass=='nonactive'){
      this.statusClass = 'active1'
    }else if(this.statusClass=='active1'){
      this.statusClass='nonactive'
    }
    this.statusClass2='nonactive'
  }
  changeback(){
    if(this.statusClass2=='nonactive'){
      this.statusClass2 = 'active2'
    }else if(this.statusClass2=='active2'){
      this.statusClass2='nonactive'
    }
    this.statusClass='nonactive'

  }

}
