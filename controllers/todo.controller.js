const { Todo } = require("../models");
const { validationResult } = require("express-validator");

module.exports = class TodoController {
  static async findAll(req, res) {
    // retrive activity id from params
    let data
    const { activity_group_id } = req.query;

    if (activity_group_id == undefined) {
      data = await Todo.findAll();
    } else {
      data = await Todo.findAll({
        where: { activity_group_id: +activity_group_id }
      });
    }

    return res.json({
      status: "Success",
      message: "Success",
      data: data.map(d => {
        return {
          id: d.id,
          title: d.title,
          activity_group_id: d.activity_group_id,
          is_active: "1",
          priority: d.priority,
          created_at: d.createdAt,
          updated_at: d.updatedAt,
          deleted_at: null
        }
      })
    })
  }

  static async findOne(req, res) {
    // retrieve id from params
    const { id } = req.params;

    const data = await Todo.findOne({
      where: { id }
    });

    if (!data) {
      return res.status(404).json({
        status: "Not Found",
        message: `Todo with ID ${id} Not Found`,
        data: {}
      });
    }

    return res.json({
      status: "Success",
      message: "Success",
      data: {
        id: data.id,
        title: data.title,
        activity_group_id: data.activity_group_id,
        is_active: "1",
        priority: data.priority,
        created_at: data.createdAt,
        updated_at: data.updatedAt,
        deleted_at: null
      }
    })
  }

  static async create(req, res) {
    // retrieve data from body
    const { title, activity_group_id } = req.body;

    // check error
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "Bad Request",
        message: errors.array()[0].msg,
        data: {}
      })
    }

    const data = await Todo.create({
      title, activity_group_id
    });

    return res.status(201).json({
      status: "Success",
      message: "Success",
      data: {
        id: data.id,
        title: data.title,
        activity_group_id: data.activity_group_id,
        is_active: data.is_active,
        priority: data.priority,
        created_at: data.createdAt,
        updated_at: data.updatedAt,
      }
    })
  }

  static async update(req, res) {
    // retrieve data from body
    const { title, is_active } = req.body;
    // retrieve id from params
    const { id } = req.params;

    // check error
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "Bad Request",
        message: errors.array()[0].msg,
        data: {}
      })
    }

    const data = await Todo.findOne({
      where: { id }
    });

    if (!data) {
      return res.status(404).json({
        status: "Not Found",
        message: `Todo with ID ${id} Not Found`,
        data: {}
      });
    }

    const result = await data.update({
      title, is_active
    })

    return res.json({
      status: "Success",
      message: "Success",
      data: {
        id: result.id,
        title: result.title,
        activity_group_id: result.activity_group_id,
        is_active: "1",
        priority: result.priority,
        created_at: result.createdAt,
        updated_at: result.updatedAt,
        deleted_at: null
      }
    }) 
  }

  static async delete(req, res) {
    // retrieve id from params;
    const { id } = req.params;

    const data = await Todo.findOne({
      where: { id }
    });

    if (!data) {
      return res.status(404).json({
        status: "Not Found",
        message: `Todo with ID ${id} Not Found`,
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