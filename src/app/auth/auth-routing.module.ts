import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { PostListComponent } from "../posts/post-list/post-list.component";

// defines the route components to be handled whenever these routes are encountered

const routes: Routes = [
  
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
