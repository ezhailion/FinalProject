import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { Input } from '@angular/core';
import { Report } from 'src/app/models/report';

import * as Highcharts from 'highcharts';
import wordcloud from 'highcharts/modules/wordcloud';
import { Student } from 'src/app/models/student';
import { Behavior } from 'src/app/models/behavior';
wordcloud(Highcharts);

@Component({
  selector: 'app-report',

  template: `<highcharts-chart
  [Highcharts]="Highcharts"

  [constructorType]="chartConstructor"
  [options]="chartOptions"
  [callbackFunction]="chartCallback"

  [(update)]="updateFlag"
  [oneToOne]="oneToOneFlag"
  [runOutsideAngular]="runOutsideAngular"

  style="width: 100%; height: 400px; display: block;"
></highcharts-chart>`,

  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnChanges {

  @Input() item : Report[] = [];

  knownNames : string[] = [
    'Perseverance',
    'Integrity',
    'Empathy',
    'Accountability',
    'Collaboration',
    'Impulsivity',
    'Apathy',
    'Disrespectfulness',
    'Aggression',
    'Pessimism'
  ]

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    series: [{

      data: [{
        name: 'Good 🍎',
        weight: 3
    }, {
        name: 'some word',
        weight: 2
    }, {
        name: 'nice thing',
        weight: 1
    }],
      type: 'wordcloud',
      name: 'Occurrences'
    }]
  }

  ngOnInit() {
    Highcharts.chart("testingTest", this.chartOptions);

    console.log(this.item)
    // let names : String[] = [];
    // this.item.forEach(r => r.behaviors.forEach(b => names.push(b.name)));

    // console.log(names)


  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['item'])


    let currentReport : Report[] = changes['item'].currentValue;
    let theNames = this.getNamesFromReports(currentReport);
    console.log(this.getNamesFromReports(currentReport));
    this.chartOptions = {
      series: [{
        data: this.countNames(theNames, this.knownNames),
        type: 'wordcloud',
        name: 'Occurrences'
      }]
    }
    // changes.prop contains the old and the new value...

    Highcharts.chart("testingTest", this.chartOptions);

    let count = (names : string[], s : string) : number => names.filter(n => n === s).length

    let one = count(this.knownNames, 'Perseverance'); // hopefully one
    console.log('ONE ' + one)
  }

  getNamesFromReports(reports : Report[]) : string[] {
    let acc : string[] = [];
    reports.forEach(r => r.behaviors.forEach(b => acc.push(b.name)))
    return acc;
  }

  countNames(names : string[], knownNames: string[]) {
    // [{  name: "apple",  weight: 3}]
    let freqMap = [];

    let count = (names : string[], s : string) : number => names.filter(n => n === s).length
    for (let n of knownNames) {
      freqMap.push( {name: n, weight: count(names, n)})
    }

    return freqMap;

  }


constructor() {}

}
