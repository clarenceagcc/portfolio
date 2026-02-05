import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

interface Skill {
  name: string;
  level: number;
  category: string;
}

@Component({
  selector: 'app-skills',
  imports: [],
  template: `
    <section class="skills" id="skills">
      <div class="container">
        <h2 class="section-title">Skills & Technologies</h2>
        <div class="skills-grid">
          @for (skill of skills(); track skill.name) {
            <div class="skill-card">
              <h3>{{ skill.name }}</h3>
              <div class="skill-bar">
                <div 
                  class="skill-level" 
                  [style.width.%]="skill.level"
                ></div>
              </div>
              <span class="skill-category">{{ skill.category }}</span>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .skills {
      padding: 5rem 2rem;
      background: white;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .section-title {
      font-size: clamp(2rem, 4vw, 2.5rem);
      text-align: center;
      margin-bottom: 3rem;
      color: #2d3748;
      position: relative;
      padding-bottom: 1rem;
    }

    .section-title::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 4px;
      background: linear-gradient(90deg, #667eea, #764ba2);
      border-radius: 2px;
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }

    .skill-card {
      background: #f8f9fa;
      padding: 1.5rem;
      border-radius: 12px;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .skill-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }

    .skill-card h3 {
      font-size: 1.25rem;
      color: #2d3748;
      margin-bottom: 1rem;
    }

    .skill-bar {
      height: 8px;
      background: #e2e8f0;
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 0.5rem;
    }

    .skill-level {
      height: 100%;
      background: linear-gradient(90deg, #667eea, #764ba2);
      transition: width 0.3s ease;
    }

    .skill-category {
      font-size: 0.875rem;
      color: #718096;
      font-weight: 500;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Skills {
  protected readonly skills = signal<Skill[]>([
    { name: 'Angular', level: 90, category: 'Frontend' },
    { name: 'TypeScript', level: 85, category: 'Language' },
    { name: 'JavaScript', level: 90, category: 'Language' },
    { name: 'HTML/CSS', level: 95, category: 'Frontend' },
    { name: 'Node.js', level: 80, category: 'Backend' },
    { name: 'Git', level: 85, category: 'Tools' },
  ]);
}
