import { Component, ChangeDetectionStrategy, signal, AfterViewInit, ElementRef, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Skill {
  name: string;
  imageUrl?: string;
  iconClass?: string;
  category: string;
}

@Component({
  selector: 'app-skills',
  imports: [],
  template: `
    <section class="skills fade-in-section" id="skills">
      <div class="container">
        <h2 class="section-title">what i've worked with</h2>
        
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
              @if (skill.imageUrl) {
                <img [src]="skill.imageUrl" [alt]="skill.name" class="skill-logo">
              } @else if (skill.iconClass) {
                <i [class]="skill.iconClass + ' skill-logo'"></i>
              }
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
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .section-title {
      font-size: clamp(2rem, 4vw, 2.5rem);
      text-align: center;
      margin-bottom: 3rem;
      color: #ffd700;
      position: relative;
      padding-bottom: 1rem;
      font-family: 'Fira Code', 'Courier New', Courier, monospace;
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
      background: transparent;
      color: #ffffff;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 50px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .category-btn:hover {
      border-color: #713a00;
      color: #b09704;
      transform: translateY(-2px);
    }

    .category-btn.active {
      background: linear-gradient(90deg, #887400, #ffd700);
      border-color: transparent;
      color: #1a202c;
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
      width: 120px;
      height: 120px;
      object-fit: contain;
      padding: 5px;
    }

    i.skill-logo {
      font-size: 110px;
      width: auto;
      height: auto;
      color: #ffffff;
    }

    .skill-name {
      font-size: 0.875rem;
      font-weight: 600;
      color: #ffffff;
      text-align: center;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Skills implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  
  constructor(private el: ElementRef) {}

  protected readonly activeCategory = signal<string>('Language');
  
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
    { name: 'Flask', iconClass: 'devicon-flask-original', category: 'Frontend' },
    { name: 'Git', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', category: 'Tools' },
    { name: 'Visual Studio Code', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', category: 'Tools' },
    { name: 'Unity', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg', category: 'Tools' },
    { name: 'R', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg', category: 'Language' },
    { name: 'Jupyter', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg', category: 'Tools' },
    { name: 'AWS', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg', category: 'Tools' },
  ]);

  protected readonly filteredSkills = signal<Skill[]>(
    this.skills().filter(skill => skill.category === 'Language')
  );

  protected setCategory(category: string): void {
    this.activeCategory.set(category);
    this.filteredSkills.set(
      this.skills().filter(skill => skill.category === category)
    );
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    }, { threshold: 0.1 });

    const section = this.el.nativeElement.querySelector('.fade-in-section');
    if (section) observer.observe(section);
  }
}
