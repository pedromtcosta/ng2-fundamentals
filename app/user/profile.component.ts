import { Component, OnInit, Inject } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { TOASTR_TOKEN, Toastr } from '../common/toastr.service'

@Component({
  templateUrl: "app/user/profile.component.html",
  styles: [`
  em { float: right; color: #E05C65; padding-left: 10px; }
  .error input { background-color: #E3C3C5; }
  .error ::-webkit-input-placeholder { color: #999; }
  .error ::-moz-placeholder { color: #999; }
  .error :-moz-placeholder { color: #999; }
  .error :-ms-input-placeholder { color: #999; }
  `]
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup
  firstName: FormControl
  lastName: FormControl

  constructor(private auth: AuthService,
              private router: Router,
              @Inject(TOASTR_TOKEN) private toastr: Toastr) { }

  ngOnInit(): void {
    this.firstName = new FormControl(this.auth.currentUser.firstName, [
      Validators.required,
      Validators.pattern('[a-zA-Z].*')
    ])
    this.lastName = new FormControl(this.auth.currentUser.lastName, Validators.required)
    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    })
  }

  saveProfile(formValues) {
    if (this.profileForm.valid) {
      this.auth.updateCurrentUser(formValues.firstName, formValues.lastName).subscribe(() => {
        this.toastr.success('Profile saved')
      });
    }
  }

  cancel() {
    this.router.navigate(['events'])
  }

  validateFirstName() {
    return this.firstName.invalid && this.firstName.touched
  }

  validateLastName() {
    return this.lastName.invalid && this.lastName.touched
  }

  logout() {
      this.auth.logout().subscribe(() => {
          this.router.navigate(['/user/login'])
      });
  }
}