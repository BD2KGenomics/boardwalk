// Core dependencies
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

// App dependencies
import {
    RequestFileManifestSummaryAction,
    RequestDownloadFileManifestAction
} from "./actions/file-actions";
import { FileFacet } from "./shared/file-facet.model";
import { FileSummary } from "./file-summary/file-summary";
import { selectFileFacetsFileFacets, selectFileSummarySummary } from "./files.reducer";
import { ACTIONS } from "../shared/boardwalk.actions";
import { BoardwalkStore } from "../shared/boardwalk.model";

/**
 * Core files component, displays results summary as well as facets.
 */

@Component({
    selector: "bw-files",
    templateUrl: "files.component.html",
    styleUrls: ["files.component.scss"]
})
export class FilesComponent implements OnInit {

    // Locals
    private route: ActivatedRoute;
    private store: Store<BoardwalkStore>;

    // Public variables
    public selectFileSummary$: Observable<FileSummary>;
    public fileFacets$: Observable<FileFacet[]>;

    /**
     * @param route {ActivatedRoute}
     * @param store {Store<BoardwalkStore>}
     */
    constructor(route: ActivatedRoute,
                store: Store<BoardwalkStore>) {

        this.route = route;
        this.store = store;
    }

    /**
     * Public API
     */

    /**
     * Request manifest summary
     */
    public requestManifestSummary() {

        this.store.dispatch(new RequestFileManifestSummaryAction());
    }


    /**
     * Dispatch Manifest Download Request
     */
    public onDownloadManifest() {
        this.store.dispatch(new RequestDownloadFileManifestAction());
    }

    /**
     * Life cycle hooks
     */

    /**
     * Set up selectors and request initial data set.
     */
    public ngOnInit() {

        // File Summary
        // this.selectFileSummaryLoading$ = selectFileSummaryLoading(this.store);
        // this.selectFileSummary$ = selectFileSummary(this.store);
        this.selectFileSummary$ = this.store.select(selectFileSummarySummary);


        // File Facets
        // this.fileFacetsLoading$ = selectFileFacetsLoading(this.store);
        // this.fileFacets$ = selectFileFacets(this.store);
        this.fileFacets$ = this.store.select(selectFileFacetsFileFacets);

        // initialize the filter state from the params in the route.
        this.initQueryParams();

    }

    /**
     * PRIVATES
     */

    /**
     * Parse queryParams into file filters
     */
    private initQueryParams() {

        this.route.queryParams
            .map((params) => {

                if (params && params["filters"] && params["filters"].length) {
                    return {
                        filters: JSON.parse(decodeURIComponent(params["filters"]))
                    };
                }
                else {
                    return {};
                }
            })
            .subscribe((query) => {
                this.store.dispatch({ type: ACTIONS.INIT_FILE_FACETS, payload: query });
            });
    }
}
