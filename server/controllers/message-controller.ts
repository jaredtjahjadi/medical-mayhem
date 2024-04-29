import { auth } from '../auth/index'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express';
import { User } from '../models/user'
import { Message } from '../models/message';

//TODO: might have to add additional middleware that check if the user still exists



export * as MessageController from './message-controller'