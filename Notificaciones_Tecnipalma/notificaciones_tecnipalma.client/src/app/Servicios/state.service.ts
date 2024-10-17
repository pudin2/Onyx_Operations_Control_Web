// search.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchQuery: string = '';

  setSearchQuery(query: string): void {
    this.searchQuery = query;
  }

  getSearchQuery(): string {
    return this.searchQuery;
  }

  clearSearchQuery(): void {
    this.searchQuery = '';
  }
}
