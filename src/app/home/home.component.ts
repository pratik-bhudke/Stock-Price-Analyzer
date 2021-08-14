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
        this.dataManagementService.data = fileData;
      } else {
        alert("No data in File");
      }
    }
    fileReader.onerror = (error) => {
      console.log(error);
    }
  }

  sampleDataToggle(value) {
    this.isSample = value;
  }

  ngOnInit(): void {
  }

}
