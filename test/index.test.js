var assert = require('assert');
const ClassGist = require('../src');
const GITHUB_TOKEN = '';
const GITHUB_USER = '';
const GistDB = new ClassGist({ token: GITHUB_TOKEN, username: GITHUB_USER });

describe('Connect', function() {
	it('Should connect return the list of available gist for the user', async function() {
		const paged = await GistDB.paged();
		assert.equal(Array.isArray(paged), true);
	});
});
