import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, interval } from 'rxjs';
import { Reminder } from '../models/reminder.model';

@Injectable({
  providedIn: 'root'
})
export class ReminderService implements OnDestroy {
  private reminders = new BehaviorSubject<Reminder[]>([]);
  private currentTime = new BehaviorSubject<Date>(new Date());
  private timeSpeed = new BehaviorSubject<number>(1); // 1 = normal speed, 60 = fast speed (1 min in 1 sec)
  private timeInterval!: Subscription;

  constructor() {
    // Start the clock
    this.startClock();
    
    // Add some sample reminders for testing
    this.addSampleReminders();
  }
  
  ngOnDestroy(): void {
    if (this.timeInterval) {
      this.timeInterval.unsubscribe();
    }
  }

  private startClock(): void {
    // Unsubscribe if already subscribed
    if (this.timeInterval) {
      this.timeInterval.unsubscribe();
    }
    
    this.timeInterval = interval(1000).subscribe(() => {
      const currentTime = new Date(this.currentTime.value);
      const speed = this.timeSpeed.value;
      
      if (speed === 1) {
        // Normal speed - just add 1 second
        currentTime.setSeconds(currentTime.getSeconds() + 1);
      } else {
        // Fast speed - add 60 seconds (1 minute)
        currentTime.setMinutes(currentTime.getMinutes() + 1);
      }
      
      this.currentTime.next(currentTime);
      
      // Check for completed reminders
      this.checkCompletedReminders();
    });
  }

  private checkCompletedReminders(): void {
    const currentTime = this.currentTime.value;
    let updated = false;
    
    const reminders = this.reminders.value.map(reminder => {
      if (!reminder.completed && reminder.time <= currentTime) {
        updated = true;
        return { ...reminder, completed: true };
      }
      return reminder;
    });
    
    if (updated) {
      console.log('Updating reminders, current time:', currentTime);
      console.log('Updated reminders:', reminders);
      this.reminders.next(reminders);
    }
  }
  
  private addSampleReminders(): void {
    // Add a reminder 1 minute from now for testing
    const now = new Date();
    
    // First reminder: 1 minute from now
    const reminder1Time = new Date(now);
    reminder1Time.setMinutes(now.getMinutes() + 1);
    
    // Second reminder: 2 minutes from now
    const reminder2Time = new Date(now);
    reminder2Time.setMinutes(now.getMinutes() + 2);
    
    const samples = [
      {
        id: 1,
        text: 'Sample Reminder 1',
        time: reminder1Time,
        completed: false
      },
      {
        id: 2,
        text: 'Sample Reminder 2',
        time: reminder2Time,
        completed: false
      }
    ];
    
    this.reminders.next(samples);
  }

  getReminders(): Observable<Reminder[]> {
    return this.reminders.asObservable();
  }

  getCurrentTime(): Observable<Date> {
    return this.currentTime.asObservable();
  }

  toggleTimeSpeed(): void {
    const newSpeed = this.timeSpeed.value === 1 ? 60 : 1;
    console.log('Toggle time speed to:', newSpeed);
    this.timeSpeed.next(newSpeed);
  }

  getTimeSpeed(): Observable<number> {
    return this.timeSpeed.asObservable();
  }

  addReminder(text: string, time: Date): void {
    const newReminder: Reminder = {
      id: Date.now(),
      text,
      time,
      completed: time <= this.currentTime.value
    };
    
    const updatedReminders = [...this.reminders.value, newReminder];
    this.reminders.next(updatedReminders);
  }

  formatTimeString(date: Date): string {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }
} 