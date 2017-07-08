// suchRemember.js

/**
 * This class wraps the popup's form, and performs the proper clearing of data
 * based on the user's selections. It depends on the form containing a single
 * select element with an id of 'timeframe', and a single button with an id of
 * 'button'. When you write actual code you should probably be a little more
 * accepting of variance, but this is just a sample app. :)
 *
 * Most of this is boilerplate binding the controller to the UI. The bits that
 * specifically will be useful when using the BrowsingData API are contained in
 * `parseMilliseconds_`, `handleCallback_`, and `handleClick_`.
 *
 * @constructor
 */
var PopupController = function () {
  this.button_ = document.getElementById('button');
  this.timeframe_ = document.getElementById('timeframe');
  this.addListeners_();
};

PopupController.prototype = {
  /**
   * A cached reference to the button element.
   *
   * @type {Element}
   * @private
   */
  button_: null,

  /**
   * Adds event listeners to the button in order to capture a user's click, and
   * perform some action in response.
   *
   * @private
   */
  addListeners_: function () {
    this.button_.addEventListener('click', this.handleClick_.bind(this));
  },

  /**
   * Handle a success/failure callback from the `browsingData` API methods,
   * updating the UI appropriately.
   *
   * @private
   */
  handleCallback_: function () {
    var success = document.createElement('div');
    success.classList.add('overlay');
    success.setAttribute('role', 'alert');
    success.textContent = 'Data has been cleared.';
    document.body.appendChild(success);

    setTimeout(function() { success.classList.add('visible'); }, 10);
    setTimeout(function() {
      if (close === false)
        success.classList.remove('visible');
      else
        window.close();
    }, 4000);
  },

  /**
   * When a user clicks the button, this method is called: then calls the clearing
   * method with appropriate arguments.
   *
   * @private
   */
  handleClick_: function () {
	this.button_.setAttribute('disabled', 'disabled');
	this.button_.innerText = 'Clearing...';
	chrome.browsingData.remove({ "since" : 0 }, {
		"appcache": true,
		"cache": true,
		"cookies": true,
		"downloads": true,
		"fileSystems": true,
		"formData": true,
		"history": true,
		"indexedDB": true,
		"localStorage": true,
		"serverBoundCertificates": true,
		"pluginData": true,
		"passwords": true,
		"webSQL": true
	}, this.handleCallback_.bind(this));
  }
};

document.addEventListener('DOMContentLoaded', function () {
  window.PC = new PopupController();
});
