import { ActionReducer } from "@ngrx/store";
import { compose } from "@ngrx/core/compose";
import { Observable } from "rxjs/Observable";
import "@ngrx/core/add/operator/select";
import "rxjs/add/operator/withLatestFrom";

import * as includes from "lodash/includes";

import * as fromSummary from "./file-summary/file-summary.reducer";
import * as fromFacets from "./file-facets/file-facets.reducer";
import * as fromManifestSummary from "./file-manifest-summary/file-manifest-summary.reducer";

import { Selector } from "../shared/selector";
import { FileManifestSummary } from "./file-manifest-summary/file-manifest-summary";
import { Dictionary } from "../shared/dictionary";
import { FileFacetsState } from "./file-facets/file-facet-state.model";
import { FileFacet } from "./shared/file-facet.model";


export interface FilesState {
    fileSummary: fromSummary.FileSummaryState;
    fileFacets: FileFacetsState;
    fileManifestSummary: fromManifestSummary.State;
}

export const reducers: Dictionary<ActionReducer<any>> = {
    fileSummary: fromSummary.reducer,
    fileFacets: fromFacets.reducer,
    fileManifestSummary: fromManifestSummary.reducer
};


/**
 * File Summary Selectors
 *
 * @param state$
 * @returns {Observable<R>}
 */

export const selectFileSummary = compose(fromSummary.selectFileSummary, selectFileSummaryState);

export const selectFileSummaryLoading = compose(fromSummary.selectFileSummaryLoading, selectFileSummaryState);

function selectFileSummaryState(appState$: Observable<FilesState>): Observable<fromSummary.FileSummaryState> {
    return appState$.select(appState => appState.fileSummary);
};

/**
 * File Facet Selectors
 *
 * @param state$
 * @returns {Observable<R>}
 */
export function selectFileFacetState(appState$: Observable<FilesState>): Observable<FileFacetsState> {
    return appState$.select((appState) => {
        return appState.fileFacets});
};

export const selectFileFacetsLoading = compose(fromFacets.selectLoading, selectFileFacetState);

export function selectSelectedFacetsMap(appState$: Observable<FilesState>): Observable<Map<string,FileFacet>> {
    return selectFileFacetState(appState$).map((fileFacetState: FileFacetsState) => {
            return fileFacetState.selectedFileFacesByName;
        }
    )
};

export function selectFileFacets(appState$: Observable<FilesState>): Observable<FileFacet[]> {
    return selectFileFacetState(appState$).map((fileFacetState: FileFacetsState) => {
            return fileFacetState.fileFacets;
        }
    )
};

export function selectSelectedFileFacets(appState$: Observable<FilesState>): Observable<FileFacet[]> {
    return selectFileFacetState(appState$).map((fileFacetState: FileFacetsState) => {
            return fileFacetState.selectedFileFacets;
        }
    )
};




export function selectManifestSummary(appState$: Observable<FilesState>): Observable<fromManifestSummary.State> {
    return appState$.select(appState => appState.fileManifestSummary);
}


export const selectManifestSummaryLoading: Selector<boolean> = compose(fromManifestSummary.selectLoading, selectManifestSummary);

export const selectRepositoryManifestSummaries: Selector<FileManifestSummary[]> =
    compose(fromManifestSummary.selectRepositoryManifestSummaries, selectManifestSummary);
