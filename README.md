# Clock3d.js

> Import:
```
import Clock from 'clock3d';
import 'clock3d/style.css';
```
You can override the styles for yourself

> Parameters: Object

key | allowable values
------------- | -------------
perspective  | bool, class "perspective" will be applied to the root
direction  | "up" or "down"
root | DOM element

> Example initialization:
```
const root = document.querySelector(".clock");
const clock = new Clock({root, perspective: true, direction: "up"});
```