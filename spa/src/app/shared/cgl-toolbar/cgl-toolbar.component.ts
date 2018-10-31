/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 * 
 * Core toolbar component, displays UCSC Genomics Institute logo and CGL-related menu items.
 */

// Core dependencies
import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

// App dependencies

import { selectAuthenticated, selectAuthenticatedUser } from "../../auth/_ngrx/auth.selectors";
import { ConfigService } from "../../config/config.service";
import { User } from "../../data/user/user.model";
import { AppState } from "../../_ngrx/app.state";

@Component({
    selector: "cgl-toolbar",
    templateUrl: "cgl-toolbar.component.html",
    styleUrls: ["cgl-toolbar.component.scss"]
})

export class CGLToolbarComponent {

    // Locals
    authenticated$: Observable<boolean>;
    authorizedUser$: Observable<User>;
    rootURL: string;
    authURL: string;

    /**
     * @param {Store<AppState>} store
     * @param {ConfigService} configService
     */
    constructor(private store: Store<AppState>,
                private configService: ConfigService) {
        this.authenticated$ = this.store.select(selectAuthenticated);
        const user$ = this.store.select(selectAuthenticatedUser);

        this.authorizedUser$ = user$.map((user: User) => {
            if (user && user.email) {
                return user;
            }
            return null;
        });

        this.rootURL = this.configService.getPortalURL();
        this.authURL = this.configService.getDataURL();
    }

}
