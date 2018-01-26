# Clock3d.js

> Import:
```
import Clock from 'clock3d';
import from 'clock3d/style.css';
```
You can override the styles for yourself

> Parameters: Object

key | allowable values
------------- | -------------
perspective  | bool
direction  | "up" or "down"
root | DOM element

> Example initialization:
```
const root = document.querySelector(".clock");
const clock = new Clock({root, perspective: true, direction: "up"});
```