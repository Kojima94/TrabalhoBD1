import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatMenuModule} from '@angular/material/menu';
import {LayoutModule} from '@angular/cdk/layout';
import {MatDialogModule} from '@angular/material/dialog';
import { MatSelectModule,
        MatNativeDateModule,
        MatInputModule,
        MatExpansionModule,
        MatAutocompleteModule,
        MatTabsModule,
        MatSidenavModule,
        MatListModule,
        MatSnackBarModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {NgxMaskModule} from 'ngx-mask';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkTableModule} from '@angular/cdk/table';


@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    DragDropModule,
    MatCardModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    LayoutModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatExpansionModule,
    MatAutocompleteModule,
    NgxMaskModule.forRoot(),
    MatTabsModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatTooltipModule,
    CdkTableModule
  ],
  exports: [
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    DragDropModule,
    MatCardModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    LayoutModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatExpansionModule,
    MatAutocompleteModule,
    NgxMaskModule,
    MatTabsModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatTooltipModule,
    CdkTableModule
  ],
  declarations: [],
  providers: [ MatNativeDateModule ]
})
export class MaterialModule { }
