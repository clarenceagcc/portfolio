import { Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { AboutComponent } from './about/about.component';
import { SkillsComponent } from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';
import { JourneyComponent } from './journey/journey.component';

@Component({
  selector: 'app-root',
  imports: [HeroComponent, AboutComponent, SkillsComponent, ProjectsComponent, JourneyComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
