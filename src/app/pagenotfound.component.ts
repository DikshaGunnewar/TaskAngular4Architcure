import { Component } from "@angular/core";

@Component({
    selector: 'Not-Found',
    template: `
    <div class="container">
        <div class="card text-center border-primary mb-3">
            <div class="card-header">
                Error 404
            </div>
            <div class="card-body">
                <h4 class="card-title">Page Not Found</h4>
                <p class="card-text">The page you requested could not be found, either contact your webmaster or try again.</p>
                <a routerLink="/" class="btn btn-outline-primary btn-sm"><i class="fa fa-home" aria-hidden="true"></i>&nbsp; Take Me Home</a>
            </div>
            <div class="card-footer text-muted">
                &nbsp;
            </div>
        </div>
    </div>
    `,
    styles: []
})
export class PageNotFountComponent {

}