import { Pager } from './models/pager';
import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() { }
    setPager(pager: Pager){
      sessionStorage.setItem('page', String(pager.page));
      sessionStorage.setItem('page_size', String(pager.size));
        }
    getPager(): Pager {
      let page = sessionStorage.getItem('page');
      let size = sessionStorage.getItem('page_size');
      if (page && size)
        return {"page":+page, "size":+size}
        else return null;
      }
    removePager(){
      sessionStorage.removeItem('page');
      sessionStorage.removeItem('page_size');
    }
}
