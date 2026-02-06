import { Component, ChangeDetectionStrategy, signal, OnInit, OnDestroy } from '@angular/core';

interface ContactLink {
  label: string;
  url: string;
  imageUrl?: string;
  iconClass?: string;
}

@Component({
  selector: 'app-hero',
  imports: [],
  template: `
    <section class="hero">
      <div class="social-links">
        @for (link of contactLinks(); track link.label) {
          <a [href]="link.url" target="_blank" rel="noopener" [attr.aria-label]="link.label" class="social-icon">
            @if (link.imageUrl) {
              <img [src]="link.imageUrl" [alt]="link.label">
            } @else if (link.iconClass) {
              <i [class]="link.iconClass"></i>
            }
          </a>
        }
      </div>
      <div class="hero-content">
        <h1>hi, i'm <span class="highlight">Clarence!</span></h1>
        <h2>
          i'm <span class="typed-text">{{ displayText() }}</span><span class="cursor">|</span>
        </h2>
      </div>
      <a href="#about" class="scroll-indicator" aria-label="Scroll to about section">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </a>
    </section>
  `,
  styles: [`
    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      position: relative;
      justify-content: center;
      padding: 2rem;
      color: white;
      text-align: center;
    }

    .social-links {
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      display: flex;
      gap: 0.75rem;
      justify-content: flex-end;
      padding: 1rem 2rem;
      z-index: 100;
      background: #231b1b87;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .social-icon {
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border-radius: 8px;
      transition: all 0.3s ease;
      text-decoration: none;
      border: none;
    }

    .social-icon img {
      width: 32px;
      height: 32px;
      filter: brightness(0) invert(1);
      transition: filter 0.3s ease;
    }

    .social-icon i {
      font-size: 32px;
      color: #ffffff;
      transition: color 0.3s ease;
    }

    .social-icon:hover {
      transform: translateY(-4px);
    }

    .social-icon:hover img {
      filter: brightness(0) saturate(100%) invert(85%) sepia(69%) saturate(1000%) hue-rotate(360deg) brightness(104%) contrast(101%);
    }

    .social-icon:hover i {
      color: #ffd700;
    }

    @media (max-width: 768px) {
      .social-links {
        padding: 0.75rem 1rem;
        gap: 0.5rem;
      }

      .social-icon {
        width: 40px;
        height: 40px;
        font-size: 1.25rem;
      }
    }

    .hero-content {
      max-width: 800px;
    }

    h1 {
      font-size: clamp(2rem, 5vw, 3.5rem);
      margin-bottom: 1rem;
      font-weight: 700;
      font-family: 'Fira Code', 'Courier New', Courier, monospace;
    }

    .highlight {
      background: linear-gradient(120deg, #ffd700, #ffed4e);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    h2 {
      font-size: clamp(1.5rem, 3vw, 2rem);
      margin-bottom: 1.5rem;
      font-weight: 400;
      opacity: 0.9;
      min-height: 2.5rem;
    }

    .typed-text {
      color: #ffd700;
      font-family: 'Fira Code', 'Courier New', Courier, monospace;
    }

    .cursor {
      animation: blink 1s infinite;
      color: #ffd700;
    }

    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }

    .tagline {
      font-size: clamp(1rem, 2vw, 1.25rem);
      margin-bottom: 2rem;
      opacity: 0.85;
      line-height: 1.6;
    }
    .scroll-indicator {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      color: white;
      opacity: 0.7;
      cursor: pointer;
      transition: opacity 0.3s;
      animation: bounce 2s infinite;
      text-decoration: none;
      z-index: 10;
    }

    .scroll-indicator:hover {
      opacity: 1;
    }

    .scroll-indicator svg {
      display: block;
    }

    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateX(-50%) translateY(0);
      }
      40% {
        transform: translateX(-50%) translateY(-10px);
      }
      60% {
        transform: translateX(-50%) translateY(-5px);
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Hero implements OnInit, OnDestroy {
  protected readonly displayText = signal('');
  protected readonly contactLinks = signal<ContactLink[]>([
    { 
      label: 'Email', 
      url: 'mailto:agccclarence@gmail.com', 
      iconClass: 'devicon-google-plain colored'
    },
    { 
      label: 'GitHub', 
      url: 'https://github.com/clarenceagcc', 
      iconClass: 'devicon-github-original-wordmark colored'
    },
    { 
      label: 'LinkedIn', 
      url: 'https://www.linkedin.com/in/clarence-agcanas', 
      iconClass: 'devicon-linkedin-plain colored'
    },
  ]);
  
  private readonly roles = [
    'an ai solutions engineer',
    'building intelligent systems',
    'integrating ai into everyday things',
    'solving complex problems',
    'creating automation solutions',
    'asking gpt for help .. D:'
  ];
  
  private currentRoleIndex = 0;
  private currentCharIndex = 0;
  private isDeleting = false;
  private typingSpeed = 70;
  private deletingSpeed = 50;
  private pauseTime = 2000;
  private intervalId?: number;

  ngOnInit(): void {
    this.type();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearTimeout(this.intervalId);
    }
  }

  private type(): void {
    const currentRole = this.roles[this.currentRoleIndex];
    
    if (!this.isDeleting) {
      // Typing
      if (this.currentCharIndex < currentRole.length) {
        this.displayText.set(currentRole.substring(0, this.currentCharIndex + 1));
        this.currentCharIndex++;
        this.intervalId = setTimeout(() => this.type(), this.typingSpeed) as any;
      } else {
        // Pause before deleting
        this.intervalId = setTimeout(() => {
          this.isDeleting = true;
          this.type();
        }, this.pauseTime) as any;
      }
    } else {
      // Deleting
      if (this.currentCharIndex > 0) {
        this.displayText.set(currentRole.substring(0, this.currentCharIndex - 1));
        this.currentCharIndex--;
        this.intervalId = setTimeout(() => this.type(), this.deletingSpeed) as any;
      } else {
        // Move to next role
        this.isDeleting = false;
        this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
        this.intervalId = setTimeout(() => this.type(), 500) as any;
      }
    }
  }
}
