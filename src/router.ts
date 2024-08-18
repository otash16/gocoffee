import express, {Request, Response} from "express";
const router = express.Router();


router.get("/",(req: Request, res: Response) => {
    res.send("Home");
});

router.get("/login",(req: Request, res: Response) => {
    res.send("Login");
})

router.get("/signup",(req: Request, res: Response) => {
    res.send("Signup");
});

export default router;