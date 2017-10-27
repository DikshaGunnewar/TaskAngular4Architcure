import { Component } from '@angular/core';

@Component({
    template: `
            <div id="wrapper">
                <header-component></header-component>
                <div class="container-fluid">
                    <div class="row">
                        <sidebar-component></sidebar-component>
                        <main role="main" class="col-sm-9 ml-sm-auto col-md-10 pt-3">
                                <router-outlet></router-outlet> 
                        </main> 
                    </div>                 
                </div>
            </div>
    `,
    styles: []
})
export class LayoutComponent {

}
