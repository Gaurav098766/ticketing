import express from 'express'
import 'express-async-errors'
import {json} from 'body-parser';
import cookieSession from 'cookie-session';

import { currentuserRouter } from './routes/current-user';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { errorHandler,NotFoundError } from '@gsticket/common';

const app = express();
app.set('trust proxy',true); //express is sware that it's behind a proxy of ingress and nginx and make sure taht is should still trust traffic being secure even though it's coming from that proxy 
app.use(json());
app.use(
    cookieSession({
        signed:false, // diasble encryption on this cookie because JWT is already cookie
        secure: process.env.NODE_ENV !== 'test' // must be on https connection
        // It has also been used while testing , 
        //make sure while development mode keep it false and in other condition make it true
    })
)

// From Routes Directory
app.use(currentuserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*',async(req,res)=>{
    throw new NotFoundError();
})

//From error-handler Middleware Directory
app.use(errorHandler);

export {app};
