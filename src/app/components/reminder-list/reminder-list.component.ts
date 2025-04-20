import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { Reminder } from '../../models/reminder.model';
import { ReminderService } from '../../services/reminder.service';

@Component({
  selector: 'app-reminder-list',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    NgxMatTimepickerModule
  ],
  templateUrl: './reminder-list.component.html',
  styleUrls: ['./reminder-list.component.scss']
})
export class ReminderListComponent implements OnInit, OnDestroy {
  reminders$: Observable<Reminder[]>;
  currentTime$: Observable<Date>;
  timeSpeed$: Observable<number>;
  newReminderText = '';
  newReminderTime = '';
  
  private subscription: Subscription = new Subscription();
  isFastTime = false;

  constructor(private reminderService: ReminderService) {
    this.reminders$ = this.reminderService.getReminders();
    this.currentTime$ = this.reminderService.getCurrentTime();
    this.timeSpeed$ = this.reminderService.getTimeSpeed();
    
    // Subscribe to time speed changes
    this.subscription.add(
      this.timeSpeed$.subscribe(speed => {
        this.isFastTime = speed > 1;
        console.log('Time speed changed to:', speed, 'Fast mode:', this.isFastTime);
      })
    );
  }

  ngOnInit(): void {
    // Set default reminder time to current time
    const now = new Date();
    this.setDefaultNewReminderTime(now);
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setDefaultNewReminderTime(date: Date): void {
    // Format time in 12-hour format suitable for the time picker
    const hours = date.getHours();
    const minutes = date.getMinutes();
    // Format as hh:mm AM/PM for display
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12; // Convert to 12-hour format
    this.newReminderTime = `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    console.log('Set default time:', this.newReminderTime);
  }

  addReminder(): void {
    if (!this.newReminderText.trim() || !this.newReminderTime) return;

    console.log('Adding reminder with time:', this.newReminderTime);
    
    // Parse the time from the time picker (which might be in format: "h:mm AM/PM")
    const timeValue = this.newReminderTime;
    const reminderTime = new Date();
    
    try {
      // Handle different possible formats from the time picker
      if (timeValue.includes('AM') || timeValue.includes('PM')) {
        // Format: "h:mm AM/PM"
        const [timePart, meridiem] = timeValue.split(' ');
        let [hours, minutes] = timePart.split(':').map(Number);
        
        // Convert hours to 24-hour format if PM
        if (meridiem === 'PM' && hours < 12) {
          hours += 12;
        } else if (meridiem === 'AM' && hours === 12) {
          hours = 0;
        }
        
        reminderTime.setHours(hours, minutes, 0);
      } else {
        // Fallback for 24-hour format: "HH:mm"
        const [hours, minutes] = timeValue.split(':').map(Number);
        reminderTime.setHours(hours, minutes, 0);
      }
      
      console.log('Reminder time set to:', reminderTime);
      
      this.reminderService.addReminder(this.newReminderText, reminderTime);
      
      // Reset form
      this.newReminderText = '';
      
      // Set next reminder time to current time
      const currentTime = new Date();
      this.setDefaultNewReminderTime(currentTime);
    } catch (error) {
      console.error('Error parsing time:', error);
      // Handle error - could show message to user
    }
  }

  toggleTimeSpeed(): void {
    console.log('Toggle time speed clicked');
    this.reminderService.toggleTimeSpeed();
  }

  formatTime(date: Date): string {
    return this.reminderService.formatTimeString(date);
  }
  
  getTimeSpeedLabel(): string {
    return this.isFastTime ? 'FAST' : 'NORMAL';
  }
}
