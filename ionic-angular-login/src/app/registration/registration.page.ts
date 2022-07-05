import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { Firestore } from '@angular/fire/firestore';
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
      fname: new FormControl('', Validators.required),
      lname: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
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

//Additional info for register
  get fname() {
    return this.signUpForm.get('fname');
  }
  
  get lname() {
    return this.signUpForm.get('lname');
  }

  get gender() {
    return this.signUpForm.get('gender');
  }

  get dob() {
    return this.signUpForm.get('dob');
  }

  get email() {
    return this.signUpForm.get('email');
  }
 
  get password() {
    return this.signUpForm.get('password');
  }


  ngOnInit(): void {}

  submit() {
    const { fname, lname, dob, gender, email, password } = this.signUpForm.value;
    this.authService
      .signUp(email, password)
      .pipe(
        switchMap(({ user: { uid } }) =>
          this.usersService.addUser({ uid, email, firstName: fname, lastName: lname, dateOfBirth: dob, gender:gender })
        )  
        ,this.toast.observe({
          success: 'Registration successful',
          loading: 'Signing up...',
          error : 'Something went wrong, please try again'
         //show error message? 
         // error: ({ message }) => `${message}`,
        })
      )
      .subscribe(() => {
        this.router.navigate(['/home']);
      });
    }


}
