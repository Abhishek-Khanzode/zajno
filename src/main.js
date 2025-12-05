// // import Lenis from 'lenis';
// import LocomotiveScroll from 'locomotive-scroll';
// import * as THREE from 'three';
// import vertexShader from './shaders/vertex.glsl';
// import fragmentShader from './shaders/fragment.glsl';
// import gsap from 'gsap';

// let locoScrollY = 0;
// let scroll;

// const isMobile = () => window.innerWidth <= 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

// window.onload = () => {
//   setTimeout(() => {
//     scroll = new LocomotiveScroll({
//       el: document.querySelector('[data-scroll-container]'),
//       smooth: true,
//     });

//     scroll.on('scroll', (obj) => {
//       locoScrollY = obj.scroll.y;
//     });

//     setTimeout(() => scroll.update(), 100);
//   }, 50);
// };

// // Only initialize Three.js on desktop
// if (!isMobile()) {
//   const scene = new THREE.Scene();
//   const distance = 20;
//   const fov = 2 * Math.atan((window.innerHeight / 2) / distance) * (180 / Math.PI);
//   const camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 100);
//   camera.position.z = distance;

//   const canvas = document.querySelector('.world');
//   const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
//   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//   renderer.setSize(window.innerWidth, window.innerHeight);

//   const color = 0xffffff;
//   const side = THREE.DoubleSide;

//   const raycaster = new THREE.Raycaster();
//   const mouse = new THREE.Vector2();

//   const images = document.querySelectorAll('img');
//   const planes = [];
//   images.forEach((img) => {
//     const imgBounds = img.getBoundingClientRect();
//     const texture = new THREE.TextureLoader().load(img.src);
//     const planegeo = new THREE.PlaneGeometry(imgBounds.width, imgBounds.height, 20);
//     const material = new THREE.ShaderMaterial({
//       uniforms: {
//         uTexture: { value: texture },
//         uMouse: { value: new THREE.Vector2(0.5, 0.5) },
//         uHover: { value: 0 }
//       },
//       vertexShader,
//       fragmentShader,
//     });
//     const plane = new THREE.Mesh(planegeo, material);
//     plane.position.set(imgBounds.left - window.innerWidth / 2 + imgBounds.width / 2, -imgBounds.top + window.innerHeight / 2 - imgBounds.height / 2, 0);
//     planes.push(plane);
//     scene.add(plane);
//   });

//   function updatePlanePosition() {
//     if (!planes.length) return;
//     planes.forEach((plane, index) => {
//       const image = images[index];
//       if (!plane || !image) return;
//       const bounds = image.getBoundingClientRect();
//       plane.position.set(
//         bounds.left - window.innerWidth / 2 + bounds.width / 2,
//         -bounds.top + window.innerHeight / 2 - bounds.height / 2 + locoScrollY,
//         0
//       );
//     });
//   }

//   function animate() {
//     requestAnimationFrame(animate);
//     updatePlanePosition();
//     renderer.render(scene, camera);
//   }

//   animate();

//   document.addEventListener('mousemove', (event) => {
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
//     raycaster.setFromCamera(mouse, camera);
//     const intersects = raycaster.intersectObjects(planes);

//     planes.forEach(plane => {
//       gsap.to(plane.material.uniforms.uHover, { value: 0, duration: 0.3 });
//     });

//     if (intersects.length > 0) {
//       const intersectedPlane = intersects[0];
//       const uv = intersectedPlane.uv;
//       gsap.to(intersectedPlane.object.material.uniforms.uMouse.value, { x: uv.x, y: uv.y, duration: 0.3 });
//       gsap.to(intersectedPlane.object.material.uniforms.uHover, { value: 1, duration: 0.3 });
//     }
//   });

//   window.addEventListener('resize', () => {
//     const newFov = 2 * Math.atan((window.innerHeight / 2) / distance) * (180 / Math.PI);
//     camera.fov = newFov;
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     updatePlanePosition();
//   });
// }









// STOP everything if screen is too small
if (window.innerWidth < 1024) {
  document.body.innerHTML = `
    <div style="
      width:100vw;
      height:100vh;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:24px;
      color:#000;
      padding:20px;
      text-align:center;
    ">
      Please open this website on a laptop or desktop for the full experience.
    </div>
  `;
  throw new Error("Screen too small — disabling Three.js and Locomotive Scroll.");
}

import LocomotiveScroll from 'locomotive-scroll';
import * as THREE from 'three';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';
import gsap from 'gsap';




window.addEventListener("load", () => {
  setTimeout(() => {
    scroll = new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]'),
      smooth: true,
      lerp: 0.08, // smoother = smaller value
      multiplier: 1.2, // speed
    });

    scroll.on('scroll', (obj) => {
      locoScrollY = obj.scroll.y;
    });

    setTimeout(() => scroll.update(), 300);
  }, 200);
});





// Loader Counter
function startLoader() {
  const counter = document.querySelector('.counter');
  let value = 0;
  let interval;

  function randomIncrease() {
    if (value < 99) {
      value += Math.floor(Math.random() * 7) + 1;
      value = Math.min(value, 99);
      counter.textContent = value;

      interval = setTimeout(randomIncrease, Math.floor(Math.random() * 150) + 50);
    }
  }

  randomIncrease();

  // When page finishes loading → go to 100 and play animations
  window.addEventListener("load", () => {
    clearTimeout(interval);
    counter.textContent = 100;

    runExitAnimation();
  });
}

startLoader();


// GSAP animation
function runExitAnimation() {
  const tl = gsap.timeline({
    defaults: { duration: 0.6, ease: 'power2.out' }
  });

  tl.to('.counter', { opacity: 0, duration: 0.5 })

    .to('.overlay', {
      height: 0,
      duration: 1.2,
      ease: 'power4.inOut'
    }, "-=0.2");
}




let locoScrollY = 0;
let scroll;

const isMobile = () => window.innerWidth <= 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

window.onload = () => {
  setTimeout(() => {
    scroll = new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]'),
      smooth: true,
    });

    scroll.on('scroll', (obj) => {
      locoScrollY = obj.scroll.y;
    });

    setTimeout(() => scroll.update(), 100);
  }, 50);
};

// Only initialize Three.js on desktop
if (!isMobile()) {
  const scene = new THREE.Scene();
  const distance = 20;
  const fov = 2 * Math.atan((window.innerHeight / 2) / distance) * (180 / Math.PI);
  const camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = distance;

  const canvas = document.querySelector('.world');
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const images = document.querySelectorAll('img');
  const planes = [];
  images.forEach((img) => {
    const imgBounds = img.getBoundingClientRect();
    const texture = new THREE.TextureLoader().load(img.src);
    const planegeo = new THREE.PlaneGeometry(imgBounds.width, imgBounds.height, 20);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texture },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uHover: { value: 0 }
      },
      vertexShader,
      fragmentShader,
    });
    const plane = new THREE.Mesh(planegeo, material);
    plane.position.set(
      imgBounds.left - window.innerWidth / 2 + imgBounds.width / 2,
      -imgBounds.top + window.innerHeight / 2 - imgBounds.height / 2,
      0
    );
    planes.push(plane);
    scene.add(plane);
  });

  function updatePlanePosition() {
    if (!planes.length) return;
    planes.forEach((plane, index) => {
      const image = images[index];
      if (!plane || !image) return;
      const bounds = image.getBoundingClientRect();
      plane.position.set(
        bounds.left - window.innerWidth / 2 + bounds.width / 2,
        -bounds.top + window.innerHeight / 2 - bounds.height / 2 + locoScrollY,
        0
      );
    });
  }

  function animate() {
    requestAnimationFrame(animate);
    updatePlanePosition();
    renderer.render(scene, camera);
  }

  animate();

  document.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(planes);

    planes.forEach(plane => {
      gsap.to(plane.material.uniforms.uHover, { value: 0, duration: 0.3 });
    });

    if (intersects.length > 0) {
      const intersectedPlane = intersects[0];
      const uv = intersectedPlane.uv;
      gsap.to(intersectedPlane.object.material.uniforms.uMouse.value, { x: uv.x, y: uv.y, duration: 0.3 });
      gsap.to(intersectedPlane.object.material.uniforms.uHover, { value: 1, duration: 0.3 });
    }
  });

  window.addEventListener('resize', () => {
    const newFov = 2 * Math.atan((window.innerHeight / 2) / distance) * (180 / Math.PI);
    camera.fov = newFov;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    updatePlanePosition();
  });
}









