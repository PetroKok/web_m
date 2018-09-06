import {validateLoginInput} from "../settings/login";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from '../models/User'
import c from 'colors'

export default (req, res) => {
    const {errors, isValid} = validateLoginInput(req.body);
    console.log(c.yellow("EMAIL"),c.blue(" => "), req.body.email);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.getOne({email: email}, (err, user) => {
        if (!user) {
            errors.email = 'User not found'
            return res.status(404).json(errors);
        }
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (isMatch) {
                    const payload = {
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar
                    }
                    jwt.sign(payload, 'secret', {expiresIn: 3600},
                        (err, token) => {
                            if (err) {
                                console.error('There is some error in token', err);
                            } else {
                                 console.log(c.blue("SUCCESS:"+ c.green(" TRUE")));
                                return res.status(200).send({
                                    success: true,
                                    token: `Bearer ${token}`
                                });
                            }
                        });
                }
                else {
                    errors.password = 'Incorrect Password';
                    return res.status(400).json(errors);
                }
            });
    })
};

