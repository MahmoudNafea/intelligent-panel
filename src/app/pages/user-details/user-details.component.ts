import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../core/services';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit {
  user: any;
  userId: string | null = null;

  constructor(private route: ActivatedRoute,private userService: UserService) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.getUserDetails(this.userId);
    }
  }

  getUserDetails(id: string) {
   this.userService.getUserById(id).pipe().subscribe((data: any) => {
      if (data) {
        this.user = data.data;
      }
    });
  }
}
