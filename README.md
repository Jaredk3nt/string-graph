# String Graph

Create simple graphs in strings for use in the command line or text documents!

## Bar Graph

String graph exports a `barGraph` function for generating bar graphs from an array of numbers.

### Example

```js
const { barGraph } = require("string-graph");

const graph = barGraph([5, 10, 15], {
  yLabels: true,
  yLabelCount: 3
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

The `barGraph` accepts two arguments: `data` and `options`. Data should be an array of numbers and will be output in the graph in the order given. The options arg allows you to customize the appearance of the graph and contains the following fields:

| Name            | Type    | Description                                                        | Default                                                   |
| --------------- | ------- | ------------------------------------------------------------------ | --------------------------------------------------------- |
| `height`        | number  | Describes the max character height of the graph                    | The maximum value in your data or `50` whichever is lower |
| `token`         | string  | The character to be used to show data in the graph                 | `■`                                                       |
| `lineEnding`    | string  | The string to place at each line break to support multiple systems | `"\n"`                                                    |
| `columnWidth`   | number  | The number of characters wide each bar in the graph should be      | `1`                                                       |
| `columnSpacing` | number  | The number of characters used between each bar in the graph        | `1`                                                       |
| `yLabels`       | boolean | Whether or not to show y-axis labels                               | `false`                                                   |
| `yLabelCount`   | number  | How many y-axis labels to show on the graph                        | `5`                                                       |
