import { Component, OnInit } from '@angular/core';
import { HitsService } from '../../service/hits.service';

//Material component includes
import {MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-hits',
  templateUrl: './hits.component.html',
  styleUrls: ['./hits.component.css']
})
export class HitsComponent implements OnInit
{
  constructor(private hitService: HitsService, public dialog: MatDialog) { }

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['title','url','created_at','author'];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.getHitsData();
    setInterval(()=>{
      this.getHitsData();
    }, 10000);
  }

  getHitsData()
  {
    this.hitService.getHits().subscribe(data=>
    {
      this.dataSource.data = null;
      this.dataSource.data = data['hits'];
    });
  }

  openDialog(displayData): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: displayData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getRecordModal(row)
  {
    this.openDialog(row);
  }
}
