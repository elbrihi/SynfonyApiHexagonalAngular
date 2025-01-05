import { Component, ElementRef, viewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-analytics',
  template: `

<div class="chart-container">
        <canvas #chart></canvas>
      </div>
      <button mat-raised-button class ="mt-16">Go to Channel analytics</button>

`,
standalone: false,
  styles:`
    .chart-container{
      height: calc(100% - 100px);
      width: 100%;
    }

    .chart-container {
      width: 100%;
      height: 300px;  /* Adjust for responsiveness */
    }

    @media (max-width: 768px) { /* Tablet Layout */
      .chart-container {
        height: 250px;
      }
    }

    @media (max-width: 480px) { /* Mobile Layout */
      .chart-container {
        height: 200px;
      }
    }
  `
})
export class AnalyticsComponent {
  chart = viewChild.required<ElementRef>('chart')

  ngOnInit()
  {
    console.log(this.chart)
    new Chart(this.chart().nativeElement, {
      type: 'line',  // Set the type of chart (e.g., 'line', 'bar', etc.)
      data: {
        labels: ['Aug', 'Sep', 'Oct', 'Nov','Jan'],  // Example labels
        datasets: [{
          label: 'Views',
          data: [100, 102, 110, 115,120],  // Example data points
        
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgb(225,99,132,0,1)',
          fill: 'start',
        }]
      },
      options: {
        maintainAspectRatio: true,  // Ensures the chart is responsive
        elements: {
          line: {
            tension: 0.4
          }
        }
      }
    });
  }
}
