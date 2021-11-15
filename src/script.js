import "./style.css";
import * as THREE from "three";


import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

let container;

			let camera, scene, renderer;

			let pointLight;

			init();
			animate();

			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 85, window.innerWidth / window.innerHeight, 1, 5000 );
				camera.position.z = 2000;

				//cubemap
				const path = 'cube/';
				const format = '.jpg';
				const urls = [
					path + 'right' + format, path + 'left' + format,
					path + 'top' + format, path + 'down' + format,
					path + 'front' + format, path + 'back' + format
				];

				const reflectionCube = new THREE.CubeTextureLoader().load( urls );
				const refractionCube = new THREE.CubeTextureLoader().load( urls );
				refractionCube.mapping = THREE.CubeRefractionMapping;

				scene = new THREE.Scene();
				scene.background = reflectionCube;

				//lights
				const ambient = new THREE.AmbientLight( 0xffffff );
				scene.add( ambient );

				pointLight = new THREE.PointLight( 0xffffff, 2 );
				scene.add( pointLight );

				//materials
				const cubeMaterial3 = new THREE.MeshLambertMaterial( { color: 0xff6600, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 0.3 } );
				const cubeMaterial2 = new THREE.MeshLambertMaterial( { color: 0xffee00, envMap: refractionCube, refractionRatio: 0.95 } );
				const cubeMaterial1 = new THREE.MeshLambertMaterial( { color: 0xffffff, envMap: reflectionCube } );

				
				//renderer
				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				//controls
				const controls = new OrbitControls( camera, renderer.domElement );
				controls.enableZoom = false;
				controls.enablePan = false;
				controls.minPolarAngle = Math.PI / 4;
				controls.maxPolarAngle = Math.PI / 1.5;

			

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				requestAnimationFrame( animate );
				render();

			}

			function render() {

				renderer.render( scene, camera );
	

			}
