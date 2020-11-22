import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { filter, scan, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading = new BehaviorSubject<boolean>(false);
  loading$ = this.loading.asObservable();
  requests$ = new Subject();
	responses$ = new Subject();
	
  constructor() {
    combineLatest(
      this.requests$.pipe(
        tap(() => this.loading.next(true)),
        scan(acc => {
          return acc + 1;
        }, 0)
      ),
      this.responses$.pipe(
        scan(acc => {
          return acc + 1;
        }, 0)
      )
    )
      .pipe(filter(([reqCount, respCount]) => reqCount === respCount))
      .subscribe(() => {
        this.loading.next(false);
      });
  }
}
