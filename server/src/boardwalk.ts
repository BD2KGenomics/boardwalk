import { Request as ExpressReq } from "express";
import { Config } from "./lib/config/config";
import { Types } from "mongoose";

type ExpressSesssion = Express.Session;

interface BoardwalkRequest {
    config: Config;
    body: any;
    params: any;
    query: any;
    session: ExpressSesssion;
}


export type Req = ExpressReq & BoardwalkRequest & Express.Request;

export type OID = Types.ObjectId;

export interface ListModel<T> {
    count: number;
    items: T[];
}


export type ErrorCallback = (error: Error) => void;
export type Callback<T> = (error: Error, results?: T) => void;
export type ListModelCB<T> = Callback<ListModel<T>>;