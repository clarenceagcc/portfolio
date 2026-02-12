import {
  Component,
  ChangeDetectionStrategy,
  signal,
  OnInit,
  OnDestroy,
} from '@angular/core';

interface ContactLink {
  label: string;
  url: string;
  imageUrl?: string;
  iconClass?: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent implements OnInit, OnDestroy {
  protected readonly displayText = signal('');
  protected readonly contactLinks = signal<ContactLink[]>([
    {
      label: 'Email',
      url: 'mailto:agccclarence@gmail.com',
      iconClass: 'devicon-google-plain colored',
    },
    {
      label: 'GitHub',
      url: 'https://github.com/clarenceagcc',
      iconClass: 'devicon-github-original-wordmark colored',
    },
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/clarence-agcanas',
      iconClass: 'devicon-linkedin-plain colored',
    },
  ]);

  private readonly roles = [
    'an ai solutions engineer',
    'building intelligent systems',
    'integrating ai into everyday things',
    'solving complex problems',
    'creating automation solutions',
    'asking gpt for help .. D:',
  ];

  private currentRoleIndex = 0;
  private currentCharIndex = 0;
  private isDeleting = false;

  private typingSpeed = 70;
  private deletingSpeed = 50;
  private pauseTime = 2000;

  private timeoutId?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    this.type();
  }

  ngOnDestroy(): void {
    if (this.timeoutId) clearTimeout(this.timeoutId);
  }

  private type(): void {
    const currentRole = this.roles[this.currentRoleIndex];

    if (!this.isDeleting) {
      // typing
      if (this.currentCharIndex < currentRole.length) {
        this.displayText.set(currentRole.substring(0, this.currentCharIndex + 1));
        this.currentCharIndex++;
        this.timeoutId = setTimeout(() => this.type(), this.typingSpeed);
      } else {
        // pause then delete
        this.timeoutId = setTimeout(() => {
          this.isDeleting = true;
          this.type();
        }, this.pauseTime);
      }
    } else {
      // deleting
      if (this.currentCharIndex > 0) {
        this.displayText.set(currentRole.substring(0, this.currentCharIndex - 1));
        this.currentCharIndex--;
        this.timeoutId = setTimeout(() => this.type(), this.deletingSpeed);
      } else {
        // next role
        this.isDeleting = false;
        this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
        this.timeoutId = setTimeout(() => this.type(), 500);
      }
    }
  }
}
