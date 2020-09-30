# Loop notification

* Notification lets a user define that they want to get notifications
  on a given question.
* When signing up for notification on a question they will get e-mail
  for a notification and it will be visible in the menu notifications.
  When visiting a question the notification will be available.
* Provides message entities
* Provides rules components related to notifications
* Provides a list of users to receive notifications. Based on their
  flagging of content types.
* Provides an alter hook to alter the list of users who should receive
  messages on node add/edit and comment add.
* Provides admin page for configuring notifications on content types.

## Using SMTP and HTML mails

If you're using the smtp module to send notification emails containing HTML, you
must install the `htmlmail` module and then go to
`/admin/config/system/mailsystem` and select `LoopNotificationHtmlMail` for both
"Site-wide default MailSystemInterface class" and "Mime Mail module class".

See [https://www.drupal.org/node/1200142](https://www.drupal.org/node/1200142)
for details.
