var express = require('express');
var router = express.Router();
var Refund = require('./path_to_your_model');

// Create
exports.createData = function(req, res) {
    var refund = new Refund(req.body);
    refund.save(function(err, newRefund) {
        if (err) {
            res.json({ success: false, data: err });
        } else {
            res.json({ success: true, data: newRefund });
        }
    });
};

// Read with filters on query
exports.getData = function(req, res) {
    Refund.find(req.query, function(err, refunds) {
        if (err) {
            res.json({ success: false, data: err });
        } else {
            res.json({ success: true, data: refunds });
        }
    });
};

// Get a specific document by ID
exports.getDataById = function(req, res) {
    Refund.findById(req.params.id, function(err, refund) {
        if (err) {
            res.json({ success: false, data: err });
        } else {
            res.json({ success: true, data: refund });
        }
    });
};

// Update
exports.updateData = function(req, res) {
    Refund.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, updatedRefund) {
        if (err) {
            res.json({ success: false, data: err });
        } else {
            res.json({ success: true, data: updatedRefund });
        }
    });
};

// Delete
exports.deleteData = function(req, res) {
    Refund.findByIdAndRemove(req.params.id, function(err, deletedRefund) {
        if (err) {
            res.json({ success: false, data: err });
        } else {
            res.json({ success: true, data: deletedRefund });
        }
    });
};

module.exports = exports;
