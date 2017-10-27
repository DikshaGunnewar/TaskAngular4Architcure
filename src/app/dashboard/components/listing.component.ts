import { Component, OnInit } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import { Customer } from "app/dashboard/models/customer";
import { appConfig } from "app/core/config/app.config";
import { HttpClient } from "@angular/common/http";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
    selector: 'customer-listing',
    templateUrl: './listing.component.html',
    styles: []
})
export class CustomerListingComponent implements OnInit {
    customers: any;
    public maxSize: number = 5;
    public bigTotalItems: number = 175;
    public bigCurrentPage: number = 1;
    public numPages: number = 0;
    constructor(private http: HttpClient, private toastr: ToastrService) { }

    ngOnInit(): void {
        this.getAllCustomers();
    }

    public pageChanged(event: any): void {
        console.log('Page changed to: ' + event.page);
        console.log('Number items per page: ' + event.itemsPerPage);
    }
    getAllCustomers() {
        this.http.get(`${appConfig.apiUrl}/customers`, { observe: 'response' }).subscribe(data => {
            // Read the result field from the JSON response.
            this.customers = data.body;
        }, (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
                // A client-side or network error occurred. Handle it accordingly.
                console.log('An error occurred:', err.error.message);
            } else {
                // The backend returned an unsuccessful response code.
                // The response body may contain clues as to what went wrong,
                console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
            }
        });
    }

    deleteCustomer(cId) {
        this.toastr.warning(`Record updated successfully - ${cId}`);
    }

    editCustomer(cId) {
        this.toastr.success(`Record updated successfully - ${cId}`)
    }
}