import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import * as CanvasJS from '../canvasjs.min';



@Component({
  selector: 'app-live-score',
  templateUrl: './live-score.component.html',
  styleUrls: ['./live-score.component.css']
})
export class LiveScoreComponent implements OnInit {
  public URL: string = 'http://localhost:3004/cricket'
  chartOptions : any;
  team1: string;
  team2: string;
  stats: any;
  description: any;
  predictedScore: any;
  team3: any;
  overs: any;
  batsman1: any;
  batsman2: any;
  runRate: any
  team4: any;
  overs10: any=0;
  overs20: any=0;
  overs30: any=0;
  overs40: any=0;
  overs50: any=0;
  Fovers10: number=0;
  Fovers20: number=0;
  Fovers30: number=0;
  Fovers40: number=0;
  Fovers50: number=0;
  Sovers10: number=0;
  Sovers20: number=0;
  Sovers30: number=0;
  Sovers40: number=0;
  Sovers50: number=0;
  baller: string;
  constructor(
    public http: HttpClient
  ) { }

  ngOnInit() {
    this.getLiveScore()
    setTimeout(() => {
      this.getCharts()
    }, 1000);
    
  }

 

  getLiveScore() {
    return this.http.get(this.URL).subscribe((data: any) => {
      debugger
      console.log(data)
      this.team1 = data[0].si.split(' ')[0]
      this.team2 = data[0].si.split(' ')[1]
      this.team3 = data[0].si.split(' ')[5]
      this.team4 = data[0].si.split(' ')[6]
     
      this.team1 = this.team1 + ' ' + this.team2
      this.team3 = this.team3 + ' ' + this.team4
      console.log(this.team1,this.team3)
      this.stats = this.team1
      this.description = data[0].de.split(' ')[0] + ' ' + data[0].de.split(' ')[1]
      this.overs = data[0].de.split(' ')[3].replace('(', '')
      if(this.overs.includes('.')){
        var ovr1 = this.overs.split('.')[1]
        var ovr0 = this.overs.split('.')[0]
        // console.log('ovr',ovr1)
        if(ovr1 == 6){
          ovr0++
           this.overs = ovr0
        }
      }
      console.log('new over',this.overs)
      this.batsman1 = data[0].de.split(' ')[5] + ' ' + data[0].de.split(' ')[6] + ' ' + data[0].de.split(' ')[7]
      this.batsman2 = data[0].de.split(' ')[8] + ' ' + data[0].de.split(' ')[9] + ' ' + data[0].de.split(' ')[10]
      this.baller = data[0].de.split(' ')[11] + ' ' + data[0].de.split(' ')[12] + ' ' + data[0].de.split(' ')[13]
      var ball1 = parseInt(this.overs.split('.')[0]) * 6
      var ball2 = parseInt(this.overs.split('.')[1])
      var balls = ball1 + ball2
      console.log(balls)
      this.runRate = parseInt(data[0].de.split(' ')[1].replace('/ ', '')) / parseInt(this.overs)
      //this.runRate = Math.round(this.runRate)
      console.log(this.runRate)
      //console.log(parseInt(data[0].de.split(' ')[1].replace('/ ','')))
      this.predictedScore = (50 * this.runRate).toFixed()
      console.log(this.overs)

      if(this.description.includes('SL')){
        var scores = this.description.split(' ')[1].split('/')[0]
        //console.log('score',scores)
      if(this.overs > 0 && this.overs <= 10){
        this.overs10 = parseInt(scores) 
        //console.log('over',this.overs10)
        localStorage.setItem('SLovers10',this.overs10)
      }
      if(this.overs > 10 && this.overs <= 20){
        this.overs20 = parseInt(scores) 
        localStorage.setItem('SLovers20',this.overs20)
      }
      if(this.overs > 20 && this.overs <= 30){
        this.overs30 = parseInt(scores) 
        localStorage.setItem('SLovers30',this.overs30)
      }
      if(this.overs > 30 && this.overs <= 40){
        this.overs40 = parseInt(scores)
        localStorage.setItem('SLovers40',this.overs40) 
      }
      if(this.overs > 40) {
        this.overs50 = parseInt(scores) 
        localStorage.setItem('SLovers50',this.overs50)
      }
      }

      else if(this.description.includes('WI')) {
        var scores = this.description.split(' ')[1].split('/')[0]
      if(this.overs > 0 && this.overs <= 10){
        this.overs10 = parseInt(scores) 
        console.log('wiovers',this.overs10)
        localStorage.setItem('Sovers10',this.overs10)
      }
      if(this.overs > 10 && this.overs <= 20){
        this.overs20 = parseInt(scores) 
        localStorage.setItem('Sovers20',this.overs20)
      }
      if(this.overs > 20 && this.overs <= 30){
        this.overs30 = parseInt(scores) 
        localStorage.setItem('Sovers30',this.overs30)
      }
      if(this.overs > 30 && this.overs <= 40){
        this.overs40 = parseInt(scores)
        localStorage.setItem('Sovers40',this.overs40) 
      }
      if(this.overs > 40) {
        this.overs50 = parseInt(scores) 
        localStorage.setItem('Sovers50',this.overs50)
      }
      }
      
      console.log(this.overs10,this.overs20,this.overs30,this.overs40,this.overs50)
      //console.log('yes',this.description.split(' ')[1].split('/')[0])
      console.log(this.predictedScore)
    })
  }

  getCharts() {
    this.Fovers10 = parseInt(localStorage.getItem('SLovers10'))
    this.Fovers20 = parseInt(localStorage.getItem('SLovers20'))
    this.Fovers30 = parseInt(localStorage.getItem('SLovers30'))
    this.Fovers40 = parseInt(localStorage.getItem('SLovers40'))
    this.Fovers50 = parseInt(localStorage.getItem('SLovers50'))

    this.Sovers10 = parseInt(localStorage.getItem('Sovers10'))
    this.Sovers20 = parseInt(localStorage.getItem('Sovers20'))
    this.Sovers30 = parseInt(localStorage.getItem('Sovers30'))
    this.Sovers40 = parseInt(localStorage.getItem('Sovers40'))
    this.Sovers50 = parseInt(localStorage.getItem('Sovers50'))
    
    this.chartOptions = {
      chart: {
       type: 'bar'
      },
      title: {
       text: 'Score Comparison',
       style: {
         color : "#ff0000"
       }
      },
     xAxis: {
      categories: ['40-50', '30-40', '20-30', '10-20', '0-10']
     },
     yAxis: {
      title: {
        text: 'Runs Scored'
       },
       categories: []
     },
     series: [{
      name: this.team1,
      data: [this.Fovers50, this.Fovers40, this.Fovers30, this.Fovers20, this.Fovers10]
     }, { 
      name: this.team3,
      data: []
     }]
     }
      
  }
  ngOnDestroy(): void {debugger
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    localStorage.clear();
  }
}
