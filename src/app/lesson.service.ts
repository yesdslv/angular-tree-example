import { Observable, of, pipe } from 'rxjs';
import { catchError, map, tap, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LESSONS } from './mock-lessons';
import { Lesson } from './lesson';
import { Node } from './node';
import { element } from 'protractor';
import { Grammar } from './grammar';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private lessonsAPI = 'lessons';
  private lessons: Lesson[] = [];

  constructor(private http: HttpClient) { }

  getLessons(): Observable<Lesson[]> {
    let lesson1: Observable<Lesson[]> =  this.http.get<Lesson[]>('lessons/');
    return lesson1;
  }

  
  getNodes(): Observable<Node[]> {
    type a = Grammar | Lesson;
    let nodes: Observable<Node[]> = this.http.get<Lesson[]>('lessons/').pipe(
       map(element => {
          if element.
       });
    );
    return nodes;
  }

  isLesson(a: Grammar | Lesson): a is Lesson { //magic happens here
    return (<Lesson>a).grammars !== undefined;
  }


  // private _convert_lessons_to_flat_nodes = (observable_lessons: Observable<Lesson[]>): Observable<Node[]> => {
  //   if 
  //   let result = []
  //   observable_lessons.forEach((lesson, index) => {
  //     result.push({'name': lesson.title, children: []});
  //     // lesson.grammars.forEach((grammar) => {
  //     //   result[index].children.push({'name': grammar.text});
  //     // });
  //   });
  //   return result;
  // }


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
