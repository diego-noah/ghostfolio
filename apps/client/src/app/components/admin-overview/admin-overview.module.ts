import { CacheService } from '@ghostfolio/client/services/cache.service';
import { GfValueComponent } from '@ghostfolio/ui/value';

import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { IonIcon } from '@ionic/angular/standalone';

import { AdminOverviewComponent } from './admin-overview.component';

@NgModule({
  declarations: [AdminOverviewComponent],
  exports: [],
  imports: [
    CommonModule,
    FormsModule,
    GfValueComponent,
    IonIcon,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [CacheService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GfAdminOverviewModule {}
