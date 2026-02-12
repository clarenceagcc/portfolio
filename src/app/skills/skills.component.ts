import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Skill {
  name: string;
  imageUrl?: string;
  iconClass?: string;
  category: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent implements AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);

  @ViewChild('sectionEl', { static: true })
  private sectionEl!: ElementRef<HTMLElement>;

  private observer?: IntersectionObserver;

  protected readonly activeCategory = signal<string>('Language');

  protected readonly skills = signal<Skill[]>([
    { name: 'Python', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', category: 'Language' },
    { name: 'Streamlit', imageUrl: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/streamlit-icon.png', category: 'Frontend' },
    { name: 'PyTorch', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg', category: 'AI / ML' },
    { name: 'TensorFlow', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', category: 'AI / ML' },
    { name: 'llamacpp', imageUrl: 'https://user-images.githubusercontent.com/1991296/230134379-7181e485-c521-4d23-a0d6-f7b3b61ba524.png', category: 'AI / ML' },
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
    { name: 'TypeScript', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', category: 'Language' },
    { name: 'Keras', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg', category: 'AI / ML' },
    { name: 'scikit-learn', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg', category: 'AI / ML' },
  ]);

  // derived state (no manual syncing needed)
  protected readonly filteredSkills = computed(() => {
    const cat = this.activeCategory();
    return this.skills().filter((s) => s.category === cat);
  });

  protected setCategory(category: string): void {
    this.activeCategory.set(category);
  }

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

    if (this.sectionEl?.nativeElement) {
      this.observer.observe(this.sectionEl.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
