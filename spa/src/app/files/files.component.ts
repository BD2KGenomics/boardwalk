/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Core files component, displays results summary as well as facets.
 */

// Core dependencies
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
// App dependencies
import { FileFacet } from "./shared/file-facet.model";
import { FileSummary } from "./file-summary/file-summary";

import {
    DownloadFileManifestAction,
    FetchFileManifestSummaryRequestAction
} from "./_ngrx/file-manifest-summary/file-manifest-summary.actions";
import { selectFileFacetsFileFacets, selectFileSummary, selectSelectedFileFacets } from "./_ngrx/file.selectors";
import { AppState } from "../_ngrx/app.state";
import { FetchFileFacetsRequestAction } from "./_ngrx/file-facet-list/file-facet-list.actions";
import { MatDialog, MatIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
import { FileExportManifestRequestAction } from "./_ngrx/file-export/file-export.actions";


@Component({
    selector: "bw-files",
    templateUrl: "files.component.html",
    styleUrls: ["files.component.scss"]
})
export class FilesComponent implements OnInit {

    // Locals
    private route: ActivatedRoute;
    private store: Store<AppState>;

    private exportDialogUp = false;
    private authenticated = false;

    // Public variables
    public selectFileSummary$: Observable<FileSummary>;
    public fileFacets$: Observable<FileFacet[]>;

    public selectedFileFacets$: Observable<FileFacet[]>;



    /**
     * @param route {ActivatedRoute}
     * @param store {Store<AppState>}
     */
    constructor(route: ActivatedRoute,
                store: Store<AppState>,
                private dialog: MatDialog,
                private iconRegistry: MatIconRegistry,
                private sanitizer: DomSanitizer) {

        this.route = route;
        this.store = store;
        iconRegistry.addSvgIcon("firecloud",
            sanitizer.bypassSecurityTrustResourceUrl("/assets/images/thirdparty/FireCloud-white-icon.svg"));

    }

    /**
     * Public API
     */

    /**
     * Dispatch action to request updated manifest summary (ie summary counts, file sizes etc)
     */
    public requestManifestSummary() {

        this.store.dispatch(new FetchFileManifestSummaryRequestAction());
    }


    /**
     * Dispatch action to download manifest summary.
     */
    public onDownloadManifest() {
        this.store.dispatch(new DownloadFileManifestAction());
    }

    onExportToFireCloud() {
        this.store.dispatch(new FileExportManifestRequestAction());
    }

    /**
     * Life cycle hooks
     */

    /**
     * Set up selectors and request initial data set.
     */
    public ngOnInit() {

        // File Summary
        this.selectFileSummary$ = this.store.select(selectFileSummary);

        // File Facets
        this.fileFacets$ = this.store.select(selectFileFacetsFileFacets);

        this.selectedFileFacets$ = this.store.select(selectSelectedFileFacets);

        // Initialize the filter state from the params in the route.
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
                this.store.dispatch(new FetchFileFacetsRequestAction());
            });
    }

}
