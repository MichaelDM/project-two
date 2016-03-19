// first need to define a bunch of variables to create the environment
// camera, scene and renderer are stuff I have to create. The rest is variables I create based on what I want to build. mesh is going to be the merging of cube and material
var camera, scene, renderer, cube, material, mesh;

window.onload = function(){

  // create a new 3d scene object. We'll need to add a camera, and a mesh to that scene
  scene = new THREE.Scene();
  // a 3d scene has to have a camera
  // PerspectiveCamera has parameters fov, aspect, near, far. for aspect, wanna divide the width of browser window with height of browser window.
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,1, 10000);
  // now need to position camera in 3d space
  camera.position.z=1000;
  // now need to add camera to 3d scene
  scene.add(camera);
  // now need to work on object which we can see. From doc, have a whole selection of geometries available
  cube = new THREE.CubeGeometry(300, 300, 300);
  // now need to apply material to the cube so that can see it in the scene
  material = new THREE.MeshBasicMaterial({color: 0x0000FF, wireframe: true});
  // now combining geometry and material into a mesh to add it to my scene
  mesh = new THREE.Mesh(cube, material);
  scene.add(mesh);
  // now my scene is set up, but to actually see this in the DOM, I need to set up the scene. So I need to set up my renderer.
  renderer = new THREE.WebGLRenderer();
  // //now first thing is that I need to set the size of the renderer to that of the window. It is actually the DOM element which I will need to change to my web page. If want to full browser window, do this:
  renderer.setSize(window.innerWidth, window.innerHeight);
  // append to DOM
  document.body.appendChild(renderer.domElement);
  //now we're going to animate this cube around, so need an animation loop
  animate();

};

function animate(){
  requestAnimationFrame(animate);
  // I want to take the mesh and rotate it on the x and y axis on every frame
  mesh.rotation.x +=0.02;
  mesh.rotation.y +=0.02;
  // this alone won't allow us to see the changes. We'll need to render the 3d scene. Give 3d scene and camera I want to render.
  renderer.render(scene,camera);
}
