import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  template: `
    <section class="about" id="about">
      <div class="container">
        <h2 class="section-title">About Me</h2>
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
      background: #f8f9fa;
    }

    .container {
      max-width: 1000px;
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

    .about-content {
      display: grid;
      gap: 2rem;
    }

    .about-text p {
      font-size: 1.125rem;
      line-height: 1.8;
      color: #4a5568;
      margin-bottom: 1.5rem;
    }

    .about-text p:last-child {
      margin-bottom: 0;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class About {
}
