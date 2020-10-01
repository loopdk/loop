<?php // @codingStandardsIgnoreFile

/**
 * @file
 * Document collection print header template.
 */
?>
<!DOCTYPE html>

<html>
  <head>
    <meta charset="utf-8"/>
    <title>print – header – <?php echo $collection->title; ?></title>
    <style>
     html, body {
       margin: 0;
       padding: 0;
     }

     .metadata {
       height: 25mm;
     }

     .metadata .item {
       display: inline-block;
       width: 45%;
     }

     .metadata .label, .metadata .value {
       display: inline-block;
     }

     .metadata .label::after {
       content: ':';
     }
    </style>
  </head>
  <body>
    <?php
    $metadata_values = array_map(function ($field_name) use ($collection) {
      $field = field_view_field('node', $collection, $field_name, ['label' => 'hidden']);

      return render($field);
    }, [
      'owner' => 'field_loop_documents_owner',
      'version' => 'field_loop_documents_version',
      'approver' => 'field_loop_documents_approver',
      'approval_date' => 'field_loop_documents_approv_date',
      'review_date' => 'field_loop_documents_review_date',
      'keyword' => 'field_keyword',
      'subject' => 'field_subject',
    ]);
    ?>

    <div class="metadata">
      <div class="item">
        <div class="label"><?php echo t('Owner') ?></div>
        <div class="value"><?php echo $metadata_values['owner']; ?></div>
      </div>

      <div class="item">
        <div class="label"><?php echo t('Version') ?></div>
        <div class="value"><?php echo $metadata_values['version']; ?></div>
      </div>

      <div class="item">
        <div class="label"><?php echo t('Approver') ?></div>
        <div class="value"><?php echo $metadata_values['approver']; ?></div>
      </div>

      <div class="item">
        <div class="label"><?php echo t('Approval date') ?></div>
        <div class="value"><?php echo $metadata_values['approval_date']; ?></div>
      </div>

      <div class="item"><!-- @author --></div>

      <div class="item">
        <div class="label"><?php echo t('Review date') ?></div>
        <div class="value"><?php echo $metadata_values['review_date']; ?></div>
      </div>
    </div>
  </body>
</html>
