import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService, UserService } from '../../core/services';
import { IUser } from '../../core/models';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NewUserModalComponent } from '../../components/user-form/new-user-modal.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})


export class DashboardComponent implements OnInit {
  users: IUser[] = [];

  total = 0;
  perPage = 6;
  page = 1;

  displayedColumns: string[] = ['firstName','lastName', 'email', 'avatar'];
  dataSource = new MatTableDataSource<IUser>();

  @ViewChild(MatPaginator) paginator!: MatPaginator ;

 
  constructor(private userService: UserService,private dialog: MatDialog,private router: Router,private authService: AuthService) {}

  ngOnInit(): void {
    this.getAllUsers(this.page);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllUsers(page:number) {
    this.userService
      .getAllUsers(page)
      .pipe()
      .subscribe((data: any) => {
        console.log(
          '🚀 ~ DashboardComponent ~ this.userService.getAllUsers ~ data:',
          data
        );
        if (data) {
          this.users = data.data;
          this.dataSource = new MatTableDataSource<IUser>(this.users);
          this.dataSource.paginator = this.paginator; 

          this.total = data.total;
          this.perPage = data.per_page;
          this.page = data.page;
        }
      });
  }

  onViewUserDetails(user: IUser){
    this.router.navigate(['/user', user.id]);

  }

  onCreateNewUser(){
    const dialogRef = this.dialog.open(NewUserModalComponent, {
      width: '400px',
      disableClose: true
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('new user data:', result);
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.getAllUsers(event.pageIndex + 1);
  }

  onLogout() {
    this.authService.logout();
  }
}
