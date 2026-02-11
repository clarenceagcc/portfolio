import { Component, ChangeDetectionStrategy, signal, AfterViewInit, ElementRef, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  imageUrl?: string;
  closedSource?: boolean;
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

            <!-- Title -->
            <h3 class="project-title">{{ project.title }}</h3>

            <!-- Image / Placeholder -->
            <div class="project-media">
              @if (project.imageUrl) {
                <div class="project-media">
                  <img
                    [src]="project.imageUrl"
                    [alt]="project.title"
                    class="project-image"
                  />
                </div>
              }
            </div>
            <!-- Content -->
            <div class="project-body">
              <p class="project-description">{{ project.description }}</p>

              <div class="tech-stack">
                @for (tech of project.technologies; track tech) {
                  <span class="tech-tag">{{ tech }}</span>
                }
              </div>

              <div class="project-links">
                @if (project.closedSource) {
                  <span class="project-closed">🔒 Closed Source</span>
                }

                @if (project.link) {
                  <a [href]="project.link" target="_blank" rel="noopener" class="project-link">
                    View Project
                  </a>
                }

                @if (project.github && !project.closedSource) {
                  <a [href]="project.github" target="_blank" rel="noopener" class="project-link">
                    GitHub
                  </a>
                }
              </div>
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
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .project-card {
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .project-media {
      width: 100%;
      background: #2b2b2b;
    }
    .project-image {
      width: 100%;
      height: 260px;
      object-fit: cover;
      display: block;
    }
    .project-closed {
      display: inline-flex;
      align-items: center;
      padding: 0.5rem 1.25rem;
      border-radius: 6px;
      font-weight: 600;
      font-size: 0.875rem;
      color: #ffd700;
      border: 2px dashed #ffd700;
      background: transparent;
      cursor: default;
    }
    .project-body {
      padding: 2rem;
    }
    .project-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
    }
    .project-card h3 {
      font-size: 1.5rem;
      color: #ffd700;
      margin-bottom: 1rem;
    }

    .project-description {
      color: #ffffff;
      line-height: 1.6;
      margin-bottom: 1.25rem;
    }

    .tech-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.25rem;
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
    }

    .project-link {
      color: #ffd700;
      text-decoration: none;
      font-weight: 600;
      padding: 0.5rem 1.25rem;
      border: 2px solid #ffd700;
      border-radius: 6px;
      transition: all 0.2s;
    }
    .project-title {
      padding: 1.5rem 2rem;
      font-size: 1.6rem;
      color: #ffd700;
      font-family: 'Fira Code', monospace;
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
      title: 'Video Speech Translation',
      description: 'A web application that translates speech from videos into multiple languages. It utilizes FFmpeg to extract audio from videos, WhisperAI for speech-to-text conversion, and Google Translate API for translating and finally Google Text-to-Speech to generate translated audio. All these components are integrated into a user-friendly interface using Gradio.',
      technologies: ['Gradio', 'Python', 'FFmpeg', 'Google Cloud Speech-to-Text', 'Google Translate API'],
      github: 'https://github.com/clarenceagcc/Video-Speech-Translation-Project'
    },
    {
      title: 'Deepfake Detection Tool',
      description: 'A competition project from IEEE SP CUP 2025 where my team and I were tasked to finetune a model to detect deepfakes in images using computer vision and deep learning techniques. We utilized TensorFlow to finetune our chosen model ResNet, achieving high accuracy in identifying manipulated images.',
      technologies: ['TensorFlow', 'Keras', 'Python', 'OpenCV'],
      github: 'https://github.com/clarenceagcc/CV-Deepfake'
    },
    {
      title: 'Personal Portfolio Website',
      description: 'This personal portfolio website built to learn Angular It features a modern design, responsive layout, and smooth animations to provide an engaging user experience.',
      technologies: ['Angular', 'TypeScript', 'CSS', 'HTML'],
      github: 'https://github.com/clarenceagcc/portfolio'
    },
    {
      title: 'TikTok Hackathon AISG Challenge',
      description: 'A Hackathon where my team and I explored solutions to find the best way for an open-source solution to find out details of a video using a VLM (Vision Language Model). We developed a prototype using LLaVA VLM hosted on Google Colab that can analyze TikTok videos and provide detailed descriptions and insights about the content. While we didn\'t get the best scores, it was a great learning experience working with VLMs and understanding their potential applications.',
      technologies: ['Google Colab', 'Python', 'PyTorch', 'TensorFlow', 'LLaVA VLM'],
      github: 'https://github.com/clarenceagcc/portfolio'
    },
    {
      title: 'AI Safety Advisory Assistant',
      description: 'Developed a domain-specific AI advisory system to support engineers in performing machine safety risk assessments and selecting appropriate safety solutions. The system leverages Retrieval-Augmented Generation (RAG) and agent-based reasoning to interpret safety standards, assess hazards, and guide structured form completion. My work focused on data ingestion, retrieval design, prompt orchestration, and evaluation of response quality in a real-world industrial setting.',
      technologies: ['Python', 'Qwen3', 'Qdrant', 'LoRA', 'Agent Systems', 'RAG', 'LLMs'],
      closedSource: true
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
