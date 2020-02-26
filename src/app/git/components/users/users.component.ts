import { Component, OnInit } from '@angular/core';
import { GitService } from '../../services/git.service';
import { UserModel } from '../../models/user-model';
import { MatDialog } from '@angular/material/dialog';
import { SingleUserComponent } from '../single-user/single-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userList: Array<UserModel>;
  page: number;
  currentIndex: number;
  searchTerm: string;
  constructor(private gitService: GitService, private dialog: MatDialog) {
    this.userList = new Array<UserModel>(0);
    this.page = 30;
    this.currentIndex = 0;
   }

  ngOnInit(): void {
    this.fetchDataFromServer(0);
  }

  fetchDataFromServer(currentIndex: number) {
    this.gitService.getAllUsers<UserModel[]>(currentIndex * this.page).subscribe(data => {
      if (data !== null) {
        this.userList = data;
      }
    });
  }

  nextUserList() {
    this.currentIndex += 1;
    this.fetchDataFromServer(this.currentIndex);
  }

  prevUserList() {
    this.currentIndex -= 1;
    this.fetchDataFromServer(this.currentIndex);
  }

  openSelectedUserDetails(userData: UserModel) {
    const dialogRef = this.dialog.open(SingleUserComponent, {
      disableClose: true,
      maxWidth: '80vw',
      // minHeight: '80vh',
      minWidth: '60vw',
      // maxHeight: '60vh'
    });
    dialogRef.componentInstance.userData = userData;
    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
