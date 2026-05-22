(function () {
  'use strict';

  /* ====================================================================
     常量 & 配置
     ==================================================================== */

  var SIZE = 8;
  var CELL_SIZE = 1;
  var CELL_GAP = 0.04;
  var TOOLS = [
    { id: 'grass',  emoji: '🌿', label: '草地', terrain: 'grass', kind: null },
    { id: 'dirt',   emoji: '🟫', label: '土路', terrain: 'dirt',  kind: null },
    { id: 'water',  emoji: '💧', label: '水',   terrain: 'water', kind: null },
    { id: 'stone',  emoji: '🪨', label: '石头', terrain: 'stone', kind: null },
    { id: 'tree',   emoji: '🌳', label: '树',   terrain: 'grass', kind: 'tree' },
    { id: 'house',  emoji: '🏠', label: '房子', terrain: 'grass', kind: 'house' },
    { id: 'eraser', emoji: '🧹', label: '擦除', terrain: 'grass', kind: null }
  ];

  var TERRAIN_COLORS = {
    grass: 0x7ec850,
    dirt:  0xc4a45a,
    water: 0x4a90d9,
    stone: 0x9e9e9e
  };

  var TERRAIN_HEX = {
    grass: '#7ec850',
    dirt:  '#c4a45a',
    water: '#4a90d9',
    stone: '#9e9e9e'
  };

  /* ====================================================================
     Three.js 初始化
     ==================================================================== */

  var container = document.getElementById('three-container');

  var scene = new THREE.Scene();
  scene.background = new THREE.Color('#f5f0e8');

  var camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.5,
    50
  );

  var renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputEncoding = THREE.sRGBEncoding; // r128 uses outputEncoding
  container.appendChild(renderer.domElement);

  /* ====================================================================
     光照
     ==================================================================== */

  var ambientLight = new THREE.AmbientLight(0xfff5e8, 0.65);
  scene.add(ambientLight);

  var sunLight = new THREE.DirectionalLight(0xfff8e0, 0.85);
  sunLight.position.set(8, 14, 4);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 1024;
  sunLight.shadow.mapSize.height = 1024;
  sunLight.shadow.camera.near = 0.5;
  sunLight.shadow.camera.far = 50;
  sunLight.shadow.camera.left = -12;
  sunLight.shadow.camera.right = 12;
  sunLight.shadow.camera.top = 12;
  sunLight.shadow.camera.bottom = -12;
  sunLight.shadow.bias = -0.0001;
  sunLight.shadow.normalBias = 0.02;
  scene.add(sunLight);

  /* ====================================================================
     相机控制 (球坐标, 手动实现)
     ==================================================================== */

  var camTheta = Math.PI * 0.22;
  var camPhi = Math.PI * 0.28;
  var camRadius = 11;
  var camTarget = new THREE.Vector3(SIZE / 2 - 0.5, 0.2, SIZE / 2 - 0.5);

  function updateCamera() {
    camera.position.x = camTarget.x + camRadius * Math.sin(camPhi) * Math.cos(camTheta);
    camera.position.y = camTarget.y + camRadius * Math.cos(camPhi);
    camera.position.z = camTarget.z + camRadius * Math.sin(camPhi) * Math.sin(camTheta);
    camera.lookAt(camTarget);
  }

  /* ====================================================================
     数据模型
     ==================================================================== */

  var world = [];
  var currentSlot = 0;

  function createEmptyWorld() {
    var w = [];
    for (var x = 0; x < SIZE; x++) {
      w[x] = [];
      for (var z = 0; z < SIZE; z++) {
        w[x][z] = { terrain: 'grass', kind: null };
      }
    }
    return w;
  }

  function setCell(x, z, terrain, kind) {
    if (x < 0 || x >= SIZE || z < 0 || z >= SIZE) return;
    world[x][z] = { terrain: terrain, kind: kind };
    updateCellMesh(x, z);
    drawMinimap();
    autoSave();
  }

  /* ====================================================================
     3D 对象容器
     ==================================================================== */

  var worldGroup = new THREE.Group();
  scene.add(worldGroup);

  var cellGroups = {}; // key: "x,z" → THREE.Group

  function cellKey(x, z) { return x + ',' + z; }

  /* ====================================================================
     底座
     ==================================================================== */

  var baseGeo = new THREE.BoxGeometry(SIZE * CELL_SIZE + 0.2, 0.18, SIZE * CELL_SIZE + 0.2);
  var baseMat = new THREE.MeshPhongMaterial({ color: 0xd4c8a8 });
  var base = new THREE.Mesh(baseGeo, baseMat);
  base.position.set(SIZE / 2 - 0.5, -0.22, SIZE / 2 - 0.5);
  base.receiveShadow = true;
  base.castShadow = true;
  scene.add(base);

  /* ====================================================================
     几何体工厂
     ==================================================================== */

  function createCellGroup(x, z, terrain, kind) {
    var group = new THREE.Group();
    group.position.set(x + 0.5, 0, z + 0.5);

    // Ground block
    var groundGeo = new THREE.BoxGeometry(CELL_SIZE - CELL_GAP, 0.15, CELL_SIZE - CELL_GAP);
    var groundColor = TERRAIN_COLORS[terrain];

    if (terrain === 'water') {
      var waterMat = new THREE.MeshPhongMaterial({
        color: groundColor,
        specular: 0xffffff,
        shininess: 80,
        transparent: true,
        opacity: 0.82
      });
      var waterBlock = new THREE.Mesh(groundGeo, waterMat);
      waterBlock.position.y = -0.12;
      waterBlock.receiveShadow = true;
      group.add(waterBlock);
    } else {
      var groundMat = new THREE.MeshPhongMaterial({ color: groundColor, shininess: 5 });
      var groundBlock = new THREE.Mesh(groundGeo, groundMat);
      groundBlock.position.y = -0.075;
      groundBlock.receiveShadow = true;
      groundBlock.castShadow = true;
      group.add(groundBlock);
    }

    // Kind object
    if (kind === 'tree') {
      // Trunk
      var trunkGeo = new THREE.CylinderGeometry(0.06, 0.09, 0.55, 6);
      var trunkMat = new THREE.MeshPhongMaterial({ color: 0xb07840, shininess: 3 });
      var trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = 0.2;
      trunk.castShadow = true;
      trunk.receiveShadow = true;
      group.add(trunk);

      // Canopy
      var canopyGeo = new THREE.ConeGeometry(0.32, 0.65, 8);
      var canopyMat = new THREE.MeshPhongMaterial({ color: 0x4a9e30, shininess: 3 });
      var canopy = new THREE.Mesh(canopyGeo, canopyMat);
      canopy.position.y = 0.6;
      canopy.castShadow = true;
      canopy.receiveShadow = true;
      group.add(canopy);

      // Second layer for fullness
      var canopy2Geo = new THREE.ConeGeometry(0.26, 0.5, 8);
      var canopy2 = new THREE.Mesh(canopy2Geo, canopyMat);
      canopy2.position.y = 0.85;
      canopy2.castShadow = true;
      canopy2.receiveShadow = true;
      group.add(canopy2);

    } else if (kind === 'house') {
      // Body
      var bodyGeo = new THREE.BoxGeometry(0.55, 0.45, 0.55);
      var bodyMat = new THREE.MeshPhongMaterial({ color: 0xf5e6d0, shininess: 8 });
      var body = new THREE.Mesh(bodyGeo, bodyMat);
      body.position.y = 0.23;
      body.castShadow = true;
      body.receiveShadow = true;
      group.add(body);

      // Roof
      var roofGeo = new THREE.ConeGeometry(0.48, 0.35, 4);
      var roofMat = new THREE.MeshPhongMaterial({ color: 0xcc5540, shininess: 8 });
      var roof = new THREE.Mesh(roofGeo, roofMat);
      roof.position.y = 0.58;
      roof.rotation.y = Math.PI / 4;
      roof.castShadow = true;
      roof.receiveShadow = true;
      group.add(roof);

      // Door indicator
      var doorGeo = new THREE.BoxGeometry(0.14, 0.22, 0.04);
      var doorMat = new THREE.MeshPhongMaterial({ color: 0x8b6914, shininess: 3 });
      var door = new THREE.Mesh(doorGeo, doorMat);
      door.position.set(0, 0.11, 0.28);
      group.add(door);

    } else if (kind === 'stone') {
      // Stone is set via terrain='stone', not kind — but handle it anyway
      var stoneGeo = new THREE.BoxGeometry(0.22, 0.14, 0.18);
      var stoneMat = new THREE.MeshPhongMaterial({ color: 0x9e9e9e, shininess: 5 });
      var stone = new THREE.Mesh(stoneGeo, stoneMat);
      stone.position.y = 0.07;
      stone.rotation.y = Math.random() * Math.PI;
      stone.castShadow = true;
      stone.receiveShadow = true;
      group.add(stone);
    }

    return group;
  }

  /* ====================================================================
     场景构建
     ==================================================================== */

  function buildAllCells() {
    // Remove old cell groups
    var keys = Object.keys(cellGroups);
    for (var i = 0; i < keys.length; i++) {
      worldGroup.remove(cellGroups[keys[i]]);
    }
    cellGroups = {};

    for (var x = 0; x < SIZE; x++) {
      for (var z = 0; z < SIZE; z++) {
        var cell = world[x][z];
        var group = createCellGroup(x, z, cell.terrain, cell.kind);
        worldGroup.add(group);
        cellGroups[cellKey(x, z)] = group;
      }
    }
  }

  function updateCellMesh(x, z) {
    var key = cellKey(x, z);
    if (cellGroups[key]) {
      worldGroup.remove(cellGroups[key]);
    }
    var cell = world[x][z];
    var group = createCellGroup(x, z, cell.terrain, cell.kind);
    worldGroup.add(group);
    cellGroups[key] = group;
  }

  /* ====================================================================
     射线检测 (用于交互)
     ==================================================================== */

  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();

  // Transparent plane for raycasting
  var rayPlaneGeo = new THREE.PlaneGeometry(SIZE * CELL_SIZE, SIZE * CELL_SIZE);
  var rayPlaneMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, side: THREE.DoubleSide });
  var rayPlane = new THREE.Mesh(rayPlaneGeo, rayPlaneMat);
  rayPlane.rotation.x = -Math.PI / 2;
  rayPlane.position.set(SIZE / 2 - 0.5, 0.01, SIZE / 2 - 0.5);
  rayPlane.name = 'rayPlane';
  scene.add(rayPlane);

  function getCellFromMouse(event) {
    mouse.x = (event.clientX / container.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / container.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects([rayPlane, base]);

    if (intersects.length > 0) {
      var point = intersects[0].point;
      var cx = Math.floor(point.x);
      var cz = Math.floor(point.z);
      if (cx >= 0 && cx < SIZE && cz >= 0 && cz < SIZE) {
        return { x: cx, z: cz, point: point };
      }
    }
    return null;
  }

  /* ====================================================================
     悬停高亮
     ==================================================================== */

  var hoverIndicator = null;
  var currentHoverCell = null;

  function createHoverIndicator() {
    var geo = new THREE.BoxGeometry(CELL_SIZE - CELL_GAP, 0.03, CELL_SIZE - CELL_GAP);
    var mat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4, depthTest: false, depthWrite: false });
    hoverIndicator = new THREE.Mesh(geo, mat);
    hoverIndicator.renderOrder = 999;
    hoverIndicator.position.y = 0.02;
    hoverIndicator.visible = false;
    scene.add(hoverIndicator);
  }

  function updateHover(event) {
    var cell = getCellFromMouse(event);

    if (cell && (!currentHoverCell || currentHoverCell.x !== cell.x || currentHoverCell.z !== cell.z)) {
      currentHoverCell = cell;
      hoverIndicator.position.set(cell.x + 0.5, 0.02, cell.z + 0.5);
      hoverIndicator.visible = true;
    } else if (!cell && currentHoverCell) {
      currentHoverCell = null;
      hoverIndicator.visible = false;
    }
  }

  /* ====================================================================
     交互: 拖拽旋转 & 点击放置
     ==================================================================== */

  var isMouseDown = false;
  var hasDragged = false;
  var lastMouseX = 0;
  var lastMouseY = 0;
  var dragThreshold = 3;
  var totalDragX = 0;
  var totalDragY = 0;

  var activeTool = TOOLS[0]; // default: grass

  function onMouseDown(event) {
    if (event.target.closest('#top-panel') || event.target.closest('#tool-bar') ||
        event.target.closest('#minimap-canvas') || event.target.closest('#save-slot')) {
      return;
    }
    isMouseDown = true;
    hasDragged = false;
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
    totalDragX = 0;
    totalDragY = 0;
  }

  function onMouseMove(event) {
    updateHover(event);

    if (!isMouseDown) return;

    var dx = event.clientX - lastMouseX;
    var dy = event.clientY - lastMouseY;
    totalDragX += Math.abs(dx);
    totalDragY += Math.abs(dy);

    if (totalDragX > dragThreshold || totalDragY > dragThreshold) {
      hasDragged = true;
    }

    camTheta -= dx * 0.008;
    camPhi -= dy * 0.008;
    camPhi = Math.max(0.15, Math.min(Math.PI / 2.2, camPhi));

    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
  }

  function onMouseUp(event) {
    if (!isMouseDown) return;
    isMouseDown = false;

    if (!hasDragged) {
      var cell = getCellFromMouse(event);
      if (cell) {
        setCell(cell.x, cell.z, activeTool.terrain, activeTool.kind);
      }
    }
  }

  function onWheel(event) {
    event.preventDefault();
    camRadius += event.deltaY * 0.01;
    camRadius = Math.max(4.5, Math.min(18, camRadius));
  }

  /* ====================================================================
     程序化生成 (重置)
     ==================================================================== */

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateVillage() {
    // Step 1: 清空为草地
    for (var x = 0; x < SIZE; x++) {
      for (var z = 0; z < SIZE; z++) {
        world[x][z] = { terrain: 'grass', kind: null };
      }
    }

    // Step 2: 水塘 (2x2, 不贴边)
    var pondX = randomInt(1, SIZE - 3);
    var pondZ = randomInt(1, SIZE - 3);
    for (var px = pondX; px < pondX + 2; px++) {
      for (var pz = pondZ; pz < pondZ + 2; pz++) {
        world[px][pz] = { terrain: 'water', kind: null };
      }
    }

    // Step 3: 石堆 (2-3 组, 每组 1-3 块)
    var stoneGroups = randomInt(2, 3);
    for (var sg = 0; sg < stoneGroups; sg++) {
      var sx = randomInt(0, SIZE - 1);
      var sz = randomInt(0, SIZE - 1);
      var count = randomInt(1, 3);
      for (var sc = 0; sc < count; sc++) {
        var ox = sx + randomInt(-1, 1);
        var oz = sz + randomInt(-1, 1);
        if (ox >= 0 && ox < SIZE && oz >= 0 && oz < SIZE) {
          if (world[ox][oz].terrain === 'grass' && world[ox][oz].kind === null) {
            world[ox][oz] = { terrain: 'stone', kind: null };
          }
        }
      }
    }

    // Step 4: 树木 (3-5 棵, 随机散布)
    var treeCount = randomInt(3, 5);
    var placed = 0;
    var attempts = 0;
    while (placed < treeCount && attempts < 50) {
      var tx = randomInt(0, SIZE - 1);
      var tz = randomInt(0, SIZE - 1);
      if (world[tx][tz].terrain === 'grass' && world[tx][tz].kind === null) {
        world[tx][tz].kind = 'tree';
        placed++;
      }
      attempts++;
    }

    // Step 5: 房子 (2-3 栋, 不相邻)
    var houseCount = randomInt(2, 3);
    var housePositions = [];
    var ha = 0;
    while (ha < houseCount && attempts < 100) {
      var hx = randomInt(0, SIZE - 1);
      var hz = randomInt(0, SIZE - 1);
      if (world[hx][hz].terrain === 'grass' && world[hx][hz].kind === null) {
        var tooClose = false;
        for (var hi = 0; hi < housePositions.length; hi++) {
          var hp = housePositions[hi];
          if (Math.abs(hx - hp.x) + Math.abs(hz - hp.z) < 3) {
            tooClose = true;
            break;
          }
        }
        if (!tooClose) {
          world[hx][hz].kind = 'house';
          housePositions.push({ x: hx, z: hz });
          ha++;
        }
      }
      attempts++;
    }

    // Step 6: 土路 — 用简单的 L 形连接房子之间及房子到水塘
    var pathPoints = housePositions.slice();
    // Add pond center as a path point
    pathPoints.push({ x: pondX + 0.5, z: pondZ + 0.5, isVirtual: true });

    for (var pi = 0; pi < pathPoints.length - 1; pi++) {
      connectWithPath(
        Math.round(pathPoints[pi].x),
        Math.round(pathPoints[pi].z),
        Math.round(pathPoints[pi + 1].x),
        Math.round(pathPoints[pi + 1].z)
      );
    }

    // 重建场景
    buildAllCells();
    drawMinimap();
    autoSave();
  }

  function connectWithPath(x1, z1, x2, z2) {
    // L-shaped path: randomly choose horizontal-first or vertical-first
    var horizFirst = Math.random() > 0.5;
    if (horizFirst) {
      drawPathSegment(x1, z1, x2, z1);
      drawPathSegment(x2, z1, x2, z2);
    } else {
      drawPathSegment(x1, z1, x1, z2);
      drawPathSegment(x1, z2, x2, z2);
    }
  }

  function drawPathSegment(x1, z1, x2, z2) {
    var xStep = x1 <= x2 ? 1 : -1;
    var zStep = z1 <= z2 ? 1 : -1;
    if (x1 === x2) {
      for (var z = z1; zStep > 0 ? z <= z2 : z >= z2; z += zStep) {
        if (z >= 0 && z < SIZE && x1 >= 0 && x1 < SIZE) {
          if (world[x1][z].kind === null && world[x1][z].terrain !== 'water') {
            world[x1][z].terrain = 'dirt';
          }
        }
      }
    } else {
      for (var x = x1; xStep > 0 ? x <= x2 : x >= x2; x += xStep) {
        if (x >= 0 && x < SIZE && z1 >= 0 && z1 < SIZE) {
          if (world[x][z1].kind === null && world[x][z1].terrain !== 'water') {
            world[x][z1].terrain = 'dirt';
          }
        }
      }
    }
  }

  function clearWorld() {
    for (var x = 0; x < SIZE; x++) {
      for (var z = 0; z < SIZE; z++) {
        world[x][z] = { terrain: 'grass', kind: null };
      }
    }
    buildAllCells();
    drawMinimap();
    autoSave();
  }

  /* ====================================================================
     持久化
     ==================================================================== */

  var SAVE_KEYS = ['world3d_slot_0', 'world3d_slot_1', 'world3d_slot_2'];

  function saveWorld() {
    var data = [];
    for (var x = 0; x < SIZE; x++) {
      data[x] = [];
      for (var z = 0; z < SIZE; z++) {
        data[x][z] = { terrain: world[x][z].terrain, kind: world[x][z].kind };
      }
    }
    try {
      localStorage.setItem(SAVE_KEYS[currentSlot], JSON.stringify({ cells: data, version: 1 }));
    } catch (e) {
      // localStorage full or unavailable — silently ignore
    }
  }

  function autoSave() {
    saveWorld();
  }

  function loadWorld(slot) {
    currentSlot = slot;
    try {
      var raw = localStorage.getItem(SAVE_KEYS[slot]);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed.cells && parsed.cells.length === SIZE) {
          for (var x = 0; x < SIZE; x++) {
            world[x] = [];
            for (var z = 0; z < SIZE; z++) {
              var cell = parsed.cells[x][z];
              world[x][z] = {
                terrain: cell.terrain || 'grass',
                kind: cell.kind || null
              };
            }
          }
          return;
        }
      }
    } catch (e) {
      // Corrupted data — fall through to empty world
    }
    world = createEmptyWorld();
  }

  /* ====================================================================
     小地图
     ==================================================================== */

  var minimapCanvas = document.getElementById('minimap-canvas');
  var minimapCtx = minimapCanvas.getContext('2d');
  var minimapSize = 128;
  var cellPx = minimapSize / SIZE;

  function drawMinimap() {
    minimapCtx.clearRect(0, 0, minimapSize, minimapSize);

    // Draw terrain cells
    for (var x = 0; x < SIZE; x++) {
      for (var z = 0; z < SIZE; z++) {
        var cell = world[x][z];
        minimapCtx.fillStyle = TERRAIN_HEX[cell.terrain];
        minimapCtx.fillRect(x * cellPx, z * cellPx, cellPx, cellPx);

        // Draw kind icons
        if (cell.kind === 'tree') {
          minimapCtx.fillStyle = '#2d6e20';
          minimapCtx.beginPath();
          minimapCtx.arc(
            x * cellPx + cellPx / 2,
            z * cellPx + cellPx / 2,
            cellPx * 0.3,
            0, Math.PI * 2
          );
          minimapCtx.fill();
        } else if (cell.kind === 'house') {
          minimapCtx.fillStyle = '#cc5540';
          minimapCtx.fillRect(
            x * cellPx + cellPx * 0.2,
            z * cellPx + cellPx * 0.15,
            cellPx * 0.6,
            cellPx * 0.55
          );
          // Roof triangle
          minimapCtx.fillStyle = '#a04030';
          minimapCtx.beginPath();
          minimapCtx.moveTo(x * cellPx + cellPx * 0.1, z * cellPx + cellPx * 0.2);
          minimapCtx.lineTo(x * cellPx + cellPx * 0.5, z * cellPx + cellPx * 0.02);
          minimapCtx.lineTo(x * cellPx + cellPx * 0.9, z * cellPx + cellPx * 0.2);
          minimapCtx.fill();
        }
      }
    }
  }

  /* ====================================================================
     UI 构建 & 绑定
     ==================================================================== */

  // Tool bar
  var toolBar = document.getElementById('tool-bar');
  function renderToolBar() {
    toolBar.innerHTML = '';
    for (var i = 0; i < TOOLS.length; i++) {
      var tool = TOOLS[i];
      var btn = document.createElement('button');
      btn.className = 'tool-btn' + (tool.id === activeTool.id ? ' active' : '');
      btn.title = tool.label;
      btn.innerHTML = '<span class="emoji">' + tool.emoji + '</span><span class="label">' + tool.label + '</span>';

      (function (t) {
        btn.addEventListener('click', function () {
          activeTool = t;
          renderToolBar();
        });
      })(tool);

      toolBar.appendChild(btn);
    }
  }
  renderToolBar();

  // Save slot selector
  var saveSlotSelect = document.getElementById('save-slot');
  saveSlotSelect.addEventListener('change', function () {
    var slot = parseInt(this.value, 10);
    loadWorld(slot);
    buildAllCells();
    drawMinimap();
  });

  // Reset button
  document.getElementById('btn-reset').addEventListener('click', function () {
    generateVillage();
  });

  // Clear button
  document.getElementById('btn-clear').addEventListener('click', function () {
    clearWorld();
  });

  // Tutorial overlay
  var tutorialOverlay = document.getElementById('tutorial-overlay');
  var tutorialDismissed = localStorage.getItem('world3d_tutorial_done');
  if (tutorialDismissed) {
    tutorialOverlay.style.display = 'none';
  } else {
    setTimeout(function () {
      tutorialOverlay.classList.add('fade-out');
      localStorage.setItem('world3d_tutorial_done', '1');
      setTimeout(function () {
        tutorialOverlay.style.display = 'none';
      }, 800);
    }, 4000);
  }

  /* ====================================================================
     事件绑定
     ==================================================================== */

  window.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
  window.addEventListener('wheel', onWheel, { passive: false });

  // Touch support
  window.addEventListener('touchstart', function (e) {
    if (e.touches.length === 1) {
      var t = e.touches[0];
      onMouseDown({ clientX: t.clientX, clientY: t.clientY, target: t.target });
    }
  }, { passive: false });

  window.addEventListener('touchmove', function (e) {
    if (e.touches.length === 1) {
      var t = e.touches[0];
      onMouseMove({ clientX: t.clientX, clientY: t.clientY });
    }
    e.preventDefault();
  }, { passive: false });

  window.addEventListener('touchend', function (e) {
    onMouseUp({ clientX: lastMouseX, clientY: lastMouseY });
  });

  // Resize
  window.addEventListener('resize', function () {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  /* ====================================================================
     启动
     ==================================================================== */

  function init() {
    loadWorld(currentSlot);
    createHoverIndicator();
    buildAllCells();
    drawMinimap();
    updateCamera();
  }

  function animate() {
    requestAnimationFrame(animate);
    updateCamera();
    renderer.render(scene, camera);
  }

  init();
  animate();

})();
