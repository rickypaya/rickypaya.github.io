import * as THREE from 'three';

//setting the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/ window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("canvas"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(20);

//geometry
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshBasicMaterial( {color: 0xFF6347, wireframe: true});
//basic materials do not need light source
const torus = new THREE.Mesh(geometry, material);

scene.add(torus)


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    
}

animate();
