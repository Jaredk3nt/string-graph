# String Graph

Create simple graphs in strings for use in the command line or text documents!

## Bar Graph

String graph exports a `barGraph` function for generating bar graphs from an array of numbers.

### Example

```js
const { barGraph } = require('string-graph');

const graph = barGraph([5, 10, 15], {
  yLabels: true,
  yLabelCount: 3,
});

/* Output
15     ■
       ■
       ■
       ■
       ■
10   ■ ■
     ■ ■
     ■ ■
     ■ ■
     ■ ■
 5 ■ ■ ■
   ■ ■ ■
   ■ ■ ■
   ■ ■ ■
   ■ ■ ■
*/
```

### Usage

The `barGraph` accepts two arguments.

The first argument is an array of data to be displayed in the graph. Items of this array can either be numbers or objects. The object form is required to support a `data` field with the number value of the data point, it can also accept a `label` field to add a label to the x-axis under the data bar.

The second argument is the options object that is used to cusomize the appearance of the graph. The following fields are supported for this graph:

| Name            | Type    | Description                                                                                                                                                                                | Default                                                   |
| --------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| `height`        | number  | Describes the max character height of the graph                                                                                                                                            | The maximum value in your data or `50` whichever is lower |
| `token`         | string  | The character to be used to show data in the graph                                                                                                                                         | `■`                                                       |
| `lineEnding`    | string  | The string to place at each line break to support multiple systems                                                                                                                         | `"\n"`                                                    |
| `columnWidth`   | number  | The number of characters wide each bar in the graph should be                                                                                                                              | `1`                                                       |
| `columnSpacing` | number  | The number of characters used between each bar in the graph                                                                                                                                | `1`                                                       |
| `yLabels`       | boolean | Whether or not to show y-axis labels                                                                                                                                                       | `false`                                                   |
| `yLabelCount`   | number  | How many y-axis labels to show on the graph. If this number and the height are not divisible it will round and may not be exact.                                                           | `5`                                                       |
| `unit`          | string  | A unit to display next to the y-axis labels                                                                                                                                                | `''`                                                      |
| `xLabelWidth`   | number  | The character width allowed for the x-axis labels, labels longer than this width will wrap to the next line. This will add spacing to the bars in addition to the existing `columnSpacing` | `5`                                                       |
