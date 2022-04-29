const { authRoutes } = require('./auth');
const { projectRoutes } = require('./project');
const { teamRoutes } = require('./team');
const { userRoutes } = require('./user');

const router = require('express').Router();
router.use('/auth', authRoutes)
router.use('/team', teamRoutes)
router.use('/user', userRoutes)
router.use('/project', projectRoutes)

module.exports = {
  AllRoutes : router
}