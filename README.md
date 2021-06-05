# Tiny Cities

A 3D construction toy. [Play](https://tinycities.netlify.app)

Tiny Cities lets users build and share tiny dioramas of cities. The project came from a desire to learn threeJS and make a web-based 3D tool. The project also is looseley based on my fascination with Italo Calvino's book *Invisible Cities* and a desire to translate that to a toy of some kind.

# User Story

- Create a new blank "city" project
- Use mouse controls to add and remove 3D blocks form a spatial grid
- Adjust global scene variables like colors and fog density
- Create a sharable link for a scene
- View a catalog of other scenes


# Stack

I am using threeJS to handle 3D in the browser. ThreeJS exposes a large number of modules and APIs that handle things like rendering, raycasting, file loading, etc. I designed the 3D objects in Blender and can easily import them into three using the .gltf file format.

In this current prototype phase, the front end is a static HTML + JS project that relies on ES6 modules and uses Snowpack to bundle dependencies for the build.

I designed the scene's data structure to serialize to JSON and be easily handled and stored by an Express + Mongo backend. I am not passing any heavy 3D data to the server, all that is loaded when the page mounts.
