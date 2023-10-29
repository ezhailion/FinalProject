import { BehaviorType } from './../../models/behavior-type';
import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { Input } from '@angular/core';
import { Report } from 'src/app/models/report';

import * as Highcharts from 'highcharts';
import wordcloud from 'highcharts/modules/wordcloud';


wordcloud(Highcharts);

/*
 * Note: if we want to conditionally display this only when reports.length > 0,
 * that logic will need to go in the teacher component.
 * Any "ngIf" in this component will cause the Highlights library
 * to be unable to find the element in the DOM.
*/

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
  @Input() studentName : string = '';



  celebrationsColor = '#28a745' // Same as bootstrap btn-success
  challengesColor   = '#dc3545' // Same as bootstrap btn-danger




  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    series: [{
      data: [{
        name: 'No entries yet',
        weight: 1
    }],
      type: 'wordcloud',
      name: 'Occurrences',

    }],
    title: {text : ""}
  }

  donutOptions: Highcharts.Options = {
    series: [{
      data: [{ name: 'Celebrations', y: 3}, {name : 'Challenges', y: 1}],
      type: 'pie'
    }],
    plotOptions : {
      pie: { dataLabels: { enabled : false }, showInLegend : true }
    },
    title : {text : 'Celebrations : Challenges'},
    colors : [this.celebrationsColor, this.challengesColor]
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {

    let currentReport : Report[] = changes['item'].currentValue;

    /*
     * Building the wordcloud
    */
    let theNames = this.getNamesFromReports(currentReport);

    this.chartOptions = {
      series: [{
        data: this.countNames(theNames),
        type: 'wordcloud',
        name: 'Occurrences'
      }],
        title: {text: `${this.studentName}'s Behaviors`}
    }

    Highcharts.chart("wordCloudWindow", this.chartOptions);

    /*
     * Building the pie chart
    */

    let bratio = this.getBehaviorRatio(currentReport);
    this.donutOptions.series = [{
      data: [{ name: 'Celebrations', y: bratio.good}, {name : 'Challenges', y: bratio.bad}],
      type: 'pie'
    }];

    Highcharts.chart("behaviorRatioWindow", this.donutOptions);

  }

  getNamesFromReports(reports : Report[]) : string[] {
    let acc : string[] = [];
    reports.forEach(r => r.behaviors.forEach(b => acc.push(b.name)))
    return acc;
  }

  countNames(names : string[]) {

    let freqMap : any = {};
    let freqArr = [];

    for (let n of names) {
      if (Object.hasOwn(freqMap, n)) {
        freqMap[n] = freqMap[n] + 1;
      }  else {
        freqMap[n] = 1;
      }
    }

    for (let n in freqMap) {
      freqArr.push ( { name : n, weight: freqMap[n] })
    }

    return freqArr;

  }


  getBehaviorRatio(reports: Report[]) : {good: number, bad: number} {

    let freqMap = {good: 0, bad: 0};
    reports.forEach(r => r.behaviors.forEach(b => {
      if (b.behaviorType.name == 'good') {
        freqMap.good = freqMap.good + 1;
      } else {
        freqMap.bad = freqMap.bad + 1;
      }
    }))
    return freqMap;
  }

constructor() {}

}
