import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'stock-price-analyzer';

  isSample: boolean;
  fileToUpload: File | null = null;
  
  constructor(private router: Router) {
    this.isSample = true;
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  sampleDataToggle(value) {
    this.isSample = value;
  }

  ngOnInit(): void {
  }

}
