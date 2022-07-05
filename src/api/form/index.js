const e = require('express');
const express = require('express');
const db = require('../../models');

const Social = db.social;
const Category = db.category;
const router = express.Router();

router.post('/models', async (req, res) => {
  const {
    social, username, email
  } = req.body;
  // insert into social table
  if (!social || !username || !email) {
    return res.status(400).json({
      message: 'Please provide all required fields'
    });
  }

  try {
    const social_data = await Social.create({
      social,
      username,
      email,
      completed_at: false
    });
    const dataJSON = {
      status: 'success',
      message: `${social} - Your suggestion has been added and is awaiting verification.`,
      data: social_data
    };
    return res.status(201).json(dataJSON);
  } catch (error) {
    const errorJSON = {
      status: 'error',
      message: error.message
    };
    res.status(500).json(errorJSON);
  }
});

router.post('/addProfile', async (req, res) => {
  const {
    username, email
  } = req.body;
  // insert into social table
  const social = 'addProfile';
  if (!username || !email) {
    return res.status(400).json({
      message: 'Please provide all required fields'
    });
  }

  try {
    const social_data = await Social.create({
      social,
      username,
      email,
      completed_at: false
    });
    const dataJSON = {
      status: 'success',
      message: 'Your suggestion has been added and is awaiting verification.',
      data: social_data
    };
    return res.status(201).json(dataJSON);
  } catch (error) {
    const errorJSON = {
      status: 'error',
      message: error.message
    };
    res.status(500).json(errorJSON);
  }
});

router.post('/addTrialLink', async (req, res) => {
  const {
    username, email, social
  } = req.body;
  // insert into social table
  if (!username || !email) {
    return res.status(400).json({
      message: 'Please provide all required fields'
    });
  }

  try {
    const social_data = await Social.create({
      social,
      username,
      email,
      completed_at: false
    });
    const dataJSON = {
      status: 'success',
      message: 'Your suggestion has been added and is awaiting verification.',
      data: social_data
    };
    return res.status(201).json(dataJSON);
  } catch (error) {
    const errorJSON = {
      status: 'error',
      message: error.message
    };
    res.status(500).json(errorJSON);
  }
});

router.post('/category', async (req, res) => {
  const {
    category, username, email
  } = req.body;
  // insert into category table
  if (!category || !username || !email) {
    return res.status(400).json({
      message: 'Please provide all required fields'
    });
  }

  try {
    const categoryData = await Category.create({
      category,
      username,
      email,
      completed_at: false
    });
    const dataJSON = {
      status: 'success',
      message: 'Your suggestion has been added and is awaiting verification.',
      data: categoryData
    };
    return res.status(201).json(dataJSON);
  } catch (error) {
    const errorJSON = {
      status: 'error',
      message: error.message
    };
    res.status(500).json(errorJSON);
  }
});

module.exports = router;
