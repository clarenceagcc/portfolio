import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  QueryList,
  ViewChildren,
  PLATFORM_ID,
  inject,
} from '@angular/core';
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
  standalone: true,
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JourneyComponent implements AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);

  @ViewChildren('fadeTarget')
  private fadeTargets!: QueryList<ElementRef<HTMLElement>>;

  private observer?: IntersectionObserver;

  protected readonly journeyItems = signal<JourneyItem[]>([
    {
      title: 'Bachelor of Applied Artificial Intelligence',
      organization: 'Singapore Institute of Technology (SIT)',
      period: '2023 - Present (2026 Expected Graduation)',
      description:
        'Final year student specializing in AI technologies, machine learning, and software development. Focused on creating innovative solutions that address real-world challenges.',
      type: 'education',
    },
    {
      title: 'AI Solutions Engineer Intern',
      organization: 'Omron APAC',
      period: '2025 - Present',
      description:
        'Worked on developing a RAG Agentic Chatbot using locally hosted Large Language Models (LLMs) to help safety engineers with their daily tasks. Implemented document retrieval systems and fine-tuned models for enhanced performance.',
      type: 'work',
    },
    {
      title: 'Internship',
      organization: 'Internship at Data Science and Analytics Centre @ SP',
      period: '2020 - 2021',
      description:
        'Assisted in data analysis and visualization projects. Gained experience in Python programming, data cleaning, and statistical analysis. Collaborated with a team to deliver insights for various clients.',
      type: 'work',
    },
    {
      title: 'Diploma in Information Technology',
      organization: 'Singapore Polytechnic',
      period: '2019 - 2021',
      description:
        'Learned concepts in game development. Developed skills in programming, software engineering, and IT fundamentals. Completed projects involving Unity and C# programming.',
      type: 'education',
    },
  ]);

  protected readonly educationItems = computed(() =>
    this.journeyItems().filter((i) => i.type === 'education')
  );

  protected readonly workItems = computed(() =>
    this.journeyItems().filter((i) => i.type === 'work')
  );

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle('is-visible', entry.isIntersecting);
        }
      },
      { threshold: 0.1 }
    );

    for (const el of this.fadeTargets.toArray()) {
      this.observer.observe(el.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
