// Scene, Camera, ebong Renderer setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const container = document.getElementById('canvas-container');

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xff3333, 2);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);

// Orbit Controls (Mouse Rotation/Zoom)
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Camera Initial Position
camera.position.set(0, 2, 5);

// Default 3D Placeholder (Real model load na hawya porjonto dekhar jonno)
const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
const material = new THREE.MeshStandardMaterial({ color: 0xff3333, metalness: 0.8, roughness: 0.2 });
const sampleObject = new THREE.Mesh(geometry, material);
scene.add(sampleObject);

/* Real 3D Bike Model Load Korte (GLTF/GLB Format):
 Mesh.gltf file thakle nicher comment-out kora code un-comment korun:

 const loader = new THREE.GLTFLoader();
 loader.load('path/to/bike_model.glb', (gltf) => {
   scene.remove(sampleObject); // Remove placeholder
   const bike = gltf.scene;
   bike.scale.set(1.5, 1.5, 1.5);
   scene.add(bike);
 });
*/

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  
  // Rotating placeholder continuously
  if (sampleObject) sampleObject.rotation.y += 0.005;
  
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Window Resize Handling
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
