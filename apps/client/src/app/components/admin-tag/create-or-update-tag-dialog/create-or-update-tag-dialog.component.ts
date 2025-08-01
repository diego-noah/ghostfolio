import { CreateTagDto } from '@ghostfolio/api/app/endpoints/tags/create-tag.dto';
import { UpdateTagDto } from '@ghostfolio/api/app/endpoints/tags/update-tag.dto';
import { validateObjectForForm } from '@ghostfolio/client/util/form.util';

import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subject } from 'rxjs';

import { CreateOrUpdateTagDialogParams } from './interfaces/interfaces';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'h-100' },
  imports: [
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  selector: 'gf-create-or-update-tag-dialog',
  styleUrls: ['./create-or-update-tag-dialog.scss'],
  templateUrl: 'create-or-update-tag-dialog.html'
})
export class GfCreateOrUpdateTagDialogComponent implements OnDestroy {
  public tagForm: FormGroup;

  private unsubscribeSubject = new Subject<void>();

  public constructor(
    @Inject(MAT_DIALOG_DATA) public data: CreateOrUpdateTagDialogParams,
    public dialogRef: MatDialogRef<GfCreateOrUpdateTagDialogComponent>,
    private formBuilder: FormBuilder
  ) {
    this.tagForm = this.formBuilder.group({
      name: [this.data.tag.name]
    });
  }

  public onCancel() {
    this.dialogRef.close();
  }

  public async onSubmit() {
    try {
      const tag: CreateTagDto | UpdateTagDto = {
        name: this.tagForm.get('name')?.value
      };

      if (this.data.tag.id) {
        (tag as UpdateTagDto).id = this.data.tag.id;
        await validateObjectForForm({
          classDto: UpdateTagDto,
          form: this.tagForm,
          object: tag
        });
      } else {
        await validateObjectForForm({
          classDto: CreateTagDto,
          form: this.tagForm,
          object: tag
        });
      }

      this.dialogRef.close(tag);
    } catch (error) {
      console.error(error);
    }
  }

  public ngOnDestroy() {
    this.unsubscribeSubject.next();
    this.unsubscribeSubject.complete();
  }
}
