import { T } from "../libs/types/common"
import {Request, Response} from "express";
const memberController: T = {};
memberController.goHome = (req: Request, res: Response) => {
    try{
        res.send("Home Page")
    }catch(err){
        console.log("Error on Home Page", err);
    }
}

memberController.getLogin = (req: Request, res: Response) => {
    try{
        res.send("Login Page")
    }catch(err){
        console.log("Error on Login Page", err);
    }
}

memberController.getSignup = (req: Request, res: Response) => {
    try{
        res.send("Signup Page")
    }catch(err){
        console.log("Error on Signup Page", err);
    }
}
export default memberController;