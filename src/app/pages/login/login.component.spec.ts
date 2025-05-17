import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService, SnackbarService } from '../../core/services';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

// Angular Material Modules
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let snackbarSpy: jasmine.SpyObj<SnackbarService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceMock = jasmine.createSpyObj('AuthService', ['loginUser']);
    const snackbarMock = jasmine.createSpyObj('SnackbarService', ['error', 'success']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        ReactiveFormsModule,
        MatInputModule,
        MatCardModule,
        MatFormFieldModule,
        MatButtonModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: SnackbarService, useValue: snackbarMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    snackbarSpy = TestBed.inject(SnackbarService) as jasmine.SpyObj<SnackbarService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show error if form is invalid', () => {
    component.loginForm.patchValue({ email: '', password: '' });
    component.onSubmit();
    expect(snackbarSpy.error).toHaveBeenCalledWith('Please fill all the required details');
  });

  it('should call AuthService and navigate on success', fakeAsync(() => {
    const mockResponse = { token: '123abc' };
    authServiceSpy.loginUser.and.returnValue(of(mockResponse));

    component.onSubmit();

    tick(); // simulate async
    expect(authServiceSpy.loginUser).toHaveBeenCalled();
    expect(localStorage.getItem('intelligent-token')).toBe('123abc');
    expect(snackbarSpy.success).toHaveBeenCalledWith('Login successful ');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  }));

  it('should show snackbar error on login failure', fakeAsync(() => {
    authServiceSpy.loginUser.and.returnValue(throwError(() => ({
      error: { error: 'Invalid credentials' }
    })));

    component.onSubmit();
    tick();

    expect(snackbarSpy.error).toHaveBeenCalledWith('Login failed: Invalid credentials');
  }));
});
