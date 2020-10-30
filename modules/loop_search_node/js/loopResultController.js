/**
 * @file
 * This is the controller for the search result application.
 *
 * It simply updates the view when hits have been received.
 */

angular.module('searchResultApp').controller('loopResultController', ['CONFIG', 'communicatorService', '$scope', '$window', '$http',
  function (CONFIG, communicatorService, $scope, $window, $http) {
    'use strict';

    // Set template to use.
    $scope.template = CONFIG.templates.result;

    // Scope variable that can be used to make indications on the current
    // process. E.g display spinner.
    $scope.searching = false;

    // Used to ensure "no-results" is not shown before first search.
    $scope.no_hits_yet = true;

    // Check if the provider supports an pager.
    if (CONFIG.provider.hasOwnProperty('pager')) {
      // Add pager information to the scope.
      $scope.pager = angular.copy(CONFIG.provider.pager);
    }

    /**
     * Expose the Drupal.t() function to angular templates.
     *
     * @param str
     *   The string to translate.
     * @returns string
     *   The translated string.
     */
    $scope.Drupal = {
      "t": function t(str, args, options) {
        return $window.Drupal.t(str, args, options);
      }
    };

    /**
     * Update pager information.
     */
    $scope.search = function search() {
      communicatorService.$emit('pager', $scope.pager);
    };

    /**
     * Send filter selection event to search controller.
     *
     * @param {string} filter
     *   The field/filter to use.
     * @param {string} selection
     *   The selected term to filter on.
     */
    $scope.filterUpdate = function filterUpdate(filter, selection) {
      communicatorService.$emit('filterUpdate', {
        'filter': filter,
        'selection': selection
      });
    };

    /**
     * Handle search results hits from the search box application.
     */
    $scope.hits = [];
    communicatorService.$on('hits', function onHits(event, data) {
      $scope.no_hits_yet = false;

      // Ensure that hits titles are stream lined.
      var hits = data.hits;
      for (var i in hits.results) {
        if (hits.results[i].hasOwnProperty('_highlight')) {
          hits.results[i].title = hits.results[i]._highlight.title[0];
        }
      }

      var phase = this.$root.$$phase;
      if (phase === '$apply' || phase === '$digest') {
        $scope.hits = hits;
        $scope.searching = false;

        if ($scope.hits.hits === 0) {
          no_results_post_form();
        }
      }
      else {
        $scope.$apply(function () {
          $scope.hits = hits;
          $scope.searching = false;

          if ($scope.hits.hits === 0) {
            no_results_post_form();
          }
        });
      }
    });

    /**
     * Handle searching message, send when search is called.
     */
    communicatorService.$on('searching', function onSearching(event, data) {
      var phase = this.$root.$$phase;
      if (phase === '$apply' || phase === '$digest') {
        $scope.searching = true;
      }
      else {
        $scope.$apply(function () {
          $scope.searching = true;
        });
      }
    });

    /**
     * Handle pager updates.
     */
    communicatorService.$on('pager', function onPager(event, data) {
      var phase = this.$root.$$phase;
      if (phase === '$apply' || phase === '$digest') {
        $scope.pager = data;
      }
      else {
        $scope.$apply(function () {
          $scope.pager = data;
        });
      }
    });

    /**
     * Helper function to ensure that the form is loaded and ready for the
     * jQuery hacks.
     *
     * @param data
     *   Data from the XHR request.
     */
    function enabled_no_results_form(data) {
      // There is currently no safeway to detect if a element is ready. So we
      // us a simple timeout.
      setTimeout(function () {
        if (document.getElementById('edit-field-description-und-0-value').length === 0) {
          enabled_no_results_form(data);
        }
        else {
          var no_result_text = $scope.Drupal.t('Enter value.', {}, {'context': 'angular'});
          var placeholder_text = $scope.Drupal.t('Enter value.', {}, {'context': 'angular'});

          jQuery('.js-chosen-select-area-of-expertise').chosen({
            no_results_text: no_result_text,
            placeholder_text: placeholder_text
          });

          jQuery('.js-chosen-select-profession').chosen({
            no_results_text: no_result_text,
            placeholder_text: placeholder_text
          });

          // Make auto-complete deluxe work (hackish).
          Drupal.settings.autocomplete_deluxe = data.settings[1].data.autocomplete_deluxe;
          jQuery.getScript('/' + data.settings[0]).done(function (script, textStatus) {
            try {
              // This may throw an exception due to location.hash
              // being used in jQuery.find
              // ("#/#text=hat%2520og%2520briller&pager=0:8", say, is
              // not a valid selector).
              Drupal.attachBehaviors();
            } catch (ex) {}

            // Copy question text into the form.
            document.getElementById('edit-field-description-und-0-value').innerHTML = document.getElementById('loop-search-field').value;
          })
          .fail(function (jqxhr, settings, exception) {
            console.error(jqxhr.responseText);
          });
        }
      }, 100);
    }

    /**
     * Callback to get the "no results found" create new post form.
     */
    function no_results_post_form() {
      $http({
        method: 'GET',
        url: '/loop_search_node/not_found'
      }).then(function successCallback(response) {
        document.getElementById('no_result_form').innerHTML = response.data.form;
        enabled_no_results_form(response.data);
      });
    }
  }
]);
