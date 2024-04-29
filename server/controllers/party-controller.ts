import { auth } from '../auth/index'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express';
import { User } from '../models/user'
import { Party } from '../models/party';

//TODO: might have to add additional middleware that check if the user still exists

export const getParty = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.userId, {username: 1, _id: 1, profilePicture: 1});
        if(!user) return res.status(400).json({errorMessage: 'User not found.'});
        const party = await Party.findOne({users: user._id});
        res.status(200).json(party ? party : {
            users: [user],
            partyLeader: null
        });
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
}

export * as PartyController from './party-controller'