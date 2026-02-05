import { Component } from '@angular/core';
import { Hero } from './hero/hero';
import { About } from './about/about';
import { Skills } from './skills/skills';
import { Projects } from './projects/projects';
import { Journey } from './journey/journey';

@Component({
  selector: 'app-root',
  imports: [Hero, About, Skills, Projects, Journey],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
