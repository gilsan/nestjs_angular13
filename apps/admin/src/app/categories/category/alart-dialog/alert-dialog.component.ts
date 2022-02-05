import { Component } from "@angular/core";
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-amlall-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<AlertDialogComponent>
  ) { }

  cancel(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    this.dialogRef.close({ message: 'OK' });
  }

}

export function openDialog(dialog: MatDialog) {
  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.maxWidth = '100vw';
  dialogConfig.maxHeight = '100vh';
  const dialogRef = dialog.open(AlertDialogComponent, dialogConfig);
  return dialogRef.afterClosed();
}
