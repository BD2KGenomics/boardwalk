/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * File-related routes used by Boardwalk.
 */

// Core dependencies
import { Route } from "@angular/router";

// App dependencies
import { LoginComponent } from "../auth/login/login.component";
import { FilesComponent } from "./files.component";
import { RegisterComponent } from "../auth/register/register.component";

export const routes: Route[] = [
    {
        path: "boardwalk",
        component: FilesComponent
    },
    {
        path: "authenticate",
        component: LoginComponent
    },
    {
        path: "register",
        component: RegisterComponent
    }
];
