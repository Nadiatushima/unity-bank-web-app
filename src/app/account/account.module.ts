import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';

@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule, AccountRoutingModule, NgbModule, FormsModule],
  declarations: [AccountComponent],
})
export class AccountModule {}
