import { Component, ElementRef,ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-section',
  templateUrl: './chat-section.component.html',
  styleUrls: ['./chat-section.component.css']
})
export class ChatSectionComponent {

  @ViewChild('scroll', { read: ElementRef })

  public scroll!: ElementRef<any>;
  chatMe: any = [];
  chatYou: any = [{ text: 'Fine' }];
  isShowChat: boolean = true;
  meText: string = '';
  showLoader: boolean = false;
  checked: boolean = false;
  landingTitle: any;
  roleUserData: any;
  firstFormGroup: any = FormGroup;
  shortLink: string = '';
  fileName: any = ''; // Variable to store file
  isCompleted: boolean = false;
  myFiles: string[] = [];
  filenameList: any = [];
  isSucMsg: boolean = false;
  submitted: any = false;
  fileFormat: boolean = false;
  @ViewChild('autosize')
  frmData: any;
  queryTable:any = [];
  @ViewChild('scroll', { read: ElementRef })
  //  form: FormGroup;
  showMultipleSchema: boolean = false;
  saveMsg: boolean = false;
  isActHome = false;
  isActSet = false;
  isActResults = false;
  localFileList: any = [];
  submitLoader: boolean = false;
  panelOpenState = false;
  questionData: any;
  answer:any;
  src:any;
  zoom: number = 1.0;
  rotate: number = 90;
  totalPages: any;
  page= 1;
  pageLength: number = 0;
  searchText = '';

  constructor(
    public fb: FormBuilder,
    public router: Router,

  ) {

  }

  ngOnInit(): void {
    this.firstFormGroup = new FormGroup({
      question: new FormControl(''),
    });

  }


  sendMessage() {
    this.showLoader = true;
    this.checked = false;
    this.isShowChat = false;
    let  filterValue: string = ''
    filterValue = this.firstFormGroup.get('question')?.value;
    filterValue = filterValue.toLowerCase()
    let data = {
      question : filterValue
    }
    this.chatMe.push({ prompt: this.firstFormGroup.get('question')?.value,answer:"hat are the Diagnostic and Lab test that the applicant has taken in the last 5 years?"});
    // this.service.getResponse(data).subscribe((res:any)=>{
    //   if(res){
    //     this.showLoader = false;
    //     this.answer = res.response;
    //     this.src = res.sas_url;
    //     this.chatMe.push({ answer:this.answer});
    //     for(let i=0; i<=this.chatMe.length;i++){
    //       if(this.firstFormGroup.get('question')?.value === filterValue){
    //         this.chatMe[i].answer= this.answer;
    //       }
    //     }
    //   }

    // },(error) => {
    //   this.showLoader = false;
    //   this.showSnackBar(error);
    // })
    this.chatMe= [{ "prompt": "wbi", "answer": "hat are the Diagnostic and Lab test that the applicant has taken in the last 5 years?" },{ "prompt": "wbi", "answer": "hat are the Diagnostic and Lab test that the applicant has taken in the last 5 years?" },{ "prompt": "wbi", "answer": "hat are the Diagnostic and Lab test that the applicant has taken in the last 5 years?" }]
    this.firstFormGroup.reset();
    this.firstFormGroup.reset();
  }
  resetForm() {
    this.ngOnInit();
    this.submitted = false;
  }

  addQuesFunc(text: any) {
    this.firstFormGroup.get('question')?.patchValue(text);
  }

  deleteChat() {
    this.chatMe = [];
    this.showLoader = false;
    this.isShowChat = true;
  }
  ngAfterViewChecked() {
    this.scrollBottom();
  }

  public scrollBottom() {
    if (this.scroll && this.scroll.nativeElement) {
      this.scroll.nativeElement.scrollTop =
        this.scroll.nativeElement.scrollHeight;
    }
  }
  askQuestion(event:any){
    // this._signInService.askQuestion.emit(event.target.innerText);

  }
  private showSnackBar(message: string): void {
    // this.snackBar.open('Error occured, Please try again!!','', {
    //   duration: 4000, // Duration in milliseconds
    //   verticalPosition: 'top',
    //   panelClass: 'my-custom-snackbar',
    // });
  }



}
