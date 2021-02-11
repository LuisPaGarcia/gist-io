const githubBase = require('github-base');
/**
 * Instance to get or patch an gist ID
 */
class CrudGist {
	/**
   * 
   * @param {string} gistId a valid gist ID
   * @param {string} filename name of the file inside the gist
   */
	constructor(gistId, filename) {
		this.gistId = gistId;
		this.fileName = filename;
		this.Github = new githubBase({
			token: process.env.GITHUB_TOKEN
		});
	}

	/**
   * function to get the value of the gist
   * @return {Object} content of the gist as an object
   */
	async get() {
		try {
			return await this.Github
				.get(`/gists/${this.gistId}`)
				.then(response => JSON.parse(response.body.files[this.fileName].content));
		} catch (error) {
			console.log(error);
			return {};
		}
	}
	/**
   * function to update the content of the gist
   * @param {object} newContent new content of the gist 
   * @return {Boolean} true if the update was successful, false if have fail
   */
	async patch(newContent) {
		try {
			await this.Github.patch(`/gists/${this.gistId}`, {
				files: { [this.fileName]: { content: JSON.stringify(newContent) } }
			});
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	}
}

module.exports = CrudGist;
