import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-app-home',
  templateUrl: './app-home.component.html',
  styleUrls: ['./app-home.component.css']
})
export class AppHomeComponent {
  @ViewChild('sidenav')
  sidenav!: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  panelOpenState = false;


  accordianData:any = [
  {
    "title": " Medicare Reopen Standard Operating Procedure",
    "desc": "out-of-network request for outPatient, InPatient Planned and IP Post-Acute services for a Highmark Member with a <br>\
    nerrow network plan.",
    "accordian_details":[
      {
        "document_name":"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "category":"veniam, quis nostrud ",
        "use_of_doc":"ipsum dolor sit amet, consectetur adipiscing elit",
        "problem_in_doc":"dolor in reprehenderit in",
        "summary_of_doc":"consectetur adipiscing elit",

      }
    ]
  },
  {
    "title": "Reopen Standard Operating Procedure",
    "desc": "Request for outPatient, InPatient Planned and IP Post-Acute services for a Highmark Member with a <br>\
    nerrow network plan.",
    "accordian_details":[
      {
        "document_name":"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "category":"veniam, quis nostrud ",
        "use_of_doc":"ipsum dolor sit amet, consectetur adipiscing elit",
        "problem_in_doc":"dolor in reprehenderit in",
        "summary_of_doc":"consectetur adipiscing elit",

      }
    ]
  }

];

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
}
