import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchQuery: string = '';
  private orderData: any = null;

  setSearchQuery(query: string): void {
    this.searchQuery = query;
  }

  getSearchQuery(): string {
    return this.searchQuery;
  }

  clearSearchQuery(): void {
    this.searchQuery = '';
    this.orderData = null;
  }

  setOrderData(order: any): void {
    this.orderData = order;
  }

  getOrderData(): any {
    return this.orderData;
  }
}
