import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HitsService {

  constructor(private httpClient: HttpClient) { }

  public getHits(){
    return this.httpClient.get('https://hn.algolia.com/api/v1/search_by_date?tags=story');
  }
}
