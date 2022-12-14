const { Activity } = require("../models");
const { validationResult } = require("express-validator");

module.exports = class ActivityController {
  static async findAll(req, res) {
    const data = await Activity.findAll();

    return res.json({
      success: "Success",
      message: "Success",
      data: data.map(d => {
        return {
          id: d.id,
          email: d.email,
          title: d.title,
          created_at: d.createdAt,
          updated_at: d.updatedAt,
          deleted_at: null
        }
      })
    })
  }

  static async findOne(req, res) {
    // retrieve id 
    const { id } = req.params;
    const data = await Activity.findByPk(id);

    if (!data) {
      return res.status(404).json({
        status: "Not Found",
        message: `Activity with ID ${id} Not Found`,
        data: {}
      });
    }

    return res.json({
      status: "Success",
      message: "Success",
      data: {
        id: data.id,
        email: data.email,
        title: data.title,
        created_at: data.createdAt,
        updated_at: data.updatedAt,
        deleted_at: null
      }
    })
  }

  static async create(req, res) {
    // retrieve data from body
    const { title, email } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "Bad Request",
        message: errors.array()[0].msg,
        data: {}
      })
    }

    const data = await Activity.create({
      title, email
    });

    return res.status(201).json({
      status: "Success",
      message: "Success",
      data: {
        id: data.id,
        email: data.email,
        title: data.title,
        created_at: data.createdAt,
        updated_at: data.updatedAt,
      }
    })
  }

  static async update(req, res) {
    // retrieve id from params
    const { id } = req.params;
    // retrieve title from body
    const { title } = req.body;
    // check errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "Bad Request",
        message: errors.array()[0].msg,
        data: {}
      })
    }

    const data = await Activity.findByPk(id);

    if (!data) {
      return res.status(404).json({
        status: "Not Found",
        message: `Activity with ID ${id} Not Found`,
        data: {}
      });
    }

    const result = await data.update({
      title
    });

    return res.json({
      status: "Success",
      message: "Success",
      data: {
        id: result.id,
        email: result.email,
        title: result.title,
        created_at: result.createdAt,
        updated_at: result.updatedAt,
        deleted_at: null
      }
    }) 
  }

  static async delete(req, res) {
    // retrieve id from params;
    const { id } = req.params;

    const data = await Activity.findByPk(id);

    if (!data) {
      return res.status(404).json({
        status: "Not Found",
        message: `Activity with ID ${id} Not Found`,
        data: {}
      });
    }

    await data.destroy();

    return res.json({
      status: "Success",
      message: "Success",
      data: {}
    })
  }
}