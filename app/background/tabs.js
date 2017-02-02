/* -----------------    CONSTANTS     ------------------ */

// const ADD_GROUP = 'ADD_GROUP';
// const REMOVE_GROUP = 'REMOVE_GROUP';
export const ADD_USER = 'ADD_USER';
export const GET_USER = 'GET_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const ADD_MSG = 'ADD_MSG';
export const GET_MSG = 'GET_MSG';
// const ADD_TAB = 'ADD_TAB';
export const CHANGE_ACTIVE = 'CHANGE_ACTIVE';
//const REMOVE_MSG = 'REMOVE_MSG';

export default function reducer (tabs = {}, action) {
	switch (action.type) {
    // case ADD_GROUP:
    //   return Object.assign({}, tabs, action.payload)
    // case REMOVE_GROUP:
    // //change this later to have gross nested object.assigns
    //   let newTabsObj = Object.assign({}, tabs);
    //   delete newTabsObj[action.tabId][action.groupId];
    //   return newTabsObj;
    case ADD_USER: {
      return Object.assign({}, tabs, {[action.tabId]:
        Object.assign({}, tabs[action.tabId][action.groupId], {[action.groupId]:
          Object.assign({}, tabs[action.tabId][action.groupId].users, {[action.user.id]: 1})
        })
      });
    }
    case REMOVE_USER: {
    //change this later to have gross nested object.assigns
      let newObj = Object.assign({}, tabs);
      delete newObj[action.tabId][action.groupId].users[action.user.id];
      return newObj;
    }
    case GET_USER: {
      const userIds = action.userIds.reduce((obj, userId) => {
				obj[userId] = 1;
				return obj;
			}, {});
			return Object.assign({}, tabs, {[action.tabId]:
        Object.assign({}, tabs[action.tabId][action.groupId], {[action.groupId]:
          Object.assign({}, tabs[action.tabId][action.groupId].users, userIds)
        })
      });
    }
    case ADD_MSG: {
      return Object.assign({}, tabs, {[tabs.active]:
        Object.assign({}, tabs[tabs.active][action.msg.group_id], {[action.msg.group_id]:
          Object.assign({}, tabs[tabs.active][action.msg.group_id].messages, {[action.msg.id]: 1})
        })
      });
    }
    case GET_MSG: {
      const messageIds = action.messageIds.reduce((obj, messageId) => {
				obj[messageId] = 1;
				return obj;
			}, {});
			return Object.assign({}, tabs, {[action.tabId]:
        Object.assign({}, tabs[action.tabId][action.groupId], {[action.groupId]:
          Object.assign({}, tabs[action.tabId][action.groupId].messages, messageIds)
        })
      });
    }
    // case ADD_TAB:
    //   return Object.assign({}, tabs, {[action.tabId]:{'foo': {}}}, {active: action.tabId})
    case CHANGE_ACTIVE: {
      return Object.assign({}, tabs, {active: action.tabId});
    }
    default: {
      return tabs;
    }
  }
}

//add_user, get_user, remove_user

// export const add_group = (tabId, group) => {
//   return {
//     type: ADD_GROUP,
//     payload:{
//       [tabId]: {
//         [group.id]: {
//           users: group.users,
//           messages: group.messages
//         }
//       }
//     }
//   }
// };

// export const remove_group = (tabId, groupId) => {
//   return {
//     type: REMOVE_GROUP,
//     tabId: tabId,
//     groupId: groupId
//   }
// };

// export const add_user = (tabId, groupId, userId) => {
//   return {
//     type: ADD_USER,
//     userId: userId,
//     groupId: groupId,
//     tabId: tabId
//   }
// }

// // export const add_msg = (message) => {
// //   return {
// //     type: ADD_MSG,
// //     message: message.msg,
// //     tabId: message.tabId
// //   }
// // }

// export const remove_user = (tabId, groupId, userId) => {
//   return {
//     type: REMOVE_USER,
//     userId: userId,
//     groupId: groupId,
//     tabId: tabId
//   }
// }

// export const change_active = (tabId) => {
//   return {
//     type: CHANGE_ACTIVE,
//     tabId: tabId
//   }
// }


//----------------    dispatchers   -------------------

// export const addGroup = (groupUrl, tabId, user_id) => {
//   // return (dispatch) => {
//     axios.post(rootPath + 'groups', {url: groupUrl, name: groupUrl, user_id: user_id})
//     .then(response => response.data)
//     .then(group => {
//       store.dispatch(add_group(tabId, group));
//     })
//     .catch(err => console.error(err.stack))
//   // }
// }

// export const removeGroup = (tabId, groupId) => {
//   // return (dispatch) => {
//     axios.delete(rootPath + `groups/${groupId}`)
//     .then(() => store.dispatch(remove_group(tabId, groupId)))
//     .catch(err => console.error(err.stack))
//   // }
// }

// export const createGroup = (url, name, userId) => dispatch => {
// 	if (name == undefined) name = url;
// 	axios.post('/api/groups', {name, url, userId})
// 		.then(res => res.data)
// 		.then(group => dispatch(add_group(group)))
// 		.catch(err => console.error(`Creating group ${name} for ${url} unsuccessful`, err));
// };