const express = require('express');
const router = express.Router();
const Support = require('../schema/supportSchema');
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const userSchema = require('../schema/userSchema')
const sellerSchema = require('../schema/sellerSchema');
const supportSchema = require('../schema/supportSchema');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const basePath = path.join(__dirname, '../uploads/support', req.params.id)
        if (!fs.existsSync(basePath)) {
            fs.mkdirSync(basePath, { recursive: true })
        }
        cb(null, basePath)
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage }).fields([
    { name: 'screenshots' }
])

// Create a new support ticket
exports.createSupport = async (req, res) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) return console.error(err)
        try {
            const { issue, note } = req.body;
            const { role } = req.query
            const screenshotImagesPaths = req.files['screenshots'].map((value) => `/uploads/support/${req.params.id}/${value.originalname}`)
            const support = await Support.create({ issue, note, screenshots: screenshotImagesPaths, from: { from: req.params.id, role } });
            await support.save();
            res.status(201).json(support);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })
};

exports.getSupportOnSrNo = async (req, res) => {
    try {
        const { srno } = req.body
        const issue = await supportSchema.findOne({ srno })
        if(!issue) {
            return res
            .status(404)
            .json({
                success: false,
                message: 'No records found'
            })
        }
        res
        .json({
            success: true,
            issue
        })
    } catch (err) {
        res
        .status(500)
        .json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

// Get all support tickets
exports.getSupport = async (req, res) => {
    try {
        const queries = req.query ?? {}
        let supports = await Support.find(queries)
        supports = await Promise.all(supports.map(async ({ _doc: value }) => {
            let user;
            if (value.from.role === 'user') user = await userSchema.findById(value.from.id).select('firstName lastName')
            if (value.from.role === 'seller') user = await sellerSchema.findById(value.from.id).select('firstName lastName')
            console.log(user)
            return {
                ...value,
                from: {
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: value.from.role
                }
            }
        }));
        res.status(200).json({ success: true, supports });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
};

exports.updateSupport = async (req, res) => {
    try {
        let update = {};
        if (req.body.issue) update.issue = req.body.issue;
        if (req.body.note) update.note = req.body.note;
        if (req.body.screenshots) update.screenshots = req.body.screenshots;
        if (req.body.resolved) update.resolved = req.body.resolved;

        const support = await Support.findByIdAndUpdate(req.params.id, update, { new: true });
        if (!support) return res.status(404).json({ success: false, message: 'Support ticket not found' });
        res.status(200).json({ success: true, support });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete a support ticket
exports.deleteSupport = async (req, res) => {
    try {
        const support = await Support.findByIdAndRemove(req.params.id);
        if (!support) return res.status(404).json({ message: 'Support ticket not found' });
        res.status(200).json({ message: 'Support ticket deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
