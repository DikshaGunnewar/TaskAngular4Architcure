import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { appConfig } from "app/core/config/app.config";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { Customer } from "app/dashboard/models/customer";

@Component({
    selector: 'reactive-form',
    templateUrl: 'reactive-form.component.html',
  styleUrls: ['reactive-form.component.css']
})
export class ReactiveFormComponent {
        toastr: any;
    reactiveForm: FormGroup;
    constructor(private router: Router, private http:HttpClient,private fb: FormBuilder) {
        this.createForm();
    }

    createForm() {
        this.reactiveForm = this.fb.group({
            firstName   : ['', Validators.required],
            lastName    : ['', Validators.required],
            email       : ['', Validators.required],
            phone       : ['',Validators.required]
        });
    }
    //error msg validation code
    get firstName() {
        return this.reactiveForm.get('firstName')
    }
    get lastName() {
        return this.reactiveForm.get('lastName')
    }
    get email() {
        return this.reactiveForm.get('email')
    }
    get phone() {
        return this.reactiveForm.get('phone')
    }
   
   //submit form method
 submitForm(model:Customer,isValid) {
     debugger;
     if (!isValid) {
         this.toastr.error('Please fix errors');
         //this.childModal.show();    
     } else {

         this.http.post(`${appConfig.apiUrl}/customers`, model, { observe: 'response' }).subscribe(data => {
             this.toastr.success('Record Added');
         }
         );
         console.log(model)
     }
 }


    gotoTemplateForm() {
        this.router.navigate(['/forms']);
    }
}