import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule, UserRoutingModule, NgbModule, FormsModule, NgSelectModule],
  declarations: [UserComponent],
})
export class UserModule {}
