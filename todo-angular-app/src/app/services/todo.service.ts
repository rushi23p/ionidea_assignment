import ToDo from '../models/todo.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';


import 'rxjs/add/operator/map';

@Injectable()
export class TodoService {

  api_url = 'http://localhost:3000';
  todoApi = `${this.api_url}/api/todos`;

  constructor(
    private http: HttpClient
  ) { }


  createTodo(todo: ToDo): Observable<any>{
    return this.http.post(`${this.todoApi}`, todo);
  }

  getToDos(): Observable<ToDo[]>{
    return this.http.get(this.todoApi)
    .map(res  => {
      return res["data"].docs as ToDo[];
    })
  }

  deleteTodo(id:string):any{
    let deleteUrl = `${this.todoApi}/${id}`
    return this.http.delete(deleteUrl)
    .map(res  => {
      return res;
    })
  }

}
