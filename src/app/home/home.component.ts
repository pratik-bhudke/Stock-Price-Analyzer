import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataManagementService } from '../shared/services/data-management.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'stock-price-analyzer';

  isSample: boolean;
  fileToUpload: File | null = null;
  
  constructor(private router: Router, private dataManagementService: DataManagementService) {
    this.isSample = true;
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(this.fileToUpload, "UTF-8");
    fileReader.onload = () => {
      const fileData = JSON.parse(fileReader.result as string);
      if("data" in fileData) {
        this.dataManagementService.data = fileData["data"];
      } else {
        alert("No data in File");
      }
      if("info" in fileData) {
        this.dataManagementService.info = fileData["info"];
      } else {
        this.dataManagementService.info = "";
        console.log("No information of uploaded data.")
      }
    }
    fileReader.onerror = (error) => {
      console.log(error);
      alert("Error in uploading file.")
    }
  }

  sampleDataToggle(value) {
    this.isSample = value;
    if(this.isSample) {
      this.dataManagementService.resetToSampleData();
    }
  }

  ngOnInit(): void {
  }

}
