import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EventEmiterService } from '../services/event-emiter.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
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
  @ViewChild('scroll', { read: ElementRef })
  form: any = FormGroup;
  showMultipleSchema: boolean = false;
  saveMsg: boolean = false;
  isActHome = false;
  isActSet = false;
  isActResults = false;
  localFileList: any = [];
  submitLoader: boolean = false;
  progress: any = 0;
  message: any = '';
  progressBar: any = 'false';
  folder_table: any = [];
  file_folder: any = File;
  isFiles:boolean = true;
  fileUpload:File[] = [];
  isUploaded:boolean = false;
  array:any;
  sucessMessage:any = '';
  constructor(
    private fb: FormBuilder,
    public router: Router,
    public dialog: MatDialog,
    private _signInService: EventEmiterService,



  ) {}
  get getUploadFormControl() {
    return this.firstFormGroup.controls;
  }
  ngOnInit(): void {
    this.folder_table = localStorage.getItem('folder_table');
    this.folder_table = JSON.parse(this.folder_table);

    document.body.classList.add('homePage');
    this.firstFormGroup = this.fb.group({
      fileUpload: ['', [Validators.required]],
    });
    this.form = new FormGroup({
      relationName: new FormArray([
        new FormGroup({
          name: new FormControl(''),
        }),
      ]),
    });
  }
  //folder upload
  uploadFiles(files: any) {
    const arrFiles = Array.from(files);
    let tempArray1: any = [];
    this.file_folder = {
      id: this.folder_table.length + 1,
      folder_name: '',
      file_name: [],
      isInclude: false,
      isActive: false
    };
    arrFiles.forEach((file:any) => {
      localStorage.setItem('fileUploaded', 'false');
      const path: string = file['webkitRelativePath'];
      const pathPieces = path.split('/');
      const currentFolder = pathPieces[1];
      let files_name = currentFolder;
      let folder =  pathPieces[0];
      this.file_folder.folder_name = folder;
      const obj = {
        id: this.folder_table.length + 1,
        folder_file: files_name,
        isInclude: false,
        isActive: false
      };
      tempArray1.push(obj);
      this.filenameList.push(files_name);
      this.localFileList.push(files_name);


    });
    this.fileUpload = files;
    this.file_folder['file_name'] = tempArray1;
    this.folder_table.push(this.file_folder);
    localStorage.setItem('folder_table', JSON.stringify(this.folder_table));

  }

  //files upload
  onChange(files: any) {
    console.log(files,'this.files')

    // localStorage.setItem('fileUploaded', 'false');
    // this.filenameList = [];
    // this.isCompleted = false;
    // this.submitLoader = false;
    // this.file_folder = {
    //   id: 2,
    //   folder_name: 'Unclassified',
    //   file_name: [],
    //   isInclude: false,
    //   isActive: false

    // };
    // this.file_folder = this.folder_table[0];
    // this.folder_table[0].isInclude = false;
    // this.folder_table[0].isActive = false;
    let tempArray: any = [];
    for (var i = 0; i < files.target.files.length; i++) {
      this.myFiles.push(files.target.files[i]);
      const obj = {
        id:  i,
        folder_file: files.target.files[i].name,
        isInclude: false,
        isActive: false
      };
      this.localFileList.push(obj);
      console.log(this.localFileList,'this.localFileList')
    }
    this.fileUpload = files.target.files
    localStorage.setItem('folder_table', JSON.stringify(this.folder_table));

  }
  onUpload() {
    this.progressBar = 'false';
    this.progress =  0;
    if (!this.firstFormGroup.valid) {
      this.submitted = true;
      this.getUploadFormControl.fileUpload.setValidators([Validators.required]);
      this.getUploadFormControl.fileUpload.updateValueAndValidity();
      return;
    }
    this.isCompleted = true;

    this.filenameList = [];
    setInterval(() => {
      this.progressBar = localStorage.getItem('fileUploaded');
      if (this.progress < 100) {
        if (this.progress < 80 && this.progressBar == 'false') {
          this.progress = this.progress + 10;
          if(this.isFiles){
            this.message = `File(s) are being uploaded........`;
          }else{
            this.message = `Folder(s) are being uploaded........`;
          }
        } else if (this.progressBar == 'false') {
          this.progress = 100;
          if(this.isFiles){
            this.isUploaded = true;
            this.sucessMessage = `Selected data has been uploaded successfully.`;
          }else{
            this.sucessMessage = `Sccessfully uploaded`;
          }
          this.myFiles = [];
          this.localFileList = [];
        }else if(this.progress === 100){
          this.progressBar = 'false';
          this.progress =  0;
        }
        else if (this.progressBar == 'failed') {
          this.message = 'Oops...file upload has been failed, please retry';
        }
      }

    }, 1000);
  }
  radioChange(event: any) {
    if(event === 'files'){
      this.isFiles = true;
    }else{
      this.isFiles = false;
    }
  }
  closePop(){
    this._signInService.fileUpload.emit(true);


  }


}
