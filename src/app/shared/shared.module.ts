import { NgModule } from '@angular/core';


import { DropdownDirective } from './dropdown.directive';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations:[
        AlertComponent, 
        PlaceholderDirective,
        DropdownDirective,
        LoadingSpinnerComponent
    ],
    imports:[
        CommonModule
    ],
    exports:[
        AlertComponent, 
        PlaceholderDirective,
        DropdownDirective,
        LoadingSpinnerComponent,
        CommonModule
    ]
})
export class SharedModule{}