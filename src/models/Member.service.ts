import MemberModel from "../schema/Member.model";
import { LoginInput, Member, MemberInput } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { MemberType } from "../libs/enums/member.enum";
import * as bycrypt from "bcryptjs";

 class MemberService {
   private readonly memberModel;
    constructor() {
      this.memberModel = MemberModel;
    }

    /** SPA */
    public async signup(input: MemberInput, ): Promise<Member>{
      const salt = await bycrypt.genSalt();
      input.memberPassword = await bycrypt.hash(input.memberPassword, salt);

      try{
      const result = await this.memberModel.create(input);
      result.memberPassword = "";
      return result.toJSON();
    } catch(err) {
      console.log("Error, model:signup", err);
      
      throw new Errors(HttpCode.BAD_REQUEST, Message.USED_NICK_PHONE);
      }
    }

    public async login(input: LoginInput): Promise<Member> {
      const member = await this.memberModel.findOne(
         {memberNick: input.memberNick},
         {memberNick: 1, memberPassword: 1}
      )
      .exec();

      if(!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);

      const isMatch = await bycrypt.compare(input.memberPassword, member.memberPassword);
      // const isMatch = input.memberPassword === member.memberPassword;



      if(!isMatch) {
         throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
      }

      return await this.memberModel.findById(member._id).exec();
    }
    


    /** SSR */

    public async processSignup(input: MemberInput, ): Promise<Member>{
      const exist = await this.memberModel.findOne({memberType: MemberType.RESTAURANT})
      .exec();
      console.log("exist: ",exist);
      if(exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATED_FAILED);

      console.log("before:", input.memberPassword);

      const salt = await bycrypt.genSalt();
      input.memberPassword = await bycrypt.hash(input.memberPassword, salt);

      console.log("after:", input.memberPassword);
      

      try{
      const result = await this.memberModel.create(input);
      result.memberPassword = "";
      return result;
      } catch(err) {
         throw new Errors(HttpCode.BAD_REQUEST, Message.CREATED_FAILED);
      }
    }

    public async processLogin(input: LoginInput): Promise<Member> {
      const member = await this.memberModel.findOne(
         {memberNick: input.memberNick},
         {memberNick: 1, memberPassword: 1}
      )
      .exec();

      if(!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);

      const isMatch = await bycrypt.compare(input.memberPassword, member.memberPassword);
      // const isMatch = input.memberPassword === member.memberPassword;



      if(!isMatch) {
         throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
      }

      return await this.memberModel.findById(member._id).exec();
    }
 }

 export default MemberService;