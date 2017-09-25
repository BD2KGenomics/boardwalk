// Dependencies
import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { selectAuthenticated, selectAuthenticatedUser } from "../../auth/_ngrx/auth.selectors";
import { User } from "../../data/user/user.model";
import { AppState } from "../../_ngrx/app.state";

/**
 * Core toolbar component, displays UCSC Genomics Institute logo and CGL-related menu items.
 */

@Component({
    selector: "cgl-toolbar",
    templateUrl: "cgl-toolbar.component.html",
    styleUrls: ["cgl-toolbar.component.scss"]
})

export class CGLToolbarComponent {

    authenticated$: Observable<boolean>;
    authorizedUser$: Observable<User>;

    constructor(private store: Store<AppState>) {
        this.authenticated$ = this.store.select(selectAuthenticated);
        const user$ = this.store.select(selectAuthenticatedUser);
        this.authorizedUser$ = user$.map((user: User) => {
            if (user && user.email) {
                return user;
            }
            return null;
        });
    }
}
