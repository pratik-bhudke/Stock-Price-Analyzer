import { Injectable } from '@angular/core';
import { info } from '../../../assets/data/sample-data.json';
import { data } from '../../../assets/data/sample-data.json';

@Injectable({
  providedIn: 'root'
})
export class DataManagementService {
  info;
  data;

  constructor() {
    this.resetToSampleData();
  }

  resetToSampleData() {
    this.info = info;
    this.data = data;
  }
}
