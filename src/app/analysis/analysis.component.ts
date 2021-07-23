import { Component, OnInit } from '@angular/core';
import { info } from '../../assets/data/sample-data.json';
import { data } from '../../assets/data/sample-data.json'

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {
  info: any;
  data: any;

  monthStructure: any = {
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0,
    "7": 0,
    "8": 0,
    "9": 0,
    "10": 0,
    "11": 0,
    "12": 0,
    "13": 0,
    "14": 0,
    "15": 0,
    "16": 0,
    "17": 0,
    "18": 0,
    "19": 0,
    "20": 0,
    "21": 0,
    "22": 0,
    "23": 0,
    "24": 0,
    "25": 0,
    "26": 0,
    "27": 0,
    "28": 0,
    "29": 0,
    "30": 0,
    "31": 0
  };

  yearStructure: any = {
    "1": Object.assign({}, this.monthStructure),
    "2": Object.assign({}, this.monthStructure),
    "3": Object.assign({}, this.monthStructure),
    "4": Object.assign({}, this.monthStructure),
    "5": Object.assign({}, this.monthStructure),
    "6": Object.assign({}, this.monthStructure),
    "7": Object.assign({}, this.monthStructure),
    "8": Object.assign({}, this.monthStructure),
    "9": Object.assign({}, this.monthStructure),
    "10": Object.assign({}, this.monthStructure),
    "11": Object.assign({}, this.monthStructure),
    "12": Object.assign({}, this.monthStructure)
  };

  dataStructure: any = {};

  highLowStructure: any = {
    "highest": 0,
    "lowest": 0
  };

  yearValueStructure: any = {
    "1": Object.assign({}, this.highLowStructure),
    "2": Object.assign({}, this.highLowStructure),
    "3": Object.assign({}, this.highLowStructure),
    "4": Object.assign({}, this.highLowStructure),
    "5": Object.assign({}, this.highLowStructure),
    "6": Object.assign({}, this.highLowStructure),
    "7": Object.assign({}, this.highLowStructure),
    "8": Object.assign({}, this.highLowStructure),
    "9": Object.assign({}, this.highLowStructure),
    "10": Object.assign({}, this.highLowStructure),
    "11": Object.assign({}, this.highLowStructure),
    "12": Object.assign({}, this.highLowStructure)
  }

  dataValueStructure: any = {};

  monthHighValueStructure: any = Object.assign({}, this.monthStructure);
  monthLowValueStructure: any = Object.assign({}, this.monthStructure);

  constructor() {
    this.info = info;
    this.data = data;
  }

  ngOnInit(): void {
    console.log(info);
    console.log(data);

    this.initDataStructure(this.data);
    this.calculateMonthlyHighLow();
    this.calculateFinalMonthlyValues();
    this.displayHighLowValues();
    this.displayHighestLowestValues();
  }

  initDataStructure(data: any) {
    data.forEach(element => {
      var date = new Date(element.datetime);
      var year = date.getFullYear();
      if(this.dataStructure[year] == null) {
        this.dataStructure[year] = Object.assign({}, this.yearStructure);
        this.dataValueStructure[year] = Object.assign({}, this.yearValueStructure);
      }
      var month = date.getMonth() + 1;
      var dayOfMonth = date.getDate();
      this.dataStructure[year][month][dayOfMonth] = element.value;
    });
    console.log(this.dataStructure);
    console.log(this.dataValueStructure);
  }

  calculateMonthlyHighLow() {
    Object.keys(this.dataStructure).forEach(year => {
      Object.keys(this.dataStructure[year]).forEach(month => {
        var high = 0;
        var low = 99999;

        var highDayOfMonth = 0;
        var lowDayOfMonth = 0;

        Object.keys(this.dataStructure[year][month]).forEach(dayOfMonth => {
          if(this.dataStructure[year][month][dayOfMonth] != 0) {
            if(this.dataStructure[year][month][dayOfMonth] > high) {
              high = this.dataStructure[year][month][dayOfMonth];
              highDayOfMonth = Number(dayOfMonth);
            }
            if(this.dataStructure[year][month][dayOfMonth] < low) {
              low = this.dataStructure[year][month][dayOfMonth];
              lowDayOfMonth = Number(dayOfMonth);
            }
          }
        });

        this.dataValueStructure[year][month]["highest"] = highDayOfMonth;
        this.dataValueStructure[year][month]["lowest"] = lowDayOfMonth;
      });
    });

    console.log(this.dataValueStructure);
  }

  calculateFinalMonthlyValues() {
    Object.keys(this.dataValueStructure).forEach(year => {
      Object.keys(this.dataValueStructure[year]).forEach(month => {
        this.monthHighValueStructure[this.dataValueStructure[year][month]["highest"]]++;
        this.monthLowValueStructure[this.dataValueStructure[year][month]["lowest"]]++;
      });
    });
  }

  displayHighLowValues() {
    console.log(this.monthHighValueStructure);
    console.log(this.monthLowValueStructure);

    Object.keys(this.monthHighValueStructure).forEach(date => {
      var high = this.monthHighValueStructure[date];
      if(high !== 0) {
        document.querySelector("#date"+date+" span:first-child").innerHTML = high + ' <i class="bi bi-arrow-up-circle-fill text-success"></i>';
      }
      
    });

    Object.keys(this.monthLowValueStructure).forEach(date => {
      var low = this.monthLowValueStructure[date];
      if(low !== 0) {
        document.querySelector("#date"+date+" span:last-child").innerHTML = low + ' <i class="bi bi-arrow-down-circle-fill text-danger"></i>';
      }
      
    });
  }

  displayHighestLowestValues() {
    var highest = 0;
    var lowest = 0;

    var highest_date = "0";
    var lowest_date = "0";

    Object.keys(this.monthHighValueStructure).forEach(date => {
      if(this.monthHighValueStructure[date] !== 0 && this.monthHighValueStructure[date] > highest) {
        highest = this.monthHighValueStructure[date];
        highest_date = date;
      }
    });

    Object.keys(this.monthLowValueStructure).forEach(date => {
      if(this.monthLowValueStructure[date] !== 0 && this.monthLowValueStructure[date] > lowest) {
        lowest = this.monthLowValueStructure[date];
        lowest_date = date;
      }
    });

    if(highest_date != lowest_date) {
      document.querySelector("#date" + highest_date).classList.add("text-success");
      document.querySelector("#date" + lowest_date).classList.add("text-danger");
    } else {
      document.querySelector("#date" + highest_date).classList.add("text-warning");
      document.querySelector("#date" + lowest_date).classList.add("text-warning");
    }

    
  }

}


