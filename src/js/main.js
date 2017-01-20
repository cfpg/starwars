requirejs([
  'three.js'
], function (
  THREE
) {
  
  // Hello world!
  var crawlMesh,
      crawlGeometry,
      
      fadeOutGeometry,
      fadeOutMesh,
      
      font;
      
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 125, window.innerWidth / window.innerHeight, 1, 2500 );
  camera.position.set( 0, 0, 170 );
  var cameraTarget = new THREE.Vector3( 0, 1000, 0 );
  
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  
  var group = new THREE.Group();
  scene.add( group );
  
  var crawl = "         A NEW HOPE\n\nIt is a period of civil war.\nRebel spaceships, striking\nfrom a hidden base, have won\ntheir first victory against\nthe evil Galactic Empire.\n\n" + 
              "During the battle, Rebel\nspies managed to steal secret\nplans to the Empire's\nultimate weapon, the DEATH\nSTAR, an armored space\nstation with enough power to\ndestroy an entire planet.\n\n" +
              "Pursued by the Empire's\nsinister agents, Princess\nLeia races home aboard her\nstarship, custodian of the\nstolen plans that can save\nher people and restore\nfreedom to the galaxy....";
  
  
  // add text mesh
  function createCrawlText() {
    var opts = {
      font: font,
      size: 90,
      height: 1
    };
    
    // Create fadeOut
    fadeOutGeometry = new THREE.BoxGeometry(1, 1, 1);
    fadeOutMesh = new THREE.Mesh( fadeOutGeometry, new THREE.MeshBasicMaterial( {color: 0x00ff00} ) );
    fadeOutMesh.position.y = -100;
    fadeOutMesh.position.x = 100;
    fadeOutMesh.position.z = 1500;
    fadeOutMesh.width = window.innerWidth;
    fadeOutMesh.height = window.innerHeight / 2;
    scene.add( fadeOutMesh );
    
    crawlGeometry = new THREE.TextGeometry( crawl, opts );
    crawlGeometry.computeBoundingBox();
    crawlGeometry.computeVertexNormals();
    
    crawlMesh = new THREE.Mesh( crawlGeometry, new THREE.MeshBasicMaterial( { color: 0xf5f454 } ) ) ;
    crawlMesh.geometry.needsUpdate = true;
    crawlMesh.position.x = -200;
    crawlMesh.position.y = 0;
    crawlMesh.position.z = 0;
    
    var scale = 0.3;
    crawlMesh.scale.x = scale;
    crawlMesh.scale.y = scale;
    
    group.add(crawlMesh);
  }
  
  function refreshCrawl() {
    
    group.remove( crawlMesh );
    createCrawlText();
    
  }
  
  function loadFont() {
    var loader = new THREE.FontLoader();
    loader.load( 'fonts/SW-crawl-body-regular.typeface.json', function ( response ) {
      font = response;
      hideLoadingScreen();
      refreshCrawl();
    } );
  }
  
  function render() {
    group.position.y += 0.2;
    camera.lookAt( cameraTarget );
    renderer.clear();
    renderer.render( scene, camera );
  }
  
  function animate() {
    requestAnimationFrame( animate );
    render();
  }
  
  window.addEventListener( 'resize', onWindowResize, false );
  function onWindowResize(){
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize( window.innerWidth, window.innerHeight );
    
  }
  
  function hideLoadingScreen() {
    document.getElementById('loading').style.display = "none";
  }
  
  // Execute
  loadFont();
  animate();
  
});