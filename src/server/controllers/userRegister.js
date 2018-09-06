import {validateRegisterInput} from "../settings/register";
import gravatar from "gravatar";
import bcrypt from "bcryptjs";
import colors from 'colors'

import User from '../models/User';


export default (req, res) => {

    const {errors, isValid} = validateRegisterInput(req.body);

    console.log(colors.yellow(req.body));

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.getOne({email: req.body.email}, (err, user) => {
        if (user) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        }
        const avatar = gravatar.url(req.body.email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            avatar
        };

        bcrypt.genSalt(10, (err, salt) => {
            if (err) console.error('There was an error', err);
            else {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) console.error('There was an error', err);
                    else {
                        newUser.password = hash;
                        User.saveOne(newUser, (err, us) => {
                            if(err) throw err;
                            console.log(us);
                            return res.status(200).json("OK");
                        })
                    }
                });
            }
        });
    });
};
