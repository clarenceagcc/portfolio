import { Component, ChangeDetectionStrategy, signal, AfterViewInit, ElementRef, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface JourneyItem {
  title: string;
  organization: string;
  period: string;
  description: string;
  type: 'work' | 'education';
}

@Component({
  selector: 'app-journey',
  imports: [],
  template: `
    <section class="journey fade-in-section is-visible" id="journey">
      <div class="container">
        <h2 class="section-title">my journey</h2>
        
        <div class="timeline">
          @for (item of journeyItems(); track item.title) {
            <div class="timeline-item" [class.work]="item.type === 'work'" [class.education]="item.type === 'education'">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <span class="timeline-badge">{{ item.type === 'work' ? '💼' : '🎓' }}</span>
                <h3>{{ item.title }}</h3>
                <h4>{{ item.organization }}</h4>
                <p class="period">{{ item.period }}</p>
                <p class="description">{{ item.description }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .journey {
      padding: 3rem 2rem;
    }

    .container {
      max-width: 900px;
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

    .timeline {
      position: relative;
      padding: 2rem 0;
      
    }

    .timeline::before {
      content: '';
      position: absolute;
      left: 30px;
      top: 0;
      bottom: 0;
      width: 3px;
      background: linear-gradient(180deg, #4299e1, #9f7aea);
      border-radius: 2px;
    }

    .timeline-item {
      position: relative;
      padding-left: 80px;
      margin-bottom: 3rem;
      transition: transform 0.3s ease;
      
    }

    .timeline-item:hover {
      transform: translateX(8px);
    }

    .timeline-marker {
      position: absolute;
      left: 22px;
      top: 0;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: linear-gradient(135deg, #ffd700, #ffed4e);
      border: 3px solid #1a202c;
      box-shadow: 0 0 0 4px rgba(255, 215, 0, 0.2);
      z-index: 1;
    }

    .timeline-content {
      background: #363636;
      padding: 1.5rem;
      border-radius: 12px;
      border-left: 4px solid #ffd700;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }

    .timeline-item.work .timeline-content {
      border-left-color: #4299e1;
    }

    .timeline-item.education .timeline-content {
      border-left-color: #9f7aea;
    }

    .timeline-content:hover {
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    }

    .timeline-badge {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
      display: inline-block;
    }

    .timeline-content h3 {
      font-size: 1.25rem;
      color: #ffd700;
      margin-bottom: 0.5rem;
      font-weight: 700;
      background: #363636;
    }

    .timeline-content h4 {
      font-size: 1rem;
      color: #ffd700;
      margin-bottom: 0.5rem;
      font-weight: 500;
      opacity: 0.9;
      background: #363636;
    }

    .period {
      font-size: 0.875rem;
      color: #90cdf4;
      margin-bottom: 1rem;
      font-family: 'Fira Code', monospace;
      background: #363636;
    }

    .description {
      font-size: 1rem;
      color: #cbd5e0;
      line-height: 1.6;
      margin: 0;
      background: #363636;
    }

    @media (max-width: 768px) {
      .timeline::before {
        left: 15px;
      }

      .timeline-marker {
        left: 7px;
      }

      .timeline-item {
        padding-left: 50px;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Journey implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  
  constructor(private el: ElementRef) {}

  protected readonly journeyItems = signal<JourneyItem[]>([
    {
      title: 'Bachelor of Applied Artificial Intelligence',
      organization: 'Singapore Institute of Technology (SIT)',
      period: '2023 - Present (2026 Expected Graduation)',
      description: 'Final year student specializing in AI technologies, machine learning, and software development. Focused on creating innovative solutions that address real-world challenges.',
      type: 'education'
    },
    {
      title: 'AI Solutions Engineer Intern',
      organization: 'Omron APAC',
      period: '2025 - Present',
      description: 'Worked on developing a RAG Agentic Chatbot using locally hosted Large Language Models (LLMs) to help safety engineers with their daily tasks. Implemented document retrieval systems and fine-tuned models for enhanced performance.',
      type: 'work'
    },
    {
      title: 'Diploma in Information Technology',
      organization: 'Singapore Polytechnic',
      period: '2025 - Present',
      description: 'Learned concepts in game development. Developed skills in programming, software engineering, and IT fundamentals. Completed projects involving Unity and C# programming.',
      type: 'education'
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