import { Component, OnInit } from '@angular/core';
import { HitsService } from '../../service/hits.service';

//Material component includes

import {MatTableDataSource} from '@angular/material'

@Component({
  selector: 'app-hits',
  templateUrl: './hits.component.html',
  styleUrls: ['./hits.component.css']
})
export class HitsComponent implements OnInit
{
  constructor(private hitService: HitsService) { }

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
}
