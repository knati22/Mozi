import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'star'
})
export class StarPipe implements PipeTransform {

  transform(value: number, max: number = 5): string {
  const full = '★';
  const empty = '☆';

  const fullCount = Math.min(Math.round(value), max);
  const emptyCount = max - fullCount;

  return full.repeat(fullCount) + empty.repeat(emptyCount);
}

}
