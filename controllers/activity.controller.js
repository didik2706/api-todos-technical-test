const { Activity } = require("../models");
const { validationResult } = require("express-validator");

module.exports = class ActivityController {
  static async findAll(req, res) {

  }

  static async create(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "Bad Request",
        message: errors.array()
      })
    }
  }
}