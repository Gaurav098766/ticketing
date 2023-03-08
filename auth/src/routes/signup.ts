import express, { Request, Response } from 'express';
import { body} from 'express-validator'; // for email and password validation
import { User } from '../models/user';
import { BadRequestError,validationRequest } from '@gsticket/common';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters')
  ],
  validationRequest,
  async (req: Request, res: Response) => {

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const user = User.build({ email, password });
    await user.save();

    //Generate JWT Token
    const userJwt = jwt.sign({
      id: user.id,
      email:user.email
    },
    process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt:userJwt
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
