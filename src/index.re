open Reprocessing;

let fringePos = 30.;

let playerSpeed = 150.;

let mapSize = 20;

let mapSizePx = float_of_int(mapSize * 64);

let bulletSpeed = 600.;

let scale = 2.;

type vec2T = {
  x: float,
  y: float
};

type bulletT = {
  pos: vec2T,
  direction: vec2T,
  time: float,
  moveBullet: bulletT => vec2T,
  damage: float
};

type achievementStateT =
  | Locked
  | Unlocked;

type enemyKindT =
  | NormalZ
  | BigZ
  | TallZ;

type enemyT = {
  maxHealth: float,
  health: float,
  pos: vec2T,
  error: vec2T,
  speed: float,
  damage: float,
  kind: enemyKindT
};

type gunKindT =
  | Pistol
  | Rifle
  | AlienGun1
  | AlienGun2
  | Shotgun
  | Machinegun
  | LaserGun;

let gunTexPos = (kind) =>
  switch kind {
  | Machinegun => (330, 0)
  | Pistol => (587, 0)
  | Shotgun => (650, 0)
  | AlienGun1 => (64, 0)
  | AlienGun2 => (772, 0)
  | LaserGun => (712, 0)
  | Rifle => (0, 0)
  };

type crateT = {
  pos: vec2T,
  kind: gunKindT
};

type gunT = {
  fireRate: float,
  lastShotTime: float,
  ammunition: int,
  maxAmmunition: int,
  color: colorT,
  keyToggle: Reprocessing_Events.keycodeT,
  fire: (stateT, float, Reprocessing_Events.keycodeT) => stateT,
  kind: gunKindT
}
and achievementT = {
  state: achievementStateT,
  condition: (stateT, glEnvT) => bool,
  message: string
}
and stateT = {
  pos: vec2T,
  guns: list(gunT),
  equippedGun: int,
  playerBullets: list(bulletT),
  achievements: list(achievementT),
  crates: list(crateT),
  mainFont: fontT,
  mainSpriteSheet: imageT,
  enemies: list(enemyT),
  waveNum: int,
  nextWaveCountdown: float,
  enemiesKilled: int,
  numberOfBulletsFired: int,
  damageDone: float,
  stepTaken: float,
  elapsedTime: float
};

let add = (v1, v2) => {x: v1.x +. v2.x, y: v1.y +. v2.y};

let makeDefaultFire =
    (bulletSpeed, damage, state, deltaTime, direction: Reprocessing_Events.keycodeT) => {
  let bulletSpeed = bulletSpeed *. deltaTime;
  let dir =
    switch direction {
    | Up => {x: 0., y: -. bulletSpeed}
    | Down => {x: 0., y: bulletSpeed}
    | Left => {x: -. bulletSpeed, y: 0.}
    | Right => {x: bulletSpeed, y: 0.}
    | _ => assert false
    };
  let moveBullet = (bullet: bulletT) => add(bullet.pos, bullet.direction);
  {
    ...state,
    numberOfBulletsFired: state.numberOfBulletsFired + 1,
    guns:
      List.mapi(
        (i, gun) =>
          if (i === state.equippedGun) {
            {...gun, ammunition: max(gun.ammunition - 1, 0), lastShotTime: state.elapsedTime}
          } else {
            gun
          },
        state.guns
      ),
    playerBullets:
      List.nth(state.guns, state.equippedGun).ammunition > 0 ?
        [
          {pos: {x: state.pos.x, y: state.pos.y}, direction: dir, moveBullet, time: 0., damage},
          ...state.playerBullets
        ] :
        state.playerBullets
  }
};

let makeTripleShotGunFire =
    (bulletSpeed, otherSpeed, damage, state, deltaTime, direction: Reprocessing_Events.keycodeT) => {
  let otherSpeed = otherSpeed *. deltaTime;
  let bulletSpeed = bulletSpeed *. deltaTime;
  let dir1 =
    switch direction {
    | Up => {x: -. otherSpeed, y: -. bulletSpeed}
    | Down => {x: otherSpeed, y: bulletSpeed}
    | Left => {x: -. bulletSpeed, y: otherSpeed}
    | Right => {x: bulletSpeed, y: -. otherSpeed}
    | _ => assert false
    };
  let dir2 =
    switch direction {
    | Up => {x: 0., y: -. bulletSpeed}
    | Down => {x: 0., y: bulletSpeed}
    | Left => {x: -. bulletSpeed, y: 0.}
    | Right => {x: bulletSpeed, y: 0.}
    | _ => assert false
    };
  let dir3 =
    switch direction {
    | Up => {x: otherSpeed, y: -. bulletSpeed}
    | Down => {x: -. otherSpeed, y: bulletSpeed}
    | Left => {x: -. bulletSpeed, y: -. otherSpeed}
    | Right => {x: bulletSpeed, y: otherSpeed}
    | _ => assert false
    };
  let moveBullet = (bullet: bulletT) => add(bullet.pos, bullet.direction);
  {
    ...state,
    numberOfBulletsFired: state.numberOfBulletsFired + 3,
    guns:
      List.mapi(
        (i, gun) =>
          if (i === state.equippedGun) {
            {...gun, ammunition: max(gun.ammunition - 1, 0), lastShotTime: state.elapsedTime}
          } else {
            gun
          },
        state.guns
      ),
    playerBullets:
      List.nth(state.guns, state.equippedGun).ammunition > 0 ?
        [
          {pos: {x: state.pos.x, y: state.pos.y}, direction: dir1, moveBullet, time: 0., damage},
          {pos: {x: state.pos.x, y: state.pos.y}, direction: dir2, moveBullet, time: 0., damage},
          {pos: {x: state.pos.x, y: state.pos.y}, direction: dir3, moveBullet, time: 0., damage},
          ...state.playerBullets
        ] :
        state.playerBullets
  }
};

let makeSineFire =
    (bulletSpeed, otherSpeed, damage, state, deltaTime, direction: Reprocessing_Events.keycodeT) => {
  let otherSpeed = otherSpeed *. deltaTime;
  let bulletSpeed = bulletSpeed *. deltaTime;
  let dir1 =
    switch direction {
    | Up => {x: -. otherSpeed, y: -. bulletSpeed}
    | Down => {x: otherSpeed, y: bulletSpeed}
    | Left => {x: -. bulletSpeed, y: otherSpeed}
    | Right => {x: bulletSpeed, y: -. otherSpeed}
    | _ => assert false
    };
  let dir2 =
    switch direction {
    | Up => {x: 0., y: -. bulletSpeed}
    | Down => {x: 0., y: bulletSpeed}
    | Left => {x: -. bulletSpeed, y: 0.}
    | Right => {x: bulletSpeed, y: 0.}
    | _ => assert false
    };
  let dir3 =
    switch direction {
    | Up => {x: otherSpeed, y: -. bulletSpeed}
    | Down => {x: -. otherSpeed, y: bulletSpeed}
    | Left => {x: -. bulletSpeed, y: -. otherSpeed}
    | Right => {x: bulletSpeed, y: otherSpeed}
    | _ => assert false
    };
  let moveBullet = (bullet: bulletT) => {
    let pos = add(bullet.pos, bullet.direction);
    let perpendicular = {x: -. bullet.direction.y, y: bullet.direction.x};
    let perpendicularSize =
      sqrt(perpendicular.x *. perpendicular.x +. perpendicular.y *. perpendicular.y);
    let perpendicular = {
      x: perpendicular.x /. perpendicularSize,
      y: perpendicular.y /. perpendicularSize
    };
    let norm = cos(bullet.time /. 5.);
    let offset = {x: perpendicular.x *. norm *. 3., y: perpendicular.y *. norm *. 3.};
    add(pos, offset)
  };
  {
    ...state,
    numberOfBulletsFired: state.numberOfBulletsFired + 3,
    guns:
      List.mapi(
        (i, gun) =>
          if (i === state.equippedGun) {
            {...gun, ammunition: max(gun.ammunition - 1, 0), lastShotTime: state.elapsedTime}
          } else {
            gun
          },
        state.guns
      ),
    playerBullets:
      List.nth(state.guns, state.equippedGun).ammunition > 0 ?
        [
          {pos: {x: state.pos.x, y: state.pos.y}, direction: dir1, moveBullet, time: 0., damage},
          {pos: {x: state.pos.x, y: state.pos.y}, direction: dir2, moveBullet, time: 0., damage},
          {pos: {x: state.pos.x, y: state.pos.y}, direction: dir3, moveBullet, time: 0., damage},
          ...state.playerBullets
        ] :
        state.playerBullets
  }
};

let makeRifleFire =
    (bulletSpeed, damage, state, deltaTime, direction: Reprocessing_Events.keycodeT) => {
  let bulletSpeed = bulletSpeed *. deltaTime;
  let dir2 =
    switch direction {
    | Up => {x: 0., y: -. bulletSpeed}
    | Down => {x: 0., y: bulletSpeed}
    | Left => {x: -. bulletSpeed, y: 0.}
    | Right => {x: bulletSpeed, y: 0.}
    | _ => assert false
    };
  let moveBullet = (bullet: bulletT) => add(bullet.pos, bullet.direction);
  {
    ...state,
    numberOfBulletsFired: state.numberOfBulletsFired + 3,
    guns:
      List.mapi(
        (i, gun) =>
          if (i === state.equippedGun) {
            {...gun, ammunition: max(gun.ammunition - 1, 0), lastShotTime: state.elapsedTime}
          } else {
            gun
          },
        state.guns
      ),
    playerBullets:
      List.nth(state.guns, state.equippedGun).ammunition > 0 ?
        [
          {pos: {x: state.pos.x, y: state.pos.y}, direction: dir2, moveBullet, time: 0., damage},
          {
            pos: add(add({x: state.pos.x, y: state.pos.y}, dir2), dir2),
            direction: dir2,
            moveBullet,
            time: 0.,
            damage
          },
          {
            pos: add(add(add(add({x: state.pos.x, y: state.pos.y}, dir2), dir2), dir2), dir2),
            direction: dir2,
            moveBullet,
            time: 0.,
            damage
          },
          ...state.playerBullets
        ] :
        state.playerBullets
  }
};

let makeShotGunFire =
    (bulletSpeed, otherSpeed, damage, state, deltaTime, direction: Reprocessing_Events.keycodeT) =>
  if (List.nth(state.guns, state.equippedGun).ammunition > 0) {
    let otherSpeed = otherSpeed *. deltaTime;
    let bulletSpeed = bulletSpeed *. deltaTime;
    let moveBullet = (bullet: bulletT) => add(bullet.pos, bullet.direction);
    let rec recur = (acc, i) =>
      if (i < 0) {
        acc
      } else {
        let otherSpeed = Utils.randomf(-. otherSpeed, otherSpeed);
        let bulletSpeed = Utils.randomf(0.5, 1.) *. bulletSpeed;
        let dir =
          switch direction {
          | Up => {x: -. otherSpeed, y: -. bulletSpeed}
          | Down => {x: otherSpeed, y: bulletSpeed}
          | Left => {x: -. bulletSpeed, y: otherSpeed}
          | Right => {x: bulletSpeed, y: -. otherSpeed}
          | _ => assert false
          };
        recur(
          [
            {pos: {x: state.pos.x, y: state.pos.y}, direction: dir, moveBullet, time: 0., damage},
            ...acc
          ],
          i - 1
        )
      };
    let newBullets = recur([], Utils.random(3, 10));
    {
      ...state,
      numberOfBulletsFired: state.numberOfBulletsFired + List.length(newBullets),
      guns:
        List.mapi(
          (i, gun) =>
            if (i === state.equippedGun) {
              {...gun, ammunition: max(gun.ammunition - 1, 0), lastShotTime: state.elapsedTime}
            } else {
              gun
            },
          state.guns
        ),
      playerBullets: newBullets @ state.playerBullets
    }
  } else {
    state
  };

let generateGun: unit => gunT = {
  let keyCount = ref(0);
  let keySet = ref([]);
  let getNextGunKey: unit => Reprocessing_Events.keycodeT =
    () => {
      keyCount := keyCount^ + 1;
      switch keyCount^ {
      | 1 => Num_1
      | 2 => Num_2
      | 3 => Num_3
      | 4 => Num_4
      | 5 => Num_5
      | 6 => Num_6
      | 7 => Num_7
      | 8 => Num_8
      | 9 => Num_9
      | _ =>
        let key = ref(Utils.random(0, 10));
        while (List.mem(key^, keySet^)) {
          key := Utils.random(0, 10)
        };
        keySet := [key^, ...keySet^];
        switch key^ {
        | 0 => T
        | 1 => Y
        | 2 => U
        | 3 => I
        | 4 => O
        | 5 => P
        | 6 => K
        | 7 => J
        | 8 => H
        | 9 => G
        | _ => assert false
        }
      }
    };
  () => {
    let keyToggle = getNextGunKey();
    let maxAmmunition = Utils.randomf(0., 1.);
    let damage = Utils.randomf(0., 1.);
    let fireRate = Utils.randomf(0., 1.);
    let (kind, fire, fireRate, maxAmmunition) =
      switch (Utils.random(0, 6)) {
      | 0 => (
          Pistol,
          makeDefaultFire(bulletSpeed, Utils.lerpf(400., 1000., damage)),
          Utils.lerpf(0.5, 0.3, fireRate),
          Utils.lerp(1, 10, maxAmmunition)
        )
      | 1 => (
          AlienGun2,
          makeTripleShotGunFire(
            bulletSpeed,
            Utils.randomf(50., 200.),
            Utils.lerpf(400., 700., damage)
          ),
          Utils.lerpf(0.7, 0.5, fireRate),
          Utils.lerp(1, 10, maxAmmunition)
        )
      | 2 => (
          Rifle,
          makeRifleFire(bulletSpeed, Utils.lerpf(400., 700., damage)),
          Utils.lerpf(0.7, 0.5, fireRate),
          Utils.lerp(1, 10, maxAmmunition)
        )
      | 3 => (
          Shotgun,
          makeShotGunFire(bulletSpeed, Utils.randomf(50., 200.), Utils.lerpf(400., 1000., damage)),
          Utils.lerpf(2.0, 1.2, fireRate),
          Utils.lerp(2, 6, maxAmmunition)
        )
      | 4 => (
          Machinegun,
          makeDefaultFire(bulletSpeed, Utils.lerpf(100., 400., damage)),
          Utils.lerpf(0.1, 0.04, fireRate),
          Utils.lerp(5, 30, maxAmmunition)
        )
      | _ => (
          AlienGun1,
          makeSineFire(
            bulletSpeed /. 2.,
            Utils.randomf(50., 200.),
            Utils.lerpf(400., 1000., damage)
          ),
          Utils.lerpf(0.7, 0.5, fireRate),
          Utils.lerp(1, 10, maxAmmunition)
        )
      };
    {
      ammunition: maxAmmunition,
      maxAmmunition,
      fireRate,
      lastShotTime: 0.,
      keyToggle,
      fire,
      kind,
      color: Constants.white
    }
  }
};

let generateAchievements = () => {
  let rec loop = (acc, i) =>
    if (i <= 0) {
      [
        {
          state: Locked,
          condition: (state, _env) => state.stepTaken >= 1000.,
          message: "You walked your first 100 steps!"
        },
        ...acc
      ]
    } else {
      loop(
        [
          {
            state: Locked,
            condition: (state, _env) => state.stepTaken >= 10000. *. float_of_int(i),
            message: Printf.sprintf("You walked more than %d steps!", 1000 * i)
          },
          ...acc
        ],
        i - 1
      )
    };
  let achievements = loop([], 25);
  let rec loop = (acc, i) =>
    if (i <= 0) {
      acc
    } else {
      loop(
        [
          {
            state: Locked,
            condition: (state, _env) => state.numberOfBulletsFired >= 100 * i,
            message: Printf.sprintf("You fired more than %d bullets!", 100 * i)
          },
          ...acc
        ],
        i - 1
      )
    };
  let achievements = loop(achievements, 25);
  let rec loop = (acc, i) =>
    if (i <= 0) {
      [
        {
          state: Locked,
          condition: (state, _env) => state.enemiesKilled >= 1,
          message: "You killed your first zombie!"
        },
        ...acc
      ]
    } else {
      loop(
        [
          {
            state: Locked,
            condition: (state, _env) => state.enemiesKilled >= Utils.pow(2, i),
            message: Printf.sprintf("You killed more than %d zombies!", 2 * Utils.pow(i, 2))
          },
          ...acc
        ],
        i - 1
      )
    };
  loop(achievements, 25)
};

let drawKey = (x, y, gun, state, env) => {
  let body =
    switch gun.keyToggle {
    | Num_1 => "1"
    | Num_2 => "2"
    | Num_3 => "3"
    | Num_4 => "4"
    | Num_5 => "5"
    | Num_6 => "6"
    | Num_7 => "7"
    | Num_8 => "8"
    | Num_9 => "9"
    | T => "T"
    | Y => "Y"
    | U => "U"
    | I => "I"
    | O => "O"
    | P => "P"
    | H => "H"
    | G => "G"
    | J => "J"
    | K => "K"
    | L => "L"
    | _ => failwith("Fuck")
    };
  Draw.text(state.mainFont, body, (int_of_float(x), int_of_float(y) + 10), env)
};

let generateWave = (state) => {
  let enemyCount = Utils.random(10, 15);
  let rec list_init = (acc, f, i) =>
    if (i < 0) {
      acc
    } else {
      list_init([f(), ...acc], f, i - 1)
    };
  let genEnemyPos = () =>
    switch (Utils.random(0, 4)) {
    | 0 => {x: Utils.randomf(0., mapSizePx), y: -. fringePos}
    | 1 => {x: mapSizePx +. fringePos, y: Utils.randomf(0., mapSizePx)}
    | 2 => {x: Utils.randomf(0., mapSizePx), y: mapSizePx +. fringePos}
    | 3 => {x: -. fringePos, y: Utils.randomf(0., mapSizePx)}
    | _ => assert false
    };
  let makeEnemy = () => {
    let (monsterKind, maxHealth, enemySpeed, damage) = (NormalZ, 35., 25., 100.);
    {
      pos: genEnemyPos(),
      kind: monsterKind,
      damage,
      health: maxHealth,
      maxHealth,
      speed: enemySpeed,
      error: {x: 0., y: 0.}
    }
  };
  let makeMiniBosses = () => {
    let (monsterKind, maxHealth, enemySpeed, damage) =
      switch (Utils.random(1, 3)) {
      | 1 => (BigZ, 130., 15., 300.)
      | _ => (TallZ, 35., 55., 60.)
      };
    {
      pos: genEnemyPos(),
      kind: monsterKind,
      damage,
      health: maxHealth,
      maxHealth,
      speed: enemySpeed,
      error: {x: 0., y: 0.}
    }
  };
  let enemies = list_init(state.enemies, makeEnemy, enemyCount);
  let startWaveForMiniBosses = 1;
  let enemies =
    if (state.waveNum >= startWaveForMiniBosses) {
      let n = max(0, Utils.random(- state.waveNum, state.waveNum - startWaveForMiniBosses));
      list_init(enemies, makeMiniBosses, n)
    } else {
      enemies
    };
  let crateCount = Utils.random(2, 4);
  let makeCrate = () => {
    pos: {x: Utils.randomf(50., mapSizePx -. 50.), y: Utils.randomf(50., mapSizePx -. 50.)},
    kind: Obj.magic(Utils.random(0, 7))
  };
  {
    ...state,
    enemies,
    crates: list_init(state.crates, makeCrate, crateCount),
    waveNum: state.waveNum + 1,
    nextWaveCountdown: 60.
  }
};

let drawHealthBar = (x, y, h, w, health, maxHealth, color, env) => {
  let xOffset = w /. 2.;
  let border = 1.;
  let border2 = 2.;
  Draw.fill(Constants.black, env);
  Draw.rectf(
    ~pos=(x -. xOffset -. border, y -. border),
    ~width=w +. border2,
    ~height=h +. border2,
    env
  );
  let healthW = Utils.remapf(~value=health, ~low1=0., ~high1=maxHealth, ~low2=0., ~high2=w);
  Draw.fill(color, env);
  Draw.rectf(~pos=(x -. xOffset, y), ~width=healthW, ~height=h, env)
};

let setup = (env) => {
  Env.size(~width=1280, ~height=720, env);
  {
    pos: {x: 400., y: 400.},
    equippedGun: (-1),
    guns: [],
    playerBullets: [],
    achievements: generateAchievements(),
    crates: [],
    mainFont: Draw.loadFont(~filename="assets/molot/font.fnt", env),
    mainSpriteSheet: Draw.loadImage(~filename="assets/spritesheet.png", ~isPixel=true, env),
    enemies: [
      {
        pos: {x: 100., y: 250.},
        damage: 100.,
        kind: NormalZ,
        health: 100.,
        maxHealth: 100.,
        speed: 60.,
        error: {x: 5., y: 5.}
      }
    ],
    enemiesKilled: 0,
    numberOfBulletsFired: 0,
    damageDone: 0.,
    stepTaken: 0.,
    elapsedTime: 0.,
    waveNum: 0,
    nextWaveCountdown: 10.
  }
};

let drawForest = (state, env) =>
  for (i in 0 to mapSize) {
    Draw.subImagef(
      state.mainSpriteSheet,
      ~pos=(float_of_int(i) *. 63., (-10.)),
      ~height=(-64.),
      ~width=65.,
      ~texPos=(523, 0),
      ~texWidth=64,
      ~texHeight=64,
      env
    );
    Draw.subImagef(
      state.mainSpriteSheet,
      ~pos=(float_of_int(i) *. 63., 20.),
      ~height=(-64.),
      ~width=65.,
      ~texPos=(523, 0),
      ~texWidth=64,
      ~texHeight=64,
      env
    )
  };

/*for (i in 0 to mapSize) {
    Draw.subImagef(
      state.mainSpriteSheet,
      ~pos=(float_of_int(i) *. 63., 20.),
      ~height=(-64.),
      ~width=65.,
      ~texPos=(459, 0),
      ~texWidth=64,
      ~texHeight=64,
      env
    )
  }*/
let backgroundTileGrid = {
  let grid = Array.make_matrix(mapSize, mapSize, 0);
  for (_ in 0 to Utils.random(5, 20)) {
    let x = Utils.random(0, mapSize);
    let y = Utils.random(0, mapSize);
    grid[x][y] = 1
  };
  grid
};

let checkOffset = (prevOffset, offset, state) =>
  if (state.pos.x
      +. offset.x < 0.
      || state.pos.x
      +. offset.x > mapSizePx
      || state.pos.y
      +. offset.y < 0.
      || state.pos.y
      +. offset.y > mapSizePx) {
    prevOffset
  } else {
    offset
  };

let draw = (state, env) => {
  let dt = Env.deltaTime(env);
  Draw.background(Utils.color(~r=32, ~g=59, ~b=24, ~a=255), env);
  Draw.fill(Utils.color(~r=41, ~g=166, ~b=244, ~a=255), env);
  Draw.rectMode(Corner, env);
  let offset = {x: 0., y: 0.};
  let playerSpeedDt = playerSpeed *. dt;
  let offset =
    checkOffset(offset, Env.key(A, env) ? {...offset, x: -. playerSpeedDt} : offset, state);
  let offset =
    checkOffset(offset, Env.key(D, env) ? {...offset, x: playerSpeedDt} : offset, state);
  let offset =
    checkOffset(offset, Env.key(W, env) ? {...offset, y: -. playerSpeedDt} : offset, state);
  let offset =
    checkOffset(offset, Env.key(S, env) ? {...offset, y: playerSpeedDt} : offset, state);
  let mag = Utils.magf((offset.x, offset.y));
  let state =
    if (mag > 0.) {
      let dx = offset.x /. mag *. playerSpeedDt;
      let dy = offset.y /. mag *. playerSpeedDt;
      {
        ...state,
        pos: {x: state.pos.x +. dx, y: state.pos.y +. dy},
        stepTaken: state.stepTaken +. playerSpeedDt
      }
    } else {
      state
    };
  let state =
    List.fold_left(
      (state, crate: crateT) =>
        if (Utils.intersectRectRect(
              ~rect1Pos=(state.pos.x -. 20., state.pos.y -. 20.),
              ~rect1W=40.,
              ~rect1H=40.,
              ~rect2Pos=(crate.pos.x -. 20., crate.pos.y -. 20.),
              ~rect2W=40.,
              ~rect2H=40.
            )
            && List.exists(
                 (g: gunT) => g.kind === crate.kind && g.ammunition < g.maxAmmunition,
                 state.guns
               )) {
          {
            ...state,
            guns:
              List.map(
                (gun) => gun.kind === crate.kind ? {...gun, ammunition: gun.maxAmmunition} : gun,
                state.guns
              )
          }
        } else {
          {...state, crates: [crate, ...state.crates]}
        },
      {...state, crates: []},
      state.crates
    );
  let rec foldOverGuns = (state, guns, i) =>
    switch guns {
    | [] => state
    | [gun] => Env.keyPressed(gun.keyToggle, env) ? {...state, equippedGun: i} : state
    | [gun, ...guns] =>
      foldOverGuns(
        Env.keyPressed(gun.keyToggle, env) ? {...state, equippedGun: i} : state,
        guns,
        i + 1
      )
    };
  let state = foldOverGuns(state, state.guns, 0);
  let state =
    if (state.equippedGun >= 0) {
      let curGun = List.nth(state.guns, state.equippedGun);
      if (state.elapsedTime -. curGun.lastShotTime > curGun.fireRate) {
        let state = Env.key(Up, env) ? curGun.fire(state, Env.deltaTime(env), Up) : state;
        let state = Env.key(Down, env) ? curGun.fire(state, Env.deltaTime(env), Down) : state;
        let state = Env.key(Left, env) ? curGun.fire(state, Env.deltaTime(env), Left) : state;
        let state = Env.key(Right, env) ? curGun.fire(state, Env.deltaTime(env), Right) : state;
        state
      } else {
        state
      }
    } else {
      state
    };
  let state = {...state, elapsedTime: state.elapsedTime +. Env.deltaTime(env)};
  let state = {
    ...state,
    playerBullets:
      List.map(
        (bullet) => {...bullet, pos: bullet.moveBullet(bullet), time: bullet.time +. 1.},
        state.playerBullets
      )
  };
  let state =
    List.fold_left(
      (state, achievement) =>
        if (achievement.state === Locked && achievement.condition(state, env)) {
          print_endline(achievement.message);
          {
            ...state,
            guns: [generateGun(), ...state.guns],
            equippedGun: state.equippedGun + 1,
            achievements:
              List.map(
                (a) =>
                  if (a === achievement) {
                    {...a, state: Unlocked}
                  } else {
                    a
                  },
                state.achievements
              )
          }
        } else {
          state
        },
      state,
      state.achievements
    );
  let state = {
    ...state,
    enemies:
      List.map(
        (enemy: enemyT) => {
          let size = Utils.distf((state.pos.x, state.pos.y), (enemy.pos.x, enemy.pos.y));
          let dx = (state.pos.x -. enemy.pos.x) /. size *. enemy.speed *. dt;
          let dy = (state.pos.y -. enemy.pos.y) /. size *. enemy.speed *. dt;
          let error =
            switch enemy.kind {
            | NormalZ
            | BigZ => {
                x:
                  Utils.constrain(
                    ~amt=enemy.error.x +. Utils.randomf((-2.), 2.),
                    ~high=enemy.speed,
                    ~low=(-1.) *. enemy.speed
                  ),
                y:
                  Utils.constrain(
                    ~amt=enemy.error.y +. Utils.randomf((-2.), 2.),
                    ~high=enemy.speed,
                    ~low=(-1.) *. enemy.speed
                  )
              }
            | TallZ => {
                x:
                  Utils.constrain(
                    ~amt=enemy.error.x +. Utils.randomf((-2.), 2.),
                    ~high=enemy.speed /. 4.,
                    ~low=(-1.) *. enemy.speed /. 4.
                  ),
                y:
                  Utils.constrain(
                    ~amt=enemy.error.y +. Utils.randomf((-2.), 2.),
                    ~high=enemy.speed /. 4.,
                    ~low=(-1.) *. enemy.speed /. 4.
                  )
              }
            };
          {
            ...enemy,
            pos: {
              x: enemy.pos.x +. dx +. enemy.error.x *. dt,
              y: enemy.pos.y +. dy +. enemy.error.y *. dt
            },
            error
          }
        },
        state.enemies
      )
  };
  let state =
    List.fold_left(
      (state, bullet: bulletT) => {
        let rec hurtEnemies = (acc, enemies) =>
          switch enemies {
          | [] => (false, acc)
          | [e, ...rest] =>
            if (e.health > 0.
                && Utils.intersectRectRect(
                     ~rect1Pos=(bullet.pos.x, bullet.pos.y),
                     ~rect1W=5.,
                     ~rect1H=5.,
                     ~rect2Pos=(e.pos.x -. 20., e.pos.y -. 20.),
                     ~rect2W=40.,
                     ~rect2H=40.
                   )) {
              (
                true,
                acc @ [{...e, health: e.health -. bullet.damage *. Env.deltaTime(env)}, ...rest]
              )
            } else {
              hurtEnemies([e, ...acc], rest)
            }
          };
        let (didHit, enemies) = hurtEnemies([], state.enemies);
        let bullets =
          if (didHit) {
            state.playerBullets
          } else {
            [bullet, ...state.playerBullets]
          };
        {
          ...state,
          damageDone:
            didHit ? state.damageDone +. bullet.damage *. Env.deltaTime(env) : state.damageDone,
          playerBullets: bullets,
          enemies
        }
      },
      {...state, playerBullets: []},
      state.playerBullets
    );
  let state =
    if (List.for_all((gun) => gun.ammunition === 0, state.guns)) {
      {...state, guns: List.map((gun) => {...gun, ammunition: gun.maxAmmunition}, state.guns)}
    } else {
      state
    };
  let state = {...state, nextWaveCountdown: state.nextWaveCountdown -. Env.deltaTime(env)};
  let state =
    if (state.nextWaveCountdown <= 0. || List.length(state.enemies) === 0) {
      generateWave(state)
    } else {
      state
    };
  /* Do some math for stats */
  let state =
    List.fold_left(
      (state, enemy) =>
        if (enemy.health <= 0.) {
          {...state, enemiesKilled: state.enemiesKilled + 1}
        } else {
          {...state, enemies: [enemy, ...state.enemies]}
        },
      {...state, enemies: []},
      state.enemies
    );
  Draw.pushMatrix(env);
  Draw.scale(scale, scale, env);
  Draw.translate(
    -. state.pos.x +. float_of_int(Env.width(env)) /. (2. *. scale),
    -. state.pos.y +. float_of_int(Env.height(env)) /. (2. *. scale),
    env
  );
  Array.iteri(
    (y, row) =>
      Array.iteri(
        (x, id) =>
          switch id {
          | 0 =>
            Draw.subImagef(
              state.mainSpriteSheet,
              ~pos=(float_of_int(x) *. 63., float_of_int(y) *. 64.),
              ~height=64.,
              ~width=64.,
              ~texPos=(458, 0),
              ~texWidth=64,
              ~texHeight=64,
              env
            )
          | 1 =>
            Draw.subImagef(
              state.mainSpriteSheet,
              ~pos=(float_of_int(x) *. 63., float_of_int(y) *. 64.),
              ~height=64.,
              ~width=64.,
              ~texPos=(394, 0),
              ~texWidth=64,
              ~texHeight=64,
              env
            )
          | _ => ()
          },
        row
      ),
    backgroundTileGrid
  );
  /* Draw the enemies */
  let sortedEnemies =
    List.sort(
      (enemy1: enemyT, enemy2: enemyT) =>
        if (enemy1.pos.y > enemy2.pos.y) {
          1
        } else if (enemy1.pos.y < enemy2.pos.y) {
          (-1)
        } else {
          0
        },
      state.enemies
    );
  List.iter(
    (enemy: enemyT) =>
      if (enemy.pos.x > -. fringePos
          && enemy.pos.x < mapSizePx
          +. 30.
          && enemy.pos.y > -. fringePos
          && enemy.pos.y < mapSizePx
          +. 30.) {
        let (texPos, healthBarOffsetX, healthBarOffsetY) =
          switch enemy.kind {
          | NormalZ => ((842, 0), 0., 0.)
          | BigZ => ((1026, 0), 0., 0.)
          | TallZ => ((1391, 0), 2., (-5.))
          };
        Draw.subImagef(
          state.mainSpriteSheet,
          ~pos=(enemy.pos.x -. 20., enemy.pos.y -. 32.),
          ~width=40.,
          ~height=64.,
          ~texPos,
          ~texWidth=40,
          ~texHeight=64,
          env
        );
        drawHealthBar(
          enemy.pos.x +. 5. +. healthBarOffsetX,
          enemy.pos.y -. 35. +. healthBarOffsetY,
          5.,
          40.,
          enemy.health,
          enemy.maxHealth,
          Constants.red,
          env
        )
      },
    sortedEnemies
  );
  List.iter(
    (crate: crateT) => {
      Draw.subImagef(
        state.mainSpriteSheet,
        ~pos=(crate.pos.x -. 20., crate.pos.y -. 20.),
        ~width=40.,
        ~height=40.,
        ~texPos=(1532, 0),
        ~texWidth=64,
        ~texHeight=64,
        env
      );
      let yOffset = sin(state.elapsedTime *. 2.) *. 2. -. 17.;
      Draw.fill(Constants.white, env);
      Draw.trianglef(
        (crate.pos.x -. 5., crate.pos.y +. 9.5 +. yOffset),
        (crate.pos.x +. 5., crate.pos.y +. 9.5 +. yOffset),
        (crate.pos.x, crate.pos.y +. 17. +. yOffset),
        env
      );
      Draw.fill(Utils.color(150, 120, 10, 255), env);
      Draw.trianglef(
        (crate.pos.x -. 4., crate.pos.y +. 10. +. yOffset),
        (crate.pos.x +. 4., crate.pos.y +. 10. +. yOffset),
        (crate.pos.x, crate.pos.y +. 16. +. yOffset),
        env
      );
      Draw.subImagef(
        state.mainSpriteSheet,
        ~pos=(crate.pos.x -. 10., crate.pos.y -. 10. +. yOffset),
        ~width=20.,
        ~height=20.,
        ~texPos=gunTexPos(crate.kind),
        ~texWidth=64,
        ~texHeight=64,
        env
      )
    },
    state.crates
  );
  List.iter(
    ({pos, direction: _}) => {
      Draw.fill(Constants.black, env);
      Draw.rectf(~pos=(pos.x, pos.y), ~width=5., ~height=5., env)
    },
    state.playerBullets
  );
  /* Draw the player */
  Draw.subImagef(
    state.mainSpriteSheet,
    ~pos=(state.pos.x -. 20., state.pos.y -. 32.),
    ~width=40.,
    ~height=64.,
    ~texPos=(128, 0),
    ~texWidth=40,
    ~texHeight=64,
    env
  );
  drawForest(state, env);
  Draw.popMatrix(env);
  let length = List.length(state.guns);
  switch length {
  | 0 =>
    Draw.text(
      ~font=state.mainFont,
      ~body=Printf.sprintf("Run away from the zombie!"),
      ~pos=(50, 120),
      env
    )
  | 1 =>
    Draw.text(
      ~font=state.mainFont,
      ~body=Printf.sprintf("Use your new gun on the zombie!"),
      ~pos=(50, 120),
      env
    )
  | _ =>
    Draw.text(
      ~font=state.mainFont,
      ~body=Printf.sprintf("Next wave in %d", truncate(state.nextWaveCountdown)),
      ~pos=(50, 120),
      env
    )
  };
  ignore @@
  List.fold_left(
    ((x, y, i), gun) => {
      if (length - i - 1 === state.equippedGun) {
        Draw.fill(Utils.color(255, 255, 0, 255), env);
        Draw.rectf(~pos=(x +. 20., y), ~width=80., ~height=80., env)
      };
      Draw.fill(Utils.color(180, 180, 180, 255), env);
      Draw.rectf(~pos=(x +. 25., y +. 5.), ~width=70., ~height=70., env);
      Draw.subImagef(
        state.mainSpriteSheet,
        ~pos=(x +. 30., y),
        ~width=64.,
        ~height=64.,
        ~texPos=gunTexPos(gun.kind),
        ~texWidth=64,
        ~texHeight=64,
        env
      );
      drawKey(x +. 30., y +. 22., gun, state, env);
      drawHealthBar(
        x +. 25. +. 35.,
        y +. 64.,
        10.,
        70.,
        float_of_int(gun.ammunition),
        float_of_int(gun.maxAmmunition),
        Utils.color(180, 180, 0, 255),
        env
      );
      (x +. 90., y, i + 1)
    },
    (10., 20., 0),
    List.rev(state.guns)
  );
  state
};

run(~setup, ~draw, ());

run(~setup, ~draw, ());
