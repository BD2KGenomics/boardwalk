/**
 * Model containing DOM-related variables required for, and backing single, horizontal, stacked bar chart,
 * displaying term breakdown of a given facet.
 */
export class FacetTermChartDOM {

    // SVG element
    public svg;

    // Root graphics element - all SVG components are attached to this element or children of this element (not the core SVG element)
    public g;

    /**
     * Generate from svg and g elements.
     *
     * @param svg
     * @param g
     */
    constructor(svg, g) {

        this.svg = svg;
        this.g = g;
    }

    /**
     * Return the current height of the svg.
     *
     * @returns {number}
     */
    public getSVGHeight(): number {

        return parseInt(this.svg.style("height"), 10);
    }

    /**
     * Return the current width of the svg.
     *
     * @returns {number}
     */
    public getSVGWidth(): number {

        return parseInt(this.svg.style("width"), 10);
    }
}