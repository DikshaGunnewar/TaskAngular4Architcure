import { NgModule } from "@angular/core";
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { DashboardComponent } from "app/dashboard/dashboard.component";

import { CustomerListingComponent } from "app/dashboard/components/listing.component";
import { DashboardRoutingModule } from "app/dashboard/dashboard-routing.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [CommonModule,FormsModule, PaginationModule.forRoot(), DashboardRoutingModule],
    declarations: [DashboardComponent, CustomerListingComponent],
    providers: []
})
export class DashboardModule {

}