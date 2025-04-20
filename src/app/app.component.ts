import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReminderListComponent } from './components/reminder-list/reminder-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReminderListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Reminder App';
}
