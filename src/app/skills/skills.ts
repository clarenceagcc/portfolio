import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

interface Skill {
  name: string;
  imageUrl: string;
  category: string;
}

@Component({
  selector: 'app-skills',
  imports: [],
  template: `
    <section class="skills" id="skills">
      <div class="container">
        <h2 class="section-title">Skills & Technologies</h2>
        
        <div class="categories">
          <button 
            class="category-btn"
            [class.active]="activeCategory() === 'Framework'"
            (click)="setCategory('Framework')"
          >
            Framework
          </button>
          <button 
            class="category-btn"
            [class.active]="activeCategory() === 'Frontend'"
            (click)="setCategory('Frontend')"
          >
            Frontend
          </button>
          <button 
            class="category-btn"
            [class.active]="activeCategory() === 'Tools'"
            (click)="setCategory('Tools')"
          >
            Tools
          </button>
          <button 
            class="category-btn"
            [class.active]="activeCategory() === 'Language'"
            (click)="setCategory('Language')"
          >
            Languages
          </button>
        </div>

        <div class="skills-grid">
          @for (skill of filteredSkills(); track skill.name) {
            <div class="skill-card">
              <img [src]="skill.imageUrl" [alt]="skill.name" class="skill-logo">
              <span class="skill-name">{{ skill.name }}</span>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .skills {
      padding: 3rem 2rem;
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

    .categories {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }

    .category-btn {
      padding: 0.75rem 2rem;
      border: 2px solid #e2e8f0;
      background: white;
      color: #4a5568;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 50px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .category-btn:hover {
      border-color: #667eea;
      color: #667eea;
      transform: translateY(-2px);
    }

    .category-btn.active {
      background: linear-gradient(90deg, #667eea, #764ba2);
      color: white;
      border-color: transparent;
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 1.0rem;
      justify-items: center;
    }

    @media (max-width: 768px) {
      .skills-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (max-width: 480px) {
      .skills-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .skill-card {
      background: #f8f9fa;
      padding: 1.5rem 0.2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.50rem;
      border-radius: 16px;
      transition: transform 0.2s, box-shadow 0.2s;
      cursor: pointer;
      min-width: 100px;
    }

    .skill-card:hover {
      transform: translateY(-8px) scale(1.05);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
    }

    .skill-logo {
      width: 64px;
      height: 64px;
      object-fit: contain;
    }

    .skill-name {
      font-size: 0.875rem;
      font-weight: 600;
      color: #2d3748;
      text-align: center;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Skills {
  protected readonly activeCategory = signal<string>('Framework');
  
  protected readonly skills = signal<Skill[]>([

    { name: 'Python', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', category: 'Language' },
    { name: 'Streamlit', imageUrl: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/streamlit-icon.png', category: 'Frontend' },
    { name: 'PyTorch', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg', category: 'Framework' },
    { name: 'TensorFlow', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', category: 'Framework' },
    { name: 'llamacpp', imageUrl: 'https://user-images.githubusercontent.com/1991296/230134379-7181e485-c521-4d23-a0d6-f7b3b61ba524.png', category: 'Framework' },
    { name: 'Angular', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg', category: 'Frontend' },
    { name: 'JavaScript', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', category: 'Language' },
    { name: 'React', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', category: 'Frontend' },
    { name: 'C#', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg', category: 'Language' },
    { name: 'C', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg', category: 'Language' },
  ]);

  protected readonly filteredSkills = signal<Skill[]>(
    this.skills().filter(skill => skill.category === 'Framework')
  );

  protected setCategory(category: string): void {
    this.activeCategory.set(category);
    this.filteredSkills.set(
      this.skills().filter(skill => skill.category === category)
    );
  }
}
