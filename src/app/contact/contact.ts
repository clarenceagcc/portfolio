import { Component, ChangeDetectionStrategy, signal, AfterViewInit, ElementRef, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface ContactLink {
  label: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-contact',
  imports: [],
  template: `
    <section class="contact fade-in-section" id="contact">
      <div class="container">
        <h2 class="section-title">let's talk</h2>
        <p class="contact-intro">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
        </p>
        <div class="contact-links">
          @for (link of contactLinks(); track link.label) {
            <a [href]="link.url" target="_blank" rel="noopener" class="contact-card">
              <span class="icon">{{ link.icon }}</span>
              <span class="label">{{ link.label }}</span>
            </a>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact {
      padding: 5rem 2rem;
    }

    .container {
      max-width: 900px;
      margin: 0 auto;
      text-align: center;
    }

    .section-title {
      font-size: clamp(2rem, 4vw, 2.5rem);
      margin-bottom: 1rem;
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

    .contact-intro {
      font-size: 1.125rem;
      color: #ffffff;
      margin-bottom: 3rem;
      line-height: 1.6;
    }

    .contact-links {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .contact-card {
      padding: 2rem;
      border-radius: 12px;
      text-decoration: none;
      color: #ffffff;
      transition: transform 0.2s, box-shadow 0.2s;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
    }

    .contact-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      color: white;
    }

    .icon {
      font-size: 2rem;
    }

    .label {
      font-weight: 600;
      font-size: 1.125rem;
    }

    .footer {
      background: #2d3748;
      color: white;
      text-align: center;
      padding: 2rem;
    }

    .footer p {
      margin: 0;
      opacity: 0.9;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Contact implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  
  constructor(private el: ElementRef) {}

  protected readonly contactLinks = signal<ContactLink[]>([
    { label: 'Email', url: 'mailto:agccclarence@gmail.com', icon: '📧' },
    { label: 'GitHub', url: 'https://github.com/yourusername', icon: '💻' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/yourusername', icon: '💼' },
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
