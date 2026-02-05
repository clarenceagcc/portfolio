import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
}

@Component({
  selector: 'app-projects',
  imports: [],
  template: `
    <section class="projects" id="projects">
      <div class="container">
        <h2 class="section-title">Featured Projects</h2>
        <div class="projects-grid">
          @for (project of projects(); track project.title) {
            <article class="project-card">
              <h3>{{ project.title }}</h3>
              <p class="project-description">{{ project.description }}</p>
              <div class="tech-stack">
                @for (tech of project.technologies; track tech) {
                  <span class="tech-tag">{{ tech }}</span>
                }
              </div>
              <div class="project-links">
                @if (project.link) {
                  <a [href]="project.link" target="_blank" rel="noopener" class="project-link">
                    View Project
                  </a>
                }
                @if (project.github) {
                  <a [href]="project.github" target="_blank" rel="noopener" class="project-link">
                    GitHub
                  </a>
                }
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .projects {
      padding: 5rem 2rem;
      background: #f8f9fa;
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

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2rem;
    }

    .project-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      transition: transform 0.2s, box-shadow 0.2s;
      display: flex;
      flex-direction: column;
    }

    .project-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
    }

    .project-card h3 {
      font-size: 1.5rem;
      color: #2d3748;
      margin-bottom: 1rem;
    }

    .project-description {
      color: #4a5568;
      line-height: 1.6;
      margin-bottom: 1.5rem;
      flex-grow: 1;
    }

    .tech-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .tech-tag {
      background: #edf2f7;
      color: #667eea;
      padding: 0.375rem 0.875rem;
      border-radius: 20px;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .project-links {
      display: flex;
      gap: 1rem;
    }

    .project-link {
      color: #667eea;
      text-decoration: none;
      font-weight: 600;
      padding: 0.5rem 1.25rem;
      border: 2px solid #667eea;
      border-radius: 6px;
      transition: all 0.2s;
    }

    .project-link:hover {
      background: #667eea;
      color: white;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Projects {
  protected readonly projects = signal<Project[]>([
    {
      title: 'E-Commerce Platform',
      description: 'A full-featured online shopping platform with cart management, payment integration, and admin dashboard.',
      technologies: ['Angular', 'TypeScript', 'Node.js', 'MongoDB'],
      link: 'https://example.com',
      github: 'https://github.com/yourusername/project1'
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management tool with real-time updates and team collaboration features.',
      technologies: ['Angular', 'RxJS', 'Firebase'],
      link: 'https://example.com',
      github: 'https://github.com/yourusername/project2'
    },
    {
      title: 'Weather Dashboard',
      description: 'Interactive weather application with forecast data, maps, and location-based weather alerts.',
      technologies: ['Angular', 'TypeScript', 'REST API'],
      github: 'https://github.com/yourusername/project3'
    }
  ]);
}
