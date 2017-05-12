'use strict';
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

/* We need this to create the MD5 hash. The crypto-library is a library from
node.js to create an MD5 hash of the users email address. This is what Gravatar
 uses as the URL for the avatar of an emailaddress. If we now create a new user
  it will add the link to the image in the gravatar property. */
const crypto = require('crypto');

//The Gravatar image service
const gravatarUrl = 'https://s.gravatar.com/avatar';
// The size query. Our chat needs 60px images
const query = 's=60';

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    //The user email
    const { email } = hook.data;

    //Gravatar uses MD5 hashes from an email address to get the image
    const hash = crypto.createHash('md5').update(email).digest('hex');

    hook.data.avatar = `${gravatarUrl}/${hash}?${query}`;

    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    return Promise.resolve(hook);
  };
};
