import { Injectable } from "@angular/core";
import { Http,Headers, Response,RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Rx";
import { Todo } from "./todo";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TodoService{
	todos:Todo[];
	url="http://meanstack-todo.herokuapp.com/api/name";
	constructor(private http:Http){

	}
	fetch():Observable<Todo[]>{
		return this.http.get(this.url)
		   .map(this.extractData)
		   .catch(this.handleError);
	}

	add(name:string):Observable<Todo[]>{
		let headers = new Headers({ 'Content-Type': 'application/json',
  		'Accept': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
		return this.http.post(this.url,JSON.stringify({n: name}),options)
			.map(this.extractData)
			.catch(this.handleError);
	}
	remove(id:number):Observable<Todo[]>{

		return this.http.delete(this.url+'/'+id)
			.map(this.extractData)
			.catch(this.handleError)
	}


	private handleError(error:any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    private extractData(res: Response) {
	let body = res.json();
        return body || {};
    }
}
