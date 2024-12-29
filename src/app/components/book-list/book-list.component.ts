import { Component, OnInit } from '@angular/core';
import { BookApiService } from '../../services/book-api.service';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book';
import { Router } from '@angular/router';


@Component({
  selector: 'app-book-list',
  imports: [CommonModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
  bookList !: Book[];

  constructor(private _bookService: BookApiService, private router: Router) {
  }


  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    // debugger
    // this._bookService.getAllBooks().subscribe((res)=>{
    //   this.bookList = res
    // });
    //=========== second shape 
    this._bookService.getAllBooks().subscribe({
      next:(res)=>{
        this.bookList = res
      },
      error:(error)=>{
        alert('Having Error '+ error)
      },
     // complete() {},
    })
  }

  showDetail(id: number) {
    this.router.navigate([`/Edit/${id}`]);
  }

  deleteBook(id: number) {
    this._bookService.removeBook(id).subscribe((res) => {
      alert("Book deleted successfully :)");
      this.getAll();
    });
  }

}
