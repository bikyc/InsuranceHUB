import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
  standalone: false
})
export class SearchFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) {
      return items;
    }
    
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      return Object.values(item).some((val: any) => {
        if (val !== null && val !== undefined) {
          return val.toString().toLowerCase().includes(searchText);
        }
        return false;
      });
    });
  }
}

