import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "/bookList" },
    { path: "bookList", component: BookListComponent, canActivate:[authGuard] },
    { path: "Edit/:id", component: BookFormComponent },
    { path: "create", component: BookFormComponent },

    { path: "**", component: NotFoundComponent }
];
