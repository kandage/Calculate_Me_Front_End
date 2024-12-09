import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent {
  expanded = false;
  file: any;

  menuItems = [
    { label: 'Home', icon: 'home', route: '/process/playground/dashboard' },
    { label: 'Concrete Strength', icon: 'engineering', route: '/process/playground/calculator/concrete-strength' },
    { label: 'Air Conditioner', icon: 'air', route: '/process/playground/calculator/air-conditioner' },
    { label: 'Anti Termite Calculator', icon: 'bug_report', route: '/process/playground/calculator/anti-termite-calculator' },
    { label: 'Brick Calculator', icon: 'bento', route: '/process/playground/calculator/brick-calculator' },
    { label: 'Flooring Calculator', icon: 'grid_view', route: '/process/playground/calculator/flooring-calculator' },
    { label: 'Solar Panel Calculator', icon: 'solar_power', route: '/process/playground/calculator/solar-panel-calculator' },
    { label: 'Stair Case Calculator', icon: 'stairs', route: '/process/playground/calculator/staircase-calculator' },
    { label: 'Steel Quantity', icon: 'power_input', route: '/process/playground/calculator/steel-quantity' },
    { label: 'Water Tank', icon: 'water_drop', route: '/process/playground/calculator/water-tank' },
    { label: 'Wood Frame', icon: 'texture_minus', route: '/process/playground/calculator/wood-frame' },
  ];

  constructor(
    private router: Router
  ) {
  }

  onMouseEnter() {
    this.expanded = true;
  }

  onMouseLeave() {
    this.expanded = false;
  }

  triggerNav() {
    this.expanded = !this.expanded;
  }

  logout() {
    this.router.navigateByUrl('/security/login').then(s => {
      sessionStorage.clear();
    })
  }
}
