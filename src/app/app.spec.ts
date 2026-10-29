import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { BusinessService } from './core/services/business.service';
import { ThemeService } from './core/services/theme.service';
import { HomePageComponent } from './pages/home/home-page.component';

describe('ASTAR Electricals Application Tests', () => {
  let businessService: BusinessService;
  let themeService: ThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, HomePageComponent],
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

    it('should define government registered GSTIN', () => {
      expect(businessService.business.gstin).toBe('29ACPFA5825L1ZR');
    });

    it('should define verified physical address in Bengaluru', () => {
      const addr = businessService.business.address;
      expect(addr.street).toContain('Ground floor, #7, 3rd cross, 3rd main road');
      expect(addr.landmark).toBe('Near Javeria School');
      expect(addr.area).toBe('Saraipalya, Thanisandra');
      expect(addr.city).toBe('Bengaluru');
      expect(addr.state).toBe('Karnataka');
      expect(addr.pincode).toBe('560077');
      expect(addr.full).toContain('Saraipalya');
      expect(addr.full).toContain('560077');
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

    it('should display phone link matching business details', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const phoneLink = compiled.querySelector('a[href="tel:+919880057744"]');
      expect(phoneLink).toBeTruthy();
      expect(phoneLink?.textContent).toContain('+91 9880057744');
    });

    it('should display GSTIN and support copy to clipboard', async () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('29ACPFA5825L1ZR');

      const writeTextMock = vi.fn().mockResolvedValue(undefined);
      Object.assign(navigator, {
        clipboard: {
          writeText: writeTextMock
        }
      });

      await component.copyGstin();
      expect(writeTextMock).toHaveBeenCalledWith('29ACPFA5825L1ZR');
      expect(component.copiedGstin()).toBe(true);
    });

    it('should display address with landmark', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('Near Javeria School');
      expect(compiled.textContent).toContain('Saraipalya, Thanisandra');
      expect(compiled.textContent).toContain('560077');
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
