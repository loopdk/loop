/**
 * @file
 * Adds siteimprove to the current page.
 */

(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.cookieMessageBehavior = {
    attach: function (context, settings) {
      let key = settings.itk_siteimprove.key;
      let useCookieInformation = settings.itk_siteimprove.useCookieinformation;
      if (key) {
        if (useCookieInformation) {
          window.addEventListener('CookieInformationConsentGiven', function (event) {
            if (CookieInformation.getConsentGivenFor('cookie_cat_statistic')) {
              insertSiteImprove(key);
            }
          }, false);
        }
        else {
          insertSiteImprove(key);
        }

      }
    }
  };
})(jQuery, Drupal);


function insertSiteImprove(key) {
  (function () {
    var sz = document.createElement('script');
    sz.type = 'text/javascript';
    sz.async = true;
    sz.src = '//ssl.siteimprove.com/js/siteanalyze_' + key + '.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(sz, s);
  })();
}
