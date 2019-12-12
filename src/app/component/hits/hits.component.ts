import { Component, OnInit } from '@angular/core';
import { HitsService } from '../../service/hits.service';

//Material includes
import {MatTableDataSource} from '@angular/material';
import {MatDialog} from '@angular/material';

import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-hits',
  templateUrl: './hits.component.html',
  styleUrls: ['./hits.component.css']
})
export class HitsComponent implements OnInit
{
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['title','url','created_at','author'];

  constructor(private hitService: HitsService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getHitsData();
    setInterval(()=>{
      this.getHitsData();
    }, 10000);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
