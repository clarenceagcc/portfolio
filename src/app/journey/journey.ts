import { Component, ChangeDetectionStrategy, signal, AfterViewInit, ElementRef, PLATFORM_ID, inject, computed } from '@angular/core';
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
    <section class="journey fade-in-section" id="journey">
      <div class="container">
        <h2 class="section-title">my journey</h2>

        <div class="two-col">
          <!-- EDUCATION -->
          <div class="col fade-in-section">
            <div class="col-header">
              <span class="col-icon">🎓</span>
              <h3 class="col-title">education</h3>
            </div>

            <div class="timeline timeline-edu">
              @for (item of educationItems(); track item.title) {
                <div class="timeline-item education">
                  <div class="timeline-marker"></div>
                  <div class="timeline-content">
                    <h3>{{ item.title }}</h3>
                    <h4>{{ item.organization }}</h4>
                    <p class="period">{{ item.period }}</p>
                    <p class="description">{{ item.description }}</p>
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- WORK -->
          <div class="col fade-in-section">
            <div class="col-header">
              <span class="col-icon">💼</span>
              <h3 class="col-title">work</h3>
            </div>

            <div class="timeline timeline-work">
              @for (item of workItems(); track item.title) {
                <div class="timeline-item work">
                  <div class="timeline-marker"></div>
                  <div class="timeline-content">
                    <h3>{{ item.title }}</h3>
                    <h4>{{ item.organization }}</h4>
                    <p class="period">{{ item.period }}</p>
                    <p class="description">{{ item.description }}</p>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .journey {
      padding: 3rem 2rem;
    }

    .container {
      max-width: 1100px;
      margin: 0 auto;
    }

    .section-title {
      font-size: clamp(2rem, 4vw, 2.5rem);
      text-align: center;
      margin-bottom: 2rem;
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

    /* --- 2 columns --- */
    .two-col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      align-items: start;
      margin-top: 2rem;
    }

    .col {
      min-width: 0;
    }

    .col-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
      padding: 0 0.25rem;
    }

    .col-icon {
      font-size: 1.5rem;
      line-height: 1;
    }

    .col-title {
      margin: 0;
      color: #ffd700;
      font-size: 1.25rem;
      font-weight: 700;
      font-family: 'Fira Code', monospace;
      text-transform: lowercase;
      letter-spacing: 0.5px;
    }

    /* --- Timeline (per column) --- */
    .timeline {
      position: relative;
      padding: 1.5rem 0 0 0;
    }

    .timeline::before {
      content: '';
      position: absolute;
      left: 18px;
      top: 0;
      height: 100%;
      width: 3px;
      background: linear-gradient(180deg, #4299e1, #9f7aea);
      border-radius: 2px;
    }

    /* Optional: tint each column's line */
    .timeline-edu::before {
      background: linear-gradient(180deg, #9f7aea, #667eea);
    }

    .timeline-work::before {
      background: linear-gradient(180deg, #4299e1, #63b3ed);
    }

    .timeline-item {
      position: relative;
      padding-left: 60px;
      margin-bottom: 1.75rem;
      transition: transform 0.3s ease;
    }

    .timeline-item:last-child {
      margin-bottom: 0;
    }

    .timeline-item:hover {
      transform: translateX(6px);
    }

    .timeline-marker {
      position: absolute;
      left: 10px;
      top: 0.25rem;
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
      padding: 1.25rem;
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

    .timeline-content h3 {
      font-size: 1.1rem;
      color: #ffd700;
      margin: 0 0 0.35rem 0;
      font-weight: 700;
      background: #363636;
    }

    .timeline-content h4 {
      font-size: 0.95rem;
      color: #ffd700;
      margin: 0 0 0.5rem 0;
      font-weight: 500;
      opacity: 0.9;
      background: #363636;
    }

    .period {
      font-size: 0.85rem;
      color: #90cdf4;
      margin: 0 0 0.75rem 0;
      font-family: 'Fira Code', monospace;
      background: #363636;
    }

    .description {
      font-size: 0.95rem;
      color: #cbd5e0;
      line-height: 1.6;
      margin: 0;
      background: #363636;
    }

    @media (max-width: 900px) {
      .two-col {
        grid-template-columns: 1fr;
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
      title: 'Internship',
      organization: 'Internship at Data Science and Analytics Centre @ SP',
      period: '2020 - 2021',
      description: 'Assisted in data analysis and visualization projects. Gained experience in Python programming, data cleaning, and statistical analysis. Collaborated with a team to deliver insights for various clients.',
      type: 'work'
    },
    {
      title: 'Diploma in Information Technology',
      organization: 'Singapore Polytechnic',
      period: '2019 - 2021',
      description: 'Learned concepts in game development. Developed skills in programming, software engineering, and IT fundamentals. Completed projects involving Unity and C# programming.',
      type: 'education'
    }
  ]);

  // Split into two columns
  protected readonly educationItems = computed(() =>
    this.journeyItems().filter(i => i.type === 'education')
  );

  protected readonly workItems = computed(() =>
    this.journeyItems().filter(i => i.type === 'work')
  );

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        entry.target.classList.toggle('is-visible', entry.isIntersecting);
      });
    }, { threshold: 0.1 });

    // observe BOTH columns (and/or the main section)
    const targets = this.el.nativeElement.querySelectorAll('.fade-in-section');
    targets.forEach((t: Element) => observer.observe(t));
  }
}
