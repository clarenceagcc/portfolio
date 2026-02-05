import { Component, ChangeDetectionStrategy, AfterViewInit, ElementRef, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [],
  template: `
    <section class="about fade-in-section" id="about">
      <div class="container">
        <h2 class="section-title">about me</h2>
        <div class="about-content">
          <div class="about-text">
            <p>
              i'm a final year applied artificial intelligence student at singapore institue of technology (SIT), i have a passion for exploring ai technologies to create innovative solutions that address real-world challenges. i enjoy exploring the intersection of ai and software development, and i'm constantly seeking opportunities to learn and grow in this dynamic field.
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about {
      padding: 5rem 2rem;
    }

    .container {
      max-width: 1000px;
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
      border-radius: 2px;
    }

    .about-content {
      display: grid;
      gap: 2rem;
    }

    .about-text p {
      font-size: 1.125rem;
      line-height: 1.8;
      color: #ffffff;
      margin-bottom: 1.5rem;
    }

    .about-text p:last-child {
      margin-bottom: 0;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class About implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  
  constructor(private el: ElementRef) {}

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
