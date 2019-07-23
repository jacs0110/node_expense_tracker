const Handlebars = require('handlebars')

Handlebars.registerHelper('pieChart', function (data, options) {
  let testData = [
    {
      "label": "Spiders",
      "value": 2,
      "color": "#207f32"
    },
    {
      "label": "Mother-in-laws",
      "value": 10,
      "color": "#6ada6a"
    },
    {
      "label": "Sharks",
      "value": 8,
      "color": "#2181c1"
    },
    {
      "label": "Alien invasion",
      "value": 8,
      "color": "#7c9058"
    }
  ]
  return testData
})

Handlebars.registerHelper('if_even', function (value, options) {
  console.log('handlebars below:');
  console.log(value); // value: 2
  // console.log(this);
  console.log(options.fn(this)); // fn(this): 2是偶数
  // if ((value.num % 2) == 0) {
  //   console.log('%2==0')
  //   return options.fn(this);
  // } else {
  //   console.log('%2!=0')
  //   return options.inverse(this);
  // }
  return value.num % 2 + 99
});