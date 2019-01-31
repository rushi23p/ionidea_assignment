import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { TodoService } from './services/todo.service';
import ToDo from './models/todo.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public userForm: FormGroup;
  public showContent: boolean = true;

  constructor(
    private todoService: TodoService,
    public form: FormBuilder
  ) { }

  public newTodo: ToDo = new ToDo()

  todosList: ToDo[];
  editTodos: ToDo[] = [];

  ngOnInit(): void {
    this.todoService.getToDos()
      .subscribe(todos => {
        this.todosList = todos
        console.log(todos)
      });

      this.userForm = new FormGroup({
        'userName': new FormControl(null, [Validators.required]),
        'password': new FormControl(null, [
            Validators.required, 
            Validators.pattern('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,16})')
        ])
    }); 
  }

  create() {
    this.todoService.createTodo(this.newTodo)
      .subscribe((res) => {
        this.todosList.push(res.data)
        this.newTodo = new ToDo()
      })
  }

  deleteTodo(todo: ToDo) {
    this.todoService.deleteTodo(todo._id).subscribe(res => {
      this.todosList.splice(this.todosList.indexOf(todo), 1);
    })
  }

  show() {
    this.showContent = !this.showContent;
  }

  title = 'app';


}
