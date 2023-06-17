import * as THREE from 'three';
import * as CANNON from 'cannon';
// Import the PropulsionSimulator class


export default class PropulsionSimulator {
    constructor(scene, propulsionZone, renderer, camera) {
        this.scene = scene;
        this.world = new CANNON.World();
        this.propulsionZone = propulsionZone;
        this.boxBodies = [];
        this.renderer = renderer;
        this.camera = camera;
        this.initialCameraPosition = camera.position.clone(); // Store the initial position of the camera
        this.animationFrameId = null;
        this.shouldMoveCamera = false;
        this.cameraSpeed = 0;
        this.cameraAcceleration = -0.0025;
        this.lookAtTarget = new THREE.Vector3(0, -1000, 0);
        this.lookAtLerpFactor = 0;
        this.startTime = null; // Initialize start time
        this.lookAtDelay = 9000; // Time in ms to delay lookAt change
        this.back = false;
        this.shouldBounceCamera = false; // New flag for controlling the bounce
        this.bounceStart = null; // Start time for the bounce
        this.bounceDuration = 4000; // Duration of the bounce in milliseconds
    }

    init() {
        // Configurar el mundo físico
        this.world = new CANNON.World();
        this.world.gravity.set(0, 5, 0); // Gravedad en la dirección -y

        // Crear la referencia de la posición de generación de las cajas
        const boxGenerationPosition = new THREE.Vector3(0, -0.25, 0);

        // Configurar cuerpo físico de propulsionZone
        const propulsionZoneBody = new CANNON.Body({
            mass: 0, // mass == 0 hace que el cuerpo sea estático
            position: new CANNON.Vec3(this.propulsionZone.position.x, this.propulsionZone.position.y, this.propulsionZone.position.z),
            shape: new CANNON.Box(new CANNON.Vec3(1, 0.25, 1)) // los parámetros son la mitad de los tamaños en x, y, z
        });
        this.world.addBody(propulsionZoneBody);

        // Crear y añadir cuerpos de caja justo debajo de la posición de generación
        for (let i = 0; i < 10; i++) {
            this.createBoxAtPosition(boxGenerationPosition.x, boxGenerationPosition.y, boxGenerationPosition.z);
        }
    }

    createBoxAtPosition(x, y, z) {
        let box = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.5, 0.5),
            new THREE.MeshBasicMaterial({ color: 'white' })
        );
        box.position.set(x + (Math.random() * 2 - 1), y, z + (Math.random() * 2 - 1)); // Posiciones aleatorias alrededor de la posición dada
        this.scene.add(box);

        // Agrega un borde gris a cada cubo
        const edges = new THREE.EdgesGeometry(box.geometry);
        const edgeLines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000 })); // Gris
        box.add(edgeLines);

        let boxBody = new CANNON.Body({
            mass: 1,
            position: new CANNON.Vec3(box.position.x, box.position.y, box.position.z),
            shape: new CANNON.Box(new CANNON.Vec3(0.25, 0.25, 0.25))
        });
        this.world.addBody(boxBody);
        this.boxBodies.push({ threeObject: box, cannonBody: boxBody });
    }



    animate() {
        console.log(this.camera.position.y)

        // Avanzar la simulación física
        this.world.step(1 / 60);

        // Actualizar posiciones de los cubos en Three.js para coincidir con Cannon.js
        for (let box of this.boxBodies) {
            box.threeObject.position.copy(box.cannonBody.position);
            box.threeObject.quaternion.copy(box.cannonBody.quaternion);
        }

        // Generar más cubos de forma continua justo debajo de la posición de generación
        if (this.boxBodies.length < 100) {
            const { x, y, z } = this.propulsionZone.position;
            this.createBoxAtPosition(x, y - 0.25, z);
        }

        // Eliminar cubos que están por debajo de una cierta posición relativa en Y
        const relativePositionThreshold = this.propulsionZone.position.y - 30;
        for (let i = this.boxBodies.length - 1; i >= 0; i--) {
            if (this.boxBodies[i].threeObject.position.y < relativePositionThreshold || this.boxBodies[i].threeObject.position.y > 270) {
                this.scene.remove(this.boxBodies[i].threeObject);
                this.world.remove(this.boxBodies[i].cannonBody);
                this.boxBodies.splice(i, 1);
            }
        }

        // Apply the bounce effect
        if (this.shouldBounceCamera) {
            // Calculate the elapsed time since the bounce started
            let t = (Date.now() - this.bounceStart) / this.bounceDuration;

            // Use a simple quadratic ease-in-out function for the bounce
            this.camera.position.y = -20 * t * (2 - t);

            if (t >= 1) {
                // If the bounce is finished, reset the camera position and stop bouncing
                this.camera.position.y = -20;
                this.shouldBounceCamera = false;
            }
        }



        // Move the camera down in each frame if shouldMoveCamera is true
        if (this.shouldMoveCamera && !this.shouldBounceCamera) {

            this.camera.position.y -= this.cameraSpeed;
            this.cameraSpeed += this.cameraAcceleration;

            setTimeout(() => {
                this.cameraAcceleration = +0.01;
                this.cameraSpeed = +0.05;
                this.back = true;
            }, 8000);

            if (this.back && this.camera.position.y <= 0) {
                this.cameraAcceleration = 0;
                this.cameraSpeed = 0;
                this.shouldMoveCamera = false;
            }

        }



        if (this.startTime !== null && Date.now() > this.startTime + this.lookAtDelay) {
            if (this.lookAtLerpFactor <= 1) {
                // Calculate the new rotation quaternion
                const targetQuaternion = new THREE.Quaternion().setFromRotationMatrix(
                    new THREE.Matrix4().lookAt(this.camera.position, this.lookAtTarget, this.camera.up)
                );
                this.camera.quaternion.slerp(targetQuaternion, this.lookAtLerpFactor);
                this.lookAtLerpFactor += 0.01; // Adjust the speed as necessary
            }
        }

        // Renderizar la escena
        this.renderer.render(this.scene, this.camera);

        this.animationFrameId = requestAnimationFrame(() => this.animate());

    }


    start() {
        this.reset();
        this.init();
        if (this.animationFrameId === null) {
            this.bounceStart = Date.now(); // Start the bounce immediately
            this.shouldBounceCamera = true;
            this.startTime = Date.now(); // Set start time
            this.animate();
        } else {
            console.warn('Simulation already running');
        }
        setTimeout(() => {
            this.shouldMoveCamera = true;
            this.cameraSpeed = 0; // Reset camera speed when start
        }, 4000); // Wait 4 seconds before moving the camera
    }

    stop() {
        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
            this.reset();  // reset the simulation when stopped
        } else {
            console.warn('Simulation not running');
        }
        this.shouldMoveCamera = false;
    }

    zoomOut(distance) {
        // Assumes that the camera looks towards the origin from a positive z value.
        // Adjust as necessary if your setup is different.
        this.camera.position.z += distance;
    }

    reset() {
        // Remove all boxes from the scene and the world
        for (let i = this.boxBodies.length - 1; i >= 0; i--) {
            this.scene.remove(this.boxBodies[i].threeObject);
            this.world.remove(this.boxBodies[i].cannonBody);
        }
        // Clear the box bodies array
        this.boxBodies = [];

        // Reset the camera position
        this.camera.position.copy(this.initialCameraPosition);
    }

}