import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserModel } from '../../models/user-model';
import { GitService } from '../../services/git.service';
import { UserRepoModel } from '../../models/user-repo-model';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss']
})
export class SingleUserComponent implements OnInit {
  userData: UserModel;
  repoList: Array<UserRepoModel>;
  searchTerm: string;
  constructor(
    @Inject(MatDialogRef) private dialogRef: MatDialogRef<SingleUserComponent>,
    private gitService: GitService
  ) {
    this.repoList = new Array<UserRepoModel>(0);
  }

  ngOnInit(): void {
    this.fetchReposFromServer();
  }

  fetchReposFromServer() {
    this.gitService.getAllReposForUsers<UserRepoModel[]>(this.userData.repos_url).subscribe(data => {
      if (data !== null) {
        this.repoList = data;
      }
    });
  }

}
