import { T } from "../libs/types/common"
import {Request, Response} from "express";
import MemberService from "../models/Member.service";
import { LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
const restaurantController: T = {};
restaurantController.goHome = (req: Request, res: Response) => {
    try{
        console.log("goHome");
        res.send("Done");
    }catch(err){
        console.log("Error on Home Page", err);
    }
}

restaurantController.getLogin = (req: Request, res: Response) => {
    try{
        console.log("getLogin");
        res.send("Done")
    }catch(err){
        console.log("Error on Login Page", err);
    }
}

restaurantController.processLogin = async (req: Request, res: Response) => {
    try{
        console.log("processLogin");
        console.log("req.body: ",req.body);
        const input: LoginInput = req.body;

        const memberService = new MemberService();
        const result = await memberService.processLogin(input)

        res.send(result);
    }catch(err){
        console.log("Error on Login Page", err);
        res.send(err);
    }
}

restaurantController.getSignup = (req: Request, res: Response) => {
    try{
        console.log("getSignup");
        res.send("Done")
    }catch(err){
        console.log("Error on Signup Page", err);
    }
}

restaurantController.processSignup = async(req: Request, res: Response) => {
    try{
      console.log("processSignup");
      console.log("body: ",req.body);

      const newMember: MemberInput = req.body;
      newMember.memberType = MemberType.RESTAURANT;

      const memberService =  new MemberService();
      const result = await memberService.processSignup(newMember);

      res.send(result);
    }catch(err){
      console.log("Error on Signup Page", err);
      res.send(err);
    }
}

export default restaurantController;