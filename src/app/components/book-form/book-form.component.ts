import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookApiService } from '../../services/book-api.service';
import { Book } from '../../models/book';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BookFormComponent implements OnInit {
  bookId: number | null = null;
  bookDetails: FormGroup;

  constructor(private route: ActivatedRoute,
    private _bookApiService: BookApiService,
    private fb: FormBuilder,
    private router: Router) {

    this.bookDetails = fb.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      publishedYear: ['', [Validators.required]]
    })
  }


  ngOnInit(): void {
    const bookIdParam = this.route.snapshot.paramMap.get("id");
    this.bookId = bookIdParam ? +bookIdParam : null;
    if (this.bookId !== null) {
      this.bookDetail(this.bookId)
    }
    else {
      alert("You Will Create New Book");
    }
  }

  get titleValid() {
    return this.bookDetails.get('title');
  }
  get authorValid() {
    return this.bookDetails.get('author');
  }
  get publishedYearValid() {
    return this.bookDetails.get('publishedYear');
  }
  get genreValid() {
    return this.bookDetails.get('genre');
  }

  bookDetail(bookIdParamter: number) {
    this._bookApiService.getById(bookIdParamter).subscribe((res: Book) => {
      debugger
      this.bookDetails.setValue({
        title: res.title,
        genre: res.genre,
        author: res.author,
        publishedYear: res.publishedYear
      })
    })
  }


  onSubmit() {
    if (this.bookId !== null) {
      const updatedBook: Book = {
        id: this.bookId,
        title: this.bookDetails.value.title,
        author: this.bookDetails.value.author,
        genre: this.bookDetails.value.genre,
        publishedYear: this.bookDetails.value.publishedYear
      };

      this._bookApiService.updateBook(this.bookId, updatedBook).subscribe((res) => {
        debugger
        this.router.navigate(['/bookList'])
      })
    }
    else if (this.bookId === null) {
      this.createNewBook()
    }
  }


  createNewBook() {
    this._bookApiService.createNewBook(this.bookDetails.value).subscribe((res) => {
      this.router.navigate(['/bookList'])
      // this.router.navigateByUrl('/bookList')
    })
  } 
}
