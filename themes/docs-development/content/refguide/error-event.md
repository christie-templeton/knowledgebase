---
title: "Error Event"
parent: "events"
menu_order: 3
tags: ["studio pro"]
---

{{% alert type="info" %}}
This activity can only be used in microflows, not in nanoflows.
{{% /alert %}}

An error event defines a location where the microflow will stop and throw an error that occurred earlier. If you call a microflow, you may want to know whether any errors occurred within the microflow or not. This event throws the error again, so the caller of the microflow can catch them. All database actions within the current transaction will be rolled back.

{{% alert type="warning" %}}

You can only use an Error Event if an error is in scope: Studio Pro does not accept it if you connect the normal execution flow to an error event, because there would not be an error to rethrow.

{{% /alert %}}{{% alert type="info" %}}

In this example, an error is caught while committing an object to the database, and is rethrown at the error event. From outside the microflow, you can catch this error with custom error handling and react appropriately. So you can implement your error handling on multiple levels.

![](attachments/16713807/16843954.png)

{{% /alert %}}