import { Injectable } from "@angular/core";
import { FileFacetMetadata } from "../files/file-facet-metadata/file-facet-metadata.model";

export type ApiSource = "UCSC_STAGE" | "UCSC" | "ICGC";

@Injectable()
export class ConfigService {

    private source: ApiSource = "UCSC";

    constructor() { }

    getSource(): ApiSource {
        return this.source;
    }

    setSource(source: ApiSource) {
        this.source = source;
    }

    getRootUrl(): string {

        switch (this.source) {
            case "UCSC_STAGE":
                return "http://ec2-35-167-83-191.us-west-2.compute.amazonaws.com/api/v1";
            case "UCSC":
                return "http://ucsc-cgl.org/api/v1";
            default: // "ICGC"
                return "https://dcc.icgc.org/api/v1";
        }
    }

    hasSortOrder() {
        return this.source === "UCSC_STAGE" || this.source === "UCSC";
    }

    getTestSortFacets(): FileFacetMetadata[] {

        return <FileFacetMetadata[]>[
            {
                name: "centerName",
                category: "file"
            },
            {
                name: "program",
                category: "file"
            },
            {
                name: "projectCode",
                category: "file"
            },
            {
                name: "workFlow",
                category: "file"
            },
            {
                name: "analysisType",
                category: "file"
            },
            {
                name: "specimenType",
                category: "file"
            },
            {
                name: "fileFormat",
                category: "file"
            }
        ];
    }
}
