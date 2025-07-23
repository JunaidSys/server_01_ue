import express,{Router} from 'express';

class AuthRoutes {
  private router:Router;
  constructor(){
    this.router=express.Router();
  }
  public routes():Router{
    this.router.post('/signup',);
    this.router.post('/signin',);
    this.router.post('/forgot-password',);
    this.router.post('/reset-password/:token',);
    return this.router;
  }
  public signout_route():Router{
    this.router.get('/signout',);
    return this.router;
  }
}


export const authRoutes:AuthRoutes=new AuthRoutes();
