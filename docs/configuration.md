# Global Configuration

The constants configuration is done with the help of the [rc](https://www.npmjs.com/package/rc) node module.

Our recommended way to configure the constants is to add a `.hyper-watchrc` at the root of your project folder.

This file can be in either `JSON` (recommended) or `ini` format.

Here is an example of how this file can look like :

```JSON
{
  "port": 4000,
  "metrics": {
    "gc": {
      "expiration": 3600
    }
  }
}
```

This example would make the app be served on the 4000 port and ask the metrics to be garbage collected if they are more than one hour old.

You can find below the list of all configurable constants:

## Global

| Constant name | Type                  | Description                    |
| ------------- | --------------------- | ------------------------------ |
| port          | integer               | The port the app is running on |
| pipeline      | [pipeline](#pipeline) | Pipeline properties            |
| metrics       | [metrics](#metrics)   | Metrics properties             |
| ui            | [ui](#ui)             | User Interface properties      |

## Pipeline

| Constant name   | Type    | Description                                                                                          |
| --------------- | ------- | ---------------------------------------------------------------------------------------------------- |
| allowedLateness | integer | The allowed lateness of an event entering the pipeline, if the event comes later, it will be dropped |
| watermarkDelay  | integer | Delay removed from the current time when comparing to the event time                                 |

## Metrics

| Constant name | Type      | Description                                |
| ------------- | --------- | ------------------------------------------ |
| gc            | [GC](#GC) | Garbage collection property, see [GC](#GC) |

### GC

| Constant name | Type    | Description                                                                             |
| ------------- | ------- | --------------------------------------------------------------------------------------- |
| expiration    | integer | Duration (in seconds) without activity after which an element will be garbage collected |
| interval      | integer | Interval ( in ms ) at each the garbage collection will be called                        |

### Cache

| Constant name | Type    | Description                                  |
| ------------- | ------- | -------------------------------------------- |
| max           | integer | Maximum length of items the cache will keep. |
| maxAge        | integer | Maximum age of an item kept in cache, in ms. |

### Identity

| Constant name         | Type    | Description                                                |
| --------------------- | ------- | ---------------------------------------------------------- |
| batchInterval         | integer | Interval (in ms) at which the batch will be processed.     |
| maxConcurrentRequests | integer | Maximum number of requests which will be ran concurrently. |

### Activity

| Constant name         | Type    | Description                                                |
| --------------------- | ------- | ---------------------------------------------------------- |
| batchInterval         | integer | Interval (in ms) at which the batch will be processed.     |
| maxConcurrentRequests | integer | Maximum number of requests which will be ran concurrently. |

## UI

| Constant name | Type          | Description                          |
| ------------- | ------------- | ------------------------------------ |
| time          | [time](#time) | The time property, see [time](#time) |

### Time

| Constant name | Type           | Description                                                                                                |
| ------------- | -------------- | ---------------------------------------------------------------------------------------------------------- |
| sliderValues  | Array<integer> | An array of integer (in minutes) for the slider values and a special keyword 'auto' for the auto behaviour |
