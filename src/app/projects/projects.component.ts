import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  AfterViewInit,
  ViewChild,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
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
  standalone: true,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);

  @ViewChild('sectionEl', { static: true })
  private sectionEl!: ElementRef<HTMLElement>;

  protected readonly projects = signal<Project[]>([
    {
      title: 'Video Speech Translation',
      description:
        'A web application that translates speech from videos into multiple languages. It utilizes FFmpeg to extract audio from videos, WhisperAI for speech-to-text conversion, and Google Translate API for translating and finally Google Text-to-Speech to generate translated audio. All these components are integrated into a user-friendly interface using Gradio.',
      technologies: ['Gradio','Python','FFmpeg','Google Cloud Speech-to-Text','Google Translate API'],
      github: 'https://github.com/clarenceagcc/Video-Speech-Translation-Project',
    },
    {
      title: 'Deepfake Detection Tool',
      description:
        'A competition project from IEEE SP CUP 2025 where my team and I were tasked to finetune a model to detect deepfakes in images using computer vision and deep learning techniques. We utilized TensorFlow to finetune our chosen model ResNet, achieving high accuracy in identifying manipulated images.',
      technologies: ['TensorFlow', 'Keras', 'Python', 'OpenCV'],
      github: 'https://github.com/clarenceagcc/CV-Deepfake',
    },
    {
      title: 'Personal Portfolio Website',
      description:
        'This personal portfolio website built to learn Angular It features a modern design, responsive layout, and smooth animations to provide an engaging user experience.',
      technologies: ['Angular', 'TypeScript', 'CSS', 'HTML'],
      github: 'https://github.com/clarenceagcc/portfolio',
    },
    {
      title: 'TikTok Hackathon AISG Challenge',
      description:
        "A Hackathon where my team and I explored solutions to find the best way for an open-source solution to find out details of a video using a VLM (Vision Language Model). We developed a prototype using LLaVA VLM hosted on Google Colab that can analyze TikTok videos and provide detailed descriptions and insights about the content. While we didn't get the best scores, it was a great learning experience working with VLMs and understanding their potential applications.",
      technologies: ['Google Colab', 'Python', 'PyTorch', 'TensorFlow', 'LLaVA VLM'],
      github: 'https://github.com/clarenceagcc/portfolio',
    },
    {
      title: 'AI Safety Advisory Assistant',
      description:
        'Developed a domain-specific AI advisory system to support engineers in performing machine safety risk assessments and selecting appropriate safety solutions. The system leverages Retrieval-Augmented Generation (RAG) and agent-based reasoning to interpret safety standards, assess hazards, and guide structured form completion. My work focused on data ingestion, retrieval design, prompt orchestration, and evaluation of response quality in a real-world industrial setting.',
      technologies: ['Python', 'Qwen3', 'Qdrant', 'LoRA', 'Agent Systems', 'RAG', 'LLMs'],
      closedSource: true,
    },
  ]);

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const section = this.sectionEl?.nativeElement;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle('is-visible', entry.isIntersecting);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
  }
}
