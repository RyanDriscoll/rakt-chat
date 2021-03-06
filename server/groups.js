'use strict'

const db = require('APP/db')
const Group = db.model('groups')
const GroupUser = db.model('group_user')
const User = db.model('users')
const sockets = require('APP/server/sockets').get();


module.exports = require('express').Router()

  .get('/group_users', (req, res, next) => 
    GroupUser.findAll({
      where: { group_id: { $in: req.query.groups } }, 
      include: [ { model: User, attributes: ['id', 'username'] } ]
    })
    .then(groupUsers => res.json(groupUsers))
    .catch(next))

  .get('/user/:userId', (req, res, next) =>
    User.findById(req.params.userId).getGroups()
    .then(groups => res.json(groups))
    .catch(next))

  // .post('/', (req, res, next) => 
  //   Group.findOrCreate({where: {url: req.body.url, name: req.body.name}})
  //   .then(([group, created]) => {
  //     GroupUser.findOrCreate({where: {user_id: req.body.userId, group_id: group.id}})
  //     //socket emit
  //     res.status(201).json(group);
  //   })
  //   .catch(next))

  .delete('/users', (req, res, next) => 
    GroupUser.destroy({where: {group_id: req.body.groupId, user_id: req.body.userId}})
    .then(result => {
      sockets.io.emit('remove:user', {groupId: req.body.groupId, user_id: req.body.userId})
      res.sendStatus(200)
    })
    .catch(next))

  .delete('/:groupId', (req, res, next) => {
    let groupId = req.params.groupId;
    Group.destroy({where: {id: groupId}})
    .then(() => {
      res.sendStatus(200)
    })
    .catch(next)
  })
  .put('/:id', (req, res, next) =>
    Group.update(req.body, {where:{id: req.params.id}})
    .then(groupArr => groupArr[1][0]) //class version of update return array of # of rows updated, and the array of modified arrays
    .then(group => res.json(group))
    .catch(next))

  .use('/', (err, req, res, next) => {
    console.log("error in groups routes", err, err.stack)
    done();
  })
