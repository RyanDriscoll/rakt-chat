import { GET_USER, GET_MSG, CHANGE_ACTIVE } from './tabs.js';
import rootPath from './httpServer.jsx';
import axios from 'axios';
import store from './store.js';
import socket from './sockets/io';

export const get_user = (users, userIds, tabId, groupId) => {
  return {
    type: GET_USER,
    userIds: userIds,
    groupId: groupId,
    tabId: tabId,
    users: users
  }
}

export const get_msg = (messages, messageIds, tabId, groupId) => {
  return {
    type: GET_MSG,
    messages: messages,
    messageIds: messageIds,
    tabId: tabId,
    groupId: groupId
  }
}

export const change_active = (tabId) => {
  return {
    type: CHANGE_ACTIVE,
    tabId: tabId
  }
}

export const getUser = (tabId, groupId) => {
	axios.get(rootPath + 'groups/group_users', {params: {groupId}})
  .then(res => {
    return res.data;
  })
  .then(foundUsers => {
    const users = foundUsers.map(groupUser => groupUser.user);
    const userIds = users.map(user => user.id);
    store.dispatch(get_user(users, userIds, tabId, groupId));
  })
  .catch(err => console.error(`Getting users for group ${groupId} unsuccessful`, err));
};

export const getMsg = (tabId, groups) => {
	axios.get(rootPath + 'messages', {params: groups})
  .then(res => res.data)
  .then(foundMessages => { //get back array of circle's msgs
    const messageIds = foundMessages.map(message => message.id);
    const users = foundMessages.map(message => message.user);
    store.dispatch(get_user(users, null, null, null))
    store.dispatch(get_msg(foundMessages, messageIds, tabId, groupId));
  })
  .catch(err => console.error(`Getting Messages for group ${groupId} unsuccessful`, err));
};


export const addGroup = (url) => {
  let circleIds = [null, ...Object.keys(store.getState().circles)]
  socket.emit('joinGroup', {url: url, user_id: store.getState().auth.id, circleIds:circleIds});
};

export const removeUser = (groupId, userId) => {
  axios.delete(rootPath + 'groups/users', {data: {groupId, userId}})
  .catch(err => console.log(err, err.stack))
}