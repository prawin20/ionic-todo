import { Component } from '@angular/core';
import { Todo,TodoService } from '../../app/service/todo';
import { NavController,AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  todos:Todo[]; 
  constructor(public navCtrl: NavController,public alertCtrl: AlertController,private todoService:TodoService) {
  	this.todoService.fetch().subscribe(data=>this.todos=data);
  }

  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Add Task',
      message: "Enter a Task",
      inputs: [
        {
          name: 'task',
          placeholder: 'Task'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
          	this.todoService.add(data.task).subscribe(data=>this.todos=data);
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }
  remove(id:number){
  	this.todoService.remove(id).subscribe(data=>this.todos=data);
  	 console.log('Deleted clicked');
  }

}
