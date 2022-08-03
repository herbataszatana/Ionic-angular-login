import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { switchMap } from 'rxjs/operators';
import { HotToastService } from '@ngneat/hot-toast';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  signUpForm = new FormGroup(
    {
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])),
      password: new FormControl('', Validators.compose([Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'), Validators.required])),
    }
  )
  

  constructor(
    private authService: AuthService,
    private router: Router,
    private usersService: UsersService
    ,private toast: HotToastService,
  ) { }

  get username() {
    return this.signUpForm.get('username');
  }
  

  get email() {
    return this.signUpForm.get('email');
  }
 
  get password() {
    return this.signUpForm.get('password');
  }


  ngOnInit(): void {}
  // below function takes arguments from html page and first authenticate using authservice then 
  // adds new user using addUser function from the userService
  submit() {
    const { username, email, password } = this.signUpForm.value;
    this.authService
      .signUp(email, password)
      .pipe(
        switchMap(({ user: { uid } }) =>
          // below line saves user personal info on firebase 
          this.usersService.addUser({ uid, email, userName: username})
        )  
        ,this.toast.observe({
          success: 'Registration successful',
          loading: 'Signing up...',
          error : 'Something went wrong, please try again'
          //Uncomment bellow if want to receive information of what went wrong 
          // error: ({ message }) => `${message}`, 
        })
      )
      .subscribe(() => {
        // Upon successful registration below line sends us to tabs 
        this.router.navigate(['/tabs']);
      });
    }


}
