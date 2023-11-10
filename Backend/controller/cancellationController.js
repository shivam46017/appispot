const cancellationSchema = require("../schema/cancellationSchema");
const Cancellation = require("../schema/cancellationSchema");
const orderSchema = require("../schema/orderSchema");
const { default: Payouts } = require("../schema/payoutsSchema");
const refundSchema = require("../schema/refundSchema");
const spotSchema = require("../schema/spotSchema");
const userSchema = require("../schema/userSchema");

exports.getAllcancellations = async (req, res) => {
  try {
    const cancellations = await Cancellation.find().populate("spot");
    res.json(cancellations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addNewCancellation = async (req, res) => {
  try {
    console.log('chal rha hu mai bina tension ke')
    const { id } = req.params;
    const user = await userSchema.findById(id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "Unauthorized access" });
    const {
      bookingId,
      startDate,
      endDate,
      spotName,
      hostName,
      hostPhone,
      refundAmt,
      reason,
    } = req.body;
    const orderedSpot = await orderSchema.findOne({
      date: { startDate, endDate },
      bookingId,
    });
    if (!orderedSpot)
      return res
        .status(404)
        .json({ success: false, message: "No booking found" });
    const cancellation = await Cancellation.create({
      user: orderedSpot.client._id,
      spot: orderedSpot._id,
      spotName,
      hostName,
      hostPhone,
      reason,
      amt: refundAmt,
    });
    res.status(201).json(cancellation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getCancellationById = async (req, res) => {
  try {
    const cancellation = await Cancellation.findById(req.params.id).populate(
      "spot"
    );
    if (!cancellation) {
      return res.status(404).json({ message: "Cancellation not found" });
    }
    res.json(cancellation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCancellation = async (req, res) => {
  try {
    let update;
    for (const key in req.body) {
      if (!req.body) return;
      update[key] = req.body[key];
    }

    const cancellation = await Cancellation.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    ).populate("spot");
    if (!cancellation) {
      return res.status(404).json({ message: "Cancellation not found" });
    }
    res.json(cancellation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteCancellation = async (req, res) => {
  try {
    const cancellation = await Cancellation.findByIdAndDelete(req.params.id);
    if (!cancellation) {
      return res.status(404).json({ message: "Cancellation not found" });
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.approveCancellation = async (req, res) => {
  try {
    const { approve, customer, host } = req.body;
    const { id } = req.params;
    if (typeof approve === "boolean")
      return res
        .status(400)
        .json({
          success: false,
          message: "Only boolean is accepted in approve",
        });
    const cancellation = await cancellationSchema.findByIdAndUpdate(
      id,
      { approve },
      { new: true }
    );
    if (!cancellation) {
      return res
        .status(404)
        .json({ success: false, message: "No records found" });
    }

    const spot = await spotSchema.findById(cancellation.spot._id)
    const order = await orderSchema.findById(cancellation.order._id)
     
    if(customer === '100') {
      const refund = await refundSchema.create({
        amtRequested: order.priceSpot,
        spot: spot._id,
        user: cancellation.user._id
      })
      refund.save()
    }

    if(host === '50' &&  customer === '50') {
      const refund = await refundSchema.create({
        amtRequested: spot.Price / 2,
        spot: spot._id,
        user: cancellation.user._id
      })
      refund.save()

      const payout = await Payouts.create({
        amt: spot.Price / 2,
        spot: spot._id,
        seller: spot.lister._id,
        order: order._id
      })
      payout.save()
    }

    if(host === '100') {
      const payout = await Payouts.create({
        amt: spot.Price,
        spot: spot._id,
        seller: spot.lister._id,
        order: order._id
      })
      payout.save()
    }

    res.json({ success: true, cancellation });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
