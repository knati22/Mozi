import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datum'
})
export class DatumPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    try {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        return value;
      }
      const ev = date.getFullYear();
      const honap = String(date.getMonth() + 1).padStart(2, '0');
      const nap = String(date.getDate()).padStart(2, '0');
      return `${ev}-${honap}-${nap}`;
    } catch (error) {
      return value;
    }
  }
}
