import { Component, OnInit } from '@angular/core';
import { CountService } from "../../../share/services/count/count.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard-default',
  templateUrl: './dashboard-default.component.html',
  styleUrls: ['./dashboard-default.component.scss']
})
export class DashboardDefaultComponent implements OnInit {
  cards = [
    { name: 'Concrete Strength Calculator', count: 0, backgroundColor: '', iconColor: '', icon: 'engineering' },
    { name: 'Air Conditioner', count: 0, backgroundColor: '', iconColor: '', icon: 'air' },
    { name: 'Anti Termite', count: 0, backgroundColor: '', iconColor: '', icon: 'bug_report' },
    { name: 'Brick Calculation', count: 0, backgroundColor: '', iconColor: '', icon: 'bento' },
    { name: 'Flooring', count: 0, backgroundColor: '', iconColor: '', icon: 'grid_view' },
    { name: 'Solar Panel', count: 0, backgroundColor: '', iconColor: '', icon: 'solar_power' },
    { name: 'Stair Case', count: 0, backgroundColor: '', iconColor: '', icon: 'stairs' },
    { name: 'Steel Quantity', count: 0, backgroundColor: '', iconColor: '', icon: 'power_input' },
    { name: 'Water Tank', count: 0, backgroundColor: '', iconColor: '', icon: 'water_drop' },
    { name: 'Wood Frame', count: 0, backgroundColor: '', iconColor: '', icon: 'texture_minus' }
  ];

  currentUserName: string = 'Guest';
  currentTime: string = '';
  currentDate: string = '';
  greeting: string = '';
  data: any;
  private intervalId: any; // Stores the interval ID

  constructor(
    private countService: CountService,
    private router: Router
  ) {}

  ngOnInit() {
    const storedUserName = sessionStorage.getItem('userFullName');
    this.currentUserName = storedUserName ? storedUserName : 'Guest';

    this.cards = this.cards.map(card => ({
      ...card,
      backgroundColor: this.getRandomColor(),
      iconColor: this.getRandomDarkColor()
    }));

    // Update time, date, and greeting continuously
    this.updateTimeAndGreeting();
    this.intervalId = setInterval(() => this.updateTimeAndGreeting(), 1000);

    // Load count data
    this.loadDataCount();
  }

  ngOnDestroy(): void {
    // Clear the interval to avoid memory leaks
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  getRandomColor(): string {
    const min = 180;
    const max = 255;

    const r = Math.floor(Math.random() * (max - min + 1)) + min;
    const g = Math.floor(Math.random() * (max - min + 1)) + min;
    const b = Math.floor(Math.random() * (max - min + 1)) + min;

    return `#${this.rgbToHex(r)}${this.rgbToHex(g)}${this.rgbToHex(b)}`;
  }

  getRandomDarkColor(): string {
    const min = 0;
    const max = 100; // Ensures dark tones

    const r = Math.floor(Math.random() * (max - min + 1)) + min;
    const g = Math.floor(Math.random() * (max - min + 1)) + min;
    const b = Math.floor(Math.random() * (max - min + 1)) + min;

    return `#${this.rgbToHex(r)}${this.rgbToHex(g)}${this.rgbToHex(b)}`;
  }

  rgbToHex(value: number): string {
    const hex = value.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }

  updateTimeAndGreeting(): void {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    this.currentDate = now.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    const hours = now.getHours();
    if (hours < 12) {
      this.greeting = 'Good Morning';
    } else if (hours < 18) {
      this.greeting = 'Good Afternoon';
    } else {
      this.greeting = 'Good Evening';
    }
  }

  loadDataCount() {
    this.countService.getAllCount().subscribe(response => {
      this.data = response?.data;
      this.assignCounts();
    });
  }

  assignCounts(): void {
    const dataMapping = {
      'Air Conditioner': 'airConditionerDetailCount',
      'Anti Termite': 'antiTermiteDetailCount',
      'Brick Calculation': 'brickCalculationDetailCount',
      'Flooring': 'flooringDetailCount',
      'Solar Panel': 'solarPanelDetailCount',
      'Stair Case': 'stairCaseDetailCount',
      'Steel Quantity': 'steelQuantityDetailCount',
      'Water Tank': 'waterTankDetailCount',
      'Wood Frame': 'woodFrameDetailCount'
    };

    this.cards.forEach(card => {
      // @ts-ignore
      const dataKey = dataMapping[card.name];
      if (this.data[dataKey] !== undefined) {
        card.count = this.data[dataKey];
      }
    });
  }

  logout() {
    this.router.navigateByUrl('/security/login').then(() => {
      sessionStorage.clear();
    });
  }
}
