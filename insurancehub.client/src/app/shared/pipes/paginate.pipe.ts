import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginate',
  standalone: false
})
export class PaginatePipe implements PipeTransform {
  transform(items: any[], config: { itemsPerPage: number; currentPage: number }): any[] {
    if (!items || !config) {
      return items;
    }
    
    const startIndex = (config.currentPage - 1) * config.itemsPerPage;
    const endIndex = startIndex + config.itemsPerPage;
    return items.slice(startIndex, endIndex);
  }
}

