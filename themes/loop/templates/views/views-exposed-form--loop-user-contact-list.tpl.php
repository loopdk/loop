<?php

/**
 * @file
 * This template handles the layout of the views exposed filter form.
 *
 * Variables available:
 * - $widgets: An array of exposed form widgets. Each widget contains:
 * - $widget->label: The visible label to print. May be optional.
 * - $widget->operator: The operator for the widget. May be optional.
 * - $widget->widget: The widget itself.
 * - $sort_by: The select box to sort the view using an exposed form.
 * - $sort_order: The select box with the ASC, DESC options to define order.
 *   May be optional.
 * - $items_per_page: The select box with the available items per page.
 *   May be optional.
 * - $offset: A text field to define the offset of the view. May be optional.
 * - $reset_button: A button to reset the exposed filter applied. May be
 *   optional.
 * - $button: The submit button for the form.
 *
 * @ingroup views_templates
 */
?>
<?php if (!empty($q)): ?>
  <?php
    // This ensures that, if clean URLs are off, the 'q' is added first so that
    // it shows up first in the URL.
    print $q;
  ?>
<?php endif; ?>

<div class="views-exposed-form">
  <div class="views-exposed-widgets">
    <?php foreach ($widgets as $id => $widget): ?>
      <div id="<?php print $widget->id; ?>-wrapper" class="views-exposed-widget views-widget-<?php print $id; ?>">
        <?php // Render just the search field and submit button ?>
        <?php if ('edit-search' === $widget->id): ?>
          <?php print $widget->widget; ?>
          <?php print $button; ?>
        <?php endif; ?>
      </div>
    <?php endforeach; ?>

  </div>
</div>
