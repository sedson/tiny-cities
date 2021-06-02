const test = `
{
   "size": 5,
   "colors": {
      "background": "hsl(28, 96%, 60%)",
      "ambient": "hsl(0, 88%, 25%)",
      "main": "hsl(0, 0%, 100%)",
      "foliage": "hsl(200, 80%, 70%)",
      "accent": "hsl(320, 50%, 70%)"
   },
   "fog": {
      "color": "hsl(0, 0%, 60%)",
      "start": "6",
      "end": "21"
   },
   "blocks": {
      "0, 0": {
         "position": {
            "x": -2,
            "z": -2
         },
         "height": 0,
         "units": [
            "Basic",
            "Basic",
            "Basic",
            "Basic",
            "Basic",
            "Park",
            "Basic",
            "Rounded"
         ]
      },
      "0, 1": {
         "position": {
            "x": -2,
            "z": -1
         },
         "height": 0,
         "units": [
            "Rounded",
            "Rounded",
            "Rounded",
            "Rounded",
            "Rounded"
         ]
      },
      "0, 2": {
         "position": {
            "x": -2,
            "z": 0
         },
         "height": 0,
         "units": [
            "Rounded",
            "Rounded",
            "Rounded"
         ]
      },
      "0, 3": {
         "position": {
            "x": -2,
            "z": 1
         },
         "height": 0,
         "units": [
            "BasicA",
            "BasicA"
         ]
      },
      "0, 4": {
         "position": {
            "x": -2,
            "z": 2
         },
         "height": 0,
         "units": [
            "BasicA",
            "BasicA"
         ]
      },
      "1, 0": {
         "position": {
            "x": -1,
            "z": -2
         },
         "height": 0,
         "units": [
            "Little",
            "Little",
            "Little",
            "Little",
            "Little",
            "Little",
            "Little",
            "Little",
            "Little",
            "Little",
            "Little",
            "Little",
            "Little",
            "Little",
            "Little"
         ]
      },
      "1, 1": {
         "position": {
            "x": -1,
            "z": -1
         },
         "height": 0,
         "units": [
            "Little",
            "Little",
            "Little"
         ]
      },
      "1, 2": {
         "position": {
            "x": -1,
            "z": 0
         },
         "height": 0,
         "units": [
            "Little",
            "Little",
            "Little",
            "Little",
            "Little",
            "Little",
            "Little",
            "Little",
            "Little",
            "Little",
            "Little",
            "Little"
         ]
      },
      "1, 3": {
         "position": {
            "x": -1,
            "z": 1
         },
         "height": 0,
         "units": [
            "BasicA",
            "BasicA",
            "Basic",
            "Basic",
            "Park",
            "Basic",
            "Park",
            "Basic",
            "Rounded",
            "Rounded"
         ]
      },
      "1, 4": {
         "position": {
            "x": -1,
            "z": 2
         },
         "height": 0,
         "units": [
            "BasicA",
            "BasicA"
         ]
      },
      "2, 0": {
         "position": {
            "x": 0,
            "z": -2
         },
         "height": 0,
         "units": [
            "Rounded"
         ]
      },
      "2, 1": {
         "position": {
            "x": 0,
            "z": -1
         },
         "height": 0,
         "units": [
            "Rounded",
            "Rounded",
            "Rounded",
            "Rounded"
         ]
      },
      "2, 2": {
         "position": {
            "x": 0,
            "z": 0
         },
         "height": 0,
         "units": [
            "Basic",
            "Basic",
            "Park",
            "Basic",
            "Basic",
            "Basic",
            "Basic",
            "Basic",
            "Basic",
            "Basic",
            "Basic",
            "Rounded",
            "Little"
         ]
      },
      "2, 3": {
         "position": {
            "x": 0,
            "z": 1
         },
         "height": 0,
         "units": [
            "Rounded",
            "Rounded",
            "Rounded",
            "Rounded"
         ]
      },
      "2, 4": {
         "position": {
            "x": 0,
            "z": 2
         },
         "height": 0,
         "units": [
            "BasicA",
            "BasicA",
            "BasicA",
            "BasicA"
         ]
      },
      "3, 0": {
         "position": {
            "x": 1,
            "z": -2
         },
         "height": 0,
         "units": [
            "BasicA"
         ]
      },
      "3, 1": {
         "position": {
            "x": 1,
            "z": -1
         },
         "height": 0,
         "units": [
            "Basic",
            "Basic",
            "Basic",
            "Basic",
            "Basic",
            "Basic",
            "Basic",
            "Park",
            "Basic",
            "Rounded"
         ]
      },
      "3, 2": {
         "position": {
            "x": 1,
            "z": 0
         },
         "height": 0,
         "units": [
            "Little",
            "Little",
            "Little",
            "Little",
            "Little"
         ]
      },
      "3, 3": {
         "position": {
            "x": 1,
            "z": 1
         },
         "height": 0,
         "units": [
            "Little",
            "Little",
            "Little",
            "Little",
            "Little",
            "Little",
            "Little",
            "Little",
            "Little"
         ]
      },
      "3, 4": {
         "position": {
            "x": 1,
            "z": 2
         },
         "height": 0,
         "units": [
            "BasicA",
            "BasicA"
         ]
      },
      "4, 0": {
         "position": {
            "x": 2,
            "z": -2
         },
         "height": 0,
         "units": [
            "Rounded",
            "Rounded",
            "Rounded",
            "Rounded"
         ]
      },
      "4, 1": {
         "position": {
            "x": 2,
            "z": -1
         },
         "height": 0,
         "units": [
            "BasicA",
            "BasicA"
         ]
      },
      "4, 2": {
         "position": {
            "x": 2,
            "z": 0
         },
         "height": 0,
         "units": [
            "Basic",
            "Basic",
            "Basic",
            "Basic",
            "Basic",
            "Basic",
            "Basic"
         ]
      },
      "4, 3": {
         "position": {
            "x": 2,
            "z": 1
         },
         "height": 0,
         "units": [
            "Little",
            "Little",
            "Little",
            "Little"
         ]
      },
      "4, 4": {
         "position": {
            "x": 2,
            "z": 2
         },
         "height": 0,
         "units": [
            "BasicA",
            "BasicA"
         ]
      }
   }
}
`
export {test}
