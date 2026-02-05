import { Component, ChangeDetectionStrategy, signal, AfterViewInit, ElementRef, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

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
    <section class="projects fade-in-section" id="projects">
      <div class="container">
        <h2 class="section-title">stuff i've created!</h2>
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

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2rem;
    }

    .project-card {
      background: #363636;
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
      color: #ffd700;
      margin-bottom: 1rem;
      background: #363636;
    }

    .project-description {
      background: #363636;
      color: #ffffff;
      line-height: 1.6;
      margin-bottom: 1.5rem;
      flex-grow: 1;
    }

    .tech-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
      background: #363636;
    }

    .tech-tag {
      background: #000000;
      color: #ffd700;
      padding: 0.375rem 0.875rem;
      border-radius: 20px;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .project-links {
      display: flex;
      gap: 1rem;
      background: #363636;
    }

    .project-link {
      color: #ffd700;
      text-decoration: none;
      font-weight: 600;
      padding: 0.5rem 1.25rem;
      border: 2px solid #ffd700;
      border-radius: 6px;
      transition: all 0.2s;
      background: #363636;
    }

    .project-link:hover {
      background: #667eea;
      color: white;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Projects implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  
  constructor(private el: ElementRef) {}

  protected readonly projects = signal<Project[]>([
    {
      title: 'Video Speech Translation Project',
      description: 'A web application that translates speech from videos into multiple languages. It utilizes FFmpeg to extract audio from videos, WhisperAI for speech-to-text conversion, and Google Translate API for translating and finally Google Text-to-Speech to generate translated audio. All these components are integrated into a user-friendly interface using Gradio.',
      technologies: ['Gradio', 'Python', 'FFmpeg', 'Google Cloud Speech-to-Text', 'Google Translate API'],
      github: 'https://github.com/clarenceagcc/Video-Speech-Translation-Project'
    },
    {
      title: 'Deepfake Detection Tool',
      description: 'A competition project from IEEE SP CUP 2025 where my team and I were tasked to finetune a model to detect deepfakes in images using computer vision and deep learning techniques. We utilized TensorFlow to finetune our chosen model ResNet, achieving high accuracy in identifying manipulated images.',
      technologies: ['TensorFlow', 'Keras', 'Python', 'OpenCV'],
      github: 'https://github.com/clarenceagcc/CV-Deepfake'
    }
  ]);

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
