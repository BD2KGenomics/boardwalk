/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Files module definition.
 */

// Core dependencies
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSelectModule,
    MatSortModule,
    MatSnackBarModule,
    MatTableModule,
    MatTooltipModule
} from "@angular/material";

// App dependencies
import { CCHttpModule } from "../cc-http/cc-http.module";
import { CcPipeModule } from "../cc-pipe/cc-pipe.module";
import { CCStopPropagationModule } from "../cc-stop-propagation/cc-stop-propagation.module";
import { CcTypeaheadModule } from "../cc-typeahead/cc-typeahead.module";
import { ConfigService } from "../config/config.service";
import { FacetTermChartComponent } from "./facet-term-chart/facet-term-chart.component";
import { FacetTermListComponent } from "./facet-term-list/facet-term-list.component";
import { FilesComponent } from "./files.component";
import { FileFacetsComponent } from "./file-facets/file-facets.component";
import { FileFacetComponent } from "./file-facet/file-facet.component";
import { FileFacetMenuComponent } from "./file-facet-menu/file-facet-menu.component";
import { FileFacetSearchComponent } from "./file-facet-search/file-facet-search.component";
import { FileFacetSearchMenuComponent } from "./file-facet-search-menu/file-facet-search-menu.component";
import { FileFilterComponent } from "./file-filter/file-filter.component";
import { FileFilterResultsComponent } from "./file-filter-results/file-filter-results.component";
import { FileFilterWrapperComponent } from "./file-filter-wrapper/file-filter-wrapper.component";
import { FileManifestSummaryComponent } from "./file-manifest-summary/file-manifest-summary.component";
import { FileFacetWrapperComponent } from "./file-facet-wrapper/file-facet-wrapper.component";
import { routes } from "./files.routes";
import { FileNameShortenerPipe } from "./file-search/file-name-shortener";
import { FileSearchComponent } from "./file-search/file-search.component";
import { FileSummaryComponent } from "./file-summary/file-summary.component";
import { KeywordsModule } from "../keywords/keywords.module";
import { FilesDAO } from "./shared/files.dao";
import { FilesService } from "./shared/files.service";
import { TableComponent } from "./table/table.component";
import { CCAlertDialogComponent } from "../shared/cc-alert-dialog/cc-alert-dialog.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatSelectModule,
        MatProgressBarModule,
        MatRadioModule,
        MatSortModule,
        MatSnackBarModule,
        MatTableModule,
        MatTooltipModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),

        CCHttpModule,
        CcPipeModule,
        CCStopPropagationModule,
        CcTypeaheadModule,

        // Needed for icon registry
        HttpClientModule,

        KeywordsModule

        // EffectsModule.run(FilesEffects)
    ],
    declarations: [

        FacetTermChartComponent,
        FacetTermListComponent,

        FileFilterComponent,
        FileFilterResultsComponent,
        FileFilterWrapperComponent,

        FileSummaryComponent,
        FileFacetsComponent,
        FileManifestSummaryComponent,
        FileSearchComponent,

        FilesComponent,

        FileFacetComponent,
        FileFacetMenuComponent,
        FileFacetSearchComponent,
        FileFacetSearchMenuComponent,
        FileFacetWrapperComponent,
        TableComponent,

        FileNameShortenerPipe],
    entryComponents: [
        CCAlertDialogComponent
    ],
    providers: [
        ConfigService,
        FilesService,
        FilesDAO,
        {provide: "Window", useValue: window} // Required for hamburger functionality
    ]
})
export class FilesModule {
}
