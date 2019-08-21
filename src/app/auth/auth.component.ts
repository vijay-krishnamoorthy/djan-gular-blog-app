import { Component, OnInit } from '@angular/core';
import { Errors, UserService } from '../core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authType: string = '';
  title: String = '';
  errors: Errors = {errors: {}};
  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.authForm = this.fb.group({
      'email': ['',Validators.required],
      'password': ['',Validators.required]
    });
   }

  ngOnInit() {
    this.route.url.subscribe(
      data => {
        this.authType = data[data.length - 1].path;
        this.title = (this.authType === 'login')? 'Sign in' : 'Sign up';
        if(this.authType === 'register') {
          this.authForm.addControl('username', new FormControl());
        }
      }
    );
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = {errors: {}};

    const credentials = this.authForm.value;
    this.userService.attemptAuth(this.authType,credentials).subscribe(
      data => this.router.navigateByUrl('/'),
      err => {
        this.errors = err;
        console.log(err);
        this.isSubmitting = false;
      }
    );
  }
}
