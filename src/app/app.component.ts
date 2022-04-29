import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  newMemberName = '';
  members: string[] = [];
  errorMessage = '';
  numberofTeams: number | "" = "";
  teams: string[][] = [];

  onInput(input: string) {
    this.newMemberName = input;
  }

  onNoTInput(value: string) {
    this.numberofTeams = Number(value);
  }

  addMember() {
    if (!this.newMemberName) {
      this.errorMessage = "Name can't be empty";
      return;
    }

    this.members.push(this.newMemberName);
    this.newMemberName = '';
    this.errorMessage = '';
  }

  generateTeams() {
    if(!this.numberofTeams || this.numberofTeams<=0) {
      this.errorMessage = "Invalid number of teams";
      return;
    }

    if (this.numberofTeams > this.members.length) {
      this.errorMessage = "Not enough members";
      return;
    }

    this.errorMessage = '';
    const allMembers =  [...this.members]; // look this up  

    while (allMembers.length) {
      for (let i=0; i<this.numberofTeams; i++) {
        const randomIndex = Math.floor(Math.random() * allMembers.length);
        const member = allMembers.splice(randomIndex, 1)[0];
        
        if (!member) break;

        if (this.teams[i]) {
          this.teams[i].push(member);
        } else {
          this.teams[i] = [member];
        }
      }
    }

    this.members = [];
    this.numberofTeams = 0;
  }
}