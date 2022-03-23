import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'ngshop-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private fb: FormBuilder, private auth: AngularFireAuth) {}

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required]],
      age: [''],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      phoneNumber: [''],
    });
  }

  async submit() {
    console.log(this.formGroup);
    const { email, password } = this.formGroup.value;
    try {
      const cred = await this.auth.createUserWithEmailAndPassword(email, password);
      console.log(cred);
    } catch (e) {
      console.error(e);
      return;
    }
  }
}
