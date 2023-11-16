import { Component } from '@angular/core';
import{ModelService} from '../../services/model.service'
import{ FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent {

  registerForm!: FormGroup

  constructor(public modalService: ModelService, private fb: FormBuilder, private authService: AuthService){

  }

  ngOnInit(): void{
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required]],
      username: ['', [Validators.required]]
    })
  }

  getInputClasses(fieldName: string){
    return {
      'w-full': true,
      'p-4': true,
      'text-lg': true,
      'bg-black': true,
      'border-2': true,
      'border-neutral-800': true,
      'rounded-md': true,
      'outline-none': true,
      'text-white': true,
      'focus:border-sky-500': true,
      'focus:border-red-500': this.registerForm.get(fieldName)?.invalid && this.registerForm.get(fieldName)?.touched,
      'focus-border-2': true,
      'transition': true,
      'disabled:bg-neutral-900':true,
      'disabled:opacity-70': true,
      'disabled:cursor-not-allowed': true
    }
  }

  login(): void{
    this.modalService.isLoginModelOpen.set(true);
    this.modalService.isRegisterModalOpen.set(false);
  }
  
  handleSubmit(): void{
    const value = this.registerForm.value
    this.authService.register(value).then(res => {
      this.modalService.isRegisterModalOpen.set(false);
    })
  }

}
