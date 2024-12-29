import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { environment } from '../Environment/urlApi';

@Injectable({
  providedIn: 'root'
})
export class BookApiService {

  constructor(private httpclient : HttpClient) { }


  getAllBooks(): Observable<Book[]>{
    return this.httpclient.get<Book[]>(`${environment.apiUrl}/GET`);
  }

  getById(id:number): Observable<Book>{
    return this.httpclient.get<Book>(`${environment.apiUrl}/GET/${id}`);
  }

  createNewBook(book:Book) : Observable<Book>{
  return this.httpclient.post<Book>(`${environment.apiUrl}/POST`,book);
  }

  updateBook(id: number, book: Book): Observable<Book> {
    return this.httpclient.put<Book>(`${environment.apiUrl}/PUT/${id}`, book);
  }

  removeBook(id:number): Observable<Book>{
    return this.httpclient.delete<Book>(`${environment.apiUrl}/DELETE/${id}`)
  }
}
