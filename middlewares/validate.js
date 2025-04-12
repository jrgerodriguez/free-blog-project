const validator = require('../helpers/validate');

const createAndUpdateUserRules = async(req, res, next) => {
    const validationRule = {
        firstName: "required|string",
        lastName: "required|string",
        email: "required|string|email",
        city: "required|string",
        country: "required|string",
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if(!status) {
            res.status(400).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    })
}

const createAndUpdateArticle = async(req, res, next) => {
    const validationRule = {
        title: "required|string",
        content: "required|string",
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if(!status) {
            res.status(400).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    })
}

const createAndUpdateHardwareProduct = async(req, res, next) => {
    const validationRule = {
        name: "required|string",
        price: "required|numeric",
        description: "required|string",
        model: "required|string",
        brand: "required|string",
        category: "required|string"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if(!status) {
            res.status(400).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    })
}

const createAndUpdateDigitalProduct = async(req, res, next) => {
    const validationRule = {
        name: "required|string",
        version: "required|string",
        company: "required|string",
        description: "required|string",
        extra: "required|string",
        plan: "required|string",
        available: "required|boolean",
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if(!status) {
            res.status(400).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    })
}

module.exports = {createAndUpdateUserRules, createAndUpdateArticle, createAndUpdateHardwareProduct, createAndUpdateDigitalProduct}