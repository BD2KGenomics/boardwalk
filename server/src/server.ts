/**
 * Server Initialization
 */
/**
 * Types
 */
/**
 * Dependencies
 */
import { Req } from "./boardwalk";
import { config } from "./lib/config/config";
import * as express from "express";
import * as compression from "compression";
import { expressConfig } from "./lib/config/express";

process.env["NODE_ENV"] = process.env["NODE_ENV"] || "local";


export const app = express();

// Use Handlebars for templating
require("express-handlebars");

// For gzip compression
app.use(compression());

app.use((req: Req, res, next) => {

    req.config = config;

    // Add Google Analytics token
    if (config.env === "production") {

        const includeGA = !!config.googleAnalytics;
        res.locals.INCLUDE_GA = includeGA;
        if (includeGA) {
            res.locals.GA_TOKEN = config.googleAnalytics.token;
        }
    }

    return next();
});

// Express settings
expressConfig(app);

// Start server
app.listen(config.port, () => {
    console.log("Express server listening on port %d in %s mode", config.port, app.get("env"));
    app.emit("cc:appLoaded");
});
