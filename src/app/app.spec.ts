import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { BusinessService } from './core/services/business.service';
import { ThemeService } from './core/services/theme.service';
import { HomePageComponent } from './pages/home/home-page.component';
import { FooterComponent } from './shared/components/footer/footer.component';

describe('AStar Electricals Application Tests', () => {
  let businessService: BusinessService;
  let themeService: ThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, HomePageComponent, FooterComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    businessService = TestBed.inject(BusinessService);
    themeService = TestBed.inject(ThemeService);
  });

  describe('Business Information Service', () => {
    it('should define correct brand name', () => {
      expect(businessService.business.name).toBe('AStar Electricals');
    });

    it('should define official contact phone number', () => {
      expect(businessService.business.phone).toBe('+91 9880057744');
      expect(businessService.business.phoneRaw).toBe('+919880057744');
    });

    it('should define official contact email', () => {
      expect(businessService.business.email).toBe('info@astarelectricals.com');
    });

    it('should define government registered GSTIN', () => {
      expect(businessService.business.gstin).toBe('29ACPFA5825L1ZR');
    });

    it('should define verified physical address in Bengaluru', () => {
      const addr = businessService.business.address;
      expect(addr.street).toContain('Door#2, 2nd Floor, Krishna Reddy Layout');
      expect(addr.landmark).toBe('3rd Block, 80 Feet Main Road');
      expect(addr.area).toBe('HBR Layout, Kalyan Nagar');
      expect(addr.city).toBe('Bengaluru');
      expect(addr.state).toBe('Karnataka');
      expect(addr.pincode).toBe('560043');
      expect(addr.full).toContain('Kalyan Nagar');
      expect(addr.full).toContain('560043');
    });
  });

  describe('Theme Service', () => {
    it('should initialize theme state and toggle correctly', () => {
      const initial = themeService.isDark();
      themeService.toggleTheme();
      expect(themeService.isDark()).toBe(!initial);
    });
  });

  describe('HomePageComponent', () => {
    let fixture: ComponentFixture<HomePageComponent>;
    let component: HomePageComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(HomePageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create home page and render brand header', () => {
      expect(component).toBeTruthy();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('h1')?.textContent).toContain('Commercial Spaces');
    });

    it('should display brand introduction and markets', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('Bengaluru · Chennai · Hyderabad');
      expect(compiled.textContent).toContain('AStar Electricals');
    });
  });

  describe('FooterComponent', () => {
    let fixture: ComponentFixture<FooterComponent>;
    let component: FooterComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(FooterComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should display phone link matching business details', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const phoneLink = compiled.querySelector('a[href="tel:+919880057744"]');
      expect(phoneLink).toBeTruthy();
      expect(phoneLink?.textContent).toContain('+91 98800 57744');
    });

    it('should display email link matching business details', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const emailLink = compiled.querySelector('a[href="mailto:info@astarelectricals.com"]');
      expect(emailLink).toBeTruthy();
      expect(emailLink?.textContent).toContain('info@astarelectricals.com');
    });

    it('should display GSTIN', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('29ACPFA5825L1ZR');
    });

    it('should display address with landmark', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('3rd Block, 80 Feet Main Road');
      expect(compiled.textContent).toContain('HBR Layout, Kalyan Nagar');
      expect(compiled.textContent).toContain('560043');
    });
  });

  describe('Root App Component', () => {
    it('should render skip to content link for accessibility', () => {
      const fixture = TestBed.createComponent(App);
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      const skipLink = compiled.querySelector('a[href="#main-content"]');
      expect(skipLink).toBeTruthy();
      expect(skipLink?.textContent?.trim()).toBe('Skip to main content');
    });
  });
});
