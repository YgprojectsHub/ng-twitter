import { Component, Input, OnInit } from '@angular/core';
import { ModelService } from '../shared/services/model.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../interface';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  editProfile!: FormGroup
  @Input() user!: User

  constructor(public modalService: ModelService, private fb: FormBuilder, private userService: UserService) {
  }

  ngOnInit(): void {
    this.editProfile = this.fb.group({
      displayName: [this.user.displayName, Validators.required],
      username: [this.user.username, Validators.required],
      bio: [this.user.bio]
    })
  }

  getInputClasses(fieldName: string) {
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
      'focus:border-red-500': this.editProfile.get(fieldName)?.invalid && this.editProfile.get(fieldName)?.touched,
      'focus-border-2': true,
      'transition': true,
      'disabled:bg-neutral-900': true,
      'disabled:opacity-70': true,
      'disabled:cursor-not-allowed': true
    }
  }


  submit(): void {
    const data = this.editProfile.value
    this.userService.editUserProfile(this.user.uid, data).then(() => {
      this.modalService.isEditModelOpen.set(false);
    })
  }
}
