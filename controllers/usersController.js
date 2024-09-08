// controllers/usersController.js 
import usersStorage from '../storages/usersStorage.js';
import { body, validationResult } from 'express-validator';

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters";

const validateUser = [
    body("firstName").trim()
        .isAlpha().withMessage(`First name ${alphaErr}`)
        .isLength({ min: 1, max: 10 }).withMessage(`Frist name ${lengthErr}`),
    body("lastName").trim()
        .isAlpha().withMessage(`Last name ${alphaErr}`)
        .isLength({ min: 1, max: 10 }).withMessage(`Last name ${lengthErr}`),
    body("email").trim()
        .isEmail().withMessage(`Email is not valid`),
    body("age").trim()
        .isInt({ min: 18, max: 120 }).withMessage(`Age is not valid`),
    body("bio").trim()
        .isLength({ max: 200 }).withMessage(`Limited`)
];

const usersListGet = (req, res) => {
    res.render("index", {
        title: "User list",
        users: usersStorage.user.getUsers(),
    });
};

const usersCreateGet = (req, res) => {
    res.render("createUser", {
        title: "Create user",
    });
};

const usersCreatePost = [
    validateUser,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("createUser", {
                title: "Create User",
                errors: errors.array(),
            });
        }
        const { firstName, lastName, email, age, bio } = req.body;
        usersStorage.user.addUser({ firstName, lastName, email, age, bio });
        res.redirect("/");
    }
];

const usersUpdateGet = (req, res) => {
    const user = usersStorage.user.getUser(req.params.id);
    res.render("updateUser", {
        title: "Update user",
        user: user,
    });
};

const usersUpdatePost = [
    validateUser,
    (req, res) => {
        const user = usersStorage.user.getUser(req.params.id);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("updateUser", {
                title: "Update user",
                user: user,
                errors: errors.array(),
            });
        }
        const { firstName, lastName, email, age, bio } = req.body;
        usersStorage.user.updateUser(req.params.id, { firstName, lastName, email, age, bio });
        res.redirect('/');
    }
];

const usersDeletePost = (req, res) => {
    usersStorage.user.deleteUser(req.params.id);
    res.redirect('/');
};

const usersSearchGet = (req, res) => {
    let find = req.query.search;
    let result = usersStorage.user.findUser(find);
    if (!result) {
        res.send("No result found");
    } else {
        res.render("searchUser", {
            title: "Search user",
            user: result
        });
    }
};

export default {
    usersListGet,
    usersCreateGet,
    usersCreatePost,
    usersUpdateGet,
    usersUpdatePost,
    usersDeletePost,
    usersSearchGet
};

