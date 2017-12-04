open Reprocessing;

let fringePos = 30.;

let playerSpeed = 150.;

let mapSize = 20;

let mapSizePx = float_of_int(mapSize * 64);

let bulletSpeed = 400.;

let defaultRange = 400.;

let scale = 2.;

let directions: list(Reprocessing_Events.keycodeT) = [Up, Down, Left, Right];

module StringMap = Map.Make(String);

type vec2T = {
  x: float,
  y: float
};

type gunIterationT = {
  i: int,
  pos: vec2T,
  boundsTopLeft: vec2T,
  boundsBottomRight: vec2T,
  direction: vec2T
};

type bulletT = {
  pos: vec2T,
  direction: vec2T,
  moveBullet: bulletT => bulletT,
  damage: float,
  remainingRange: float
};

type achievementStateT =
  | Locked
  | Unlocked;

type enemyKindT =
  | Normal1Z
  | Normal2Z
  | Normal3Z
  | BigZ
  | TallZ;

let enemyTexPos = (kind) =>
  switch kind {
  | Normal1Z => [(917, 0), (965, 0)]
  | Normal2Z => [(917, 0), (965, 0)]
  | Normal3Z => [(917, 0), (965, 0)]
  | BigZ => [(1062, 0), (1110, 0)]
  | TallZ => [(1493, 0), (1541, 0)]
  };

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
  | LaserGun
  | Uzi;

let gunTexPos = (kind) =>
  switch kind {
  | Machinegun => (342, 0)
  | Pistol => (606, 0)
  | Shotgun => (672, 0)
  | AlienGun1 => (67, 0)
  | AlienGun2 => (802, 0)
  | LaserGun => (738, 0)
  | Rifle => (0, 0)
  | Uzi => (1659, (-3))
  };

type crateT = {
  pos: vec2T,
  kind: gunKindT
};

type keyToggleT = {
  primaryKey: Reprocessing_Events.keycodeT,
  modifier: bool
};

type gunT = {
  fireRate: float,
  lastShotTime: float,
  ammunition: int,
  maxAmmunition: int,
  color: colorT,
  keyToggle: keyToggleT,
  fire: (stateT, float, Reprocessing_Events.keycodeT) => stateT,
  kind: gunKindT,
  soundName: string
}
and achievementT = {
  state: achievementStateT,
  condition: (stateT, glEnvT) => bool,
  message: string
}
and stateT = {
  pos: vec2T,
  guns: list(gunT),
  facingLeft: bool,
  moving: bool,
  equippedGun: int,
  playerBullets: list(bulletT),
  achievements: list(achievementT),
  crates: list(crateT),
  mainFont: fontT,
  mainSpriteSheet: imageT,
  sounds: StringMap.t(soundT),
  enemies: list(enemyT),
  waveNum: int,
  nextWaveCountdown: float,
  enemiesKilled: int,
  numberOfBulletsFired: int,
  damageDone: float,
  stepTaken: float,
  elapsedTime: float
};

type orderT =
  | Player(vec2T)
  | Enemy(enemyT)
  | Crate(crateT);

let add = (v1, v2) => {x: v1.x +. v2.x, y: v1.y +. v2.y};

let mul = (v1, v2) => {x: v1.x *. v2.x, y: v1.y *. v2.y};

let mulConst = (v1, c) => {x: v1.x *. c, y: v1.y *. c};

let moveBullet = (bullet: bulletT) => {
  ...bullet,
  pos: add(bullet.pos, bullet.direction),
  remainingRange: bullet.remainingRange -. Utils.magf((bullet.direction.x, bullet.direction.y))
};

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
  {
    ...state,
    numberOfBulletsFired: state.numberOfBulletsFired + 1,
    playerBullets: [
      {
        pos: {x: state.pos.x, y: state.pos.y},
        direction: dir,
        moveBullet,
        damage,
        remainingRange: defaultRange
      },
      ...state.playerBullets
    ]
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
  {
    ...state,
    numberOfBulletsFired: state.numberOfBulletsFired + 3,
    playerBullets: [
      {
        pos: {x: state.pos.x, y: state.pos.y},
        direction: dir1,
        moveBullet,
        damage,
        remainingRange: defaultRange
      },
      {
        pos: {x: state.pos.x, y: state.pos.y},
        direction: dir2,
        moveBullet,
        damage,
        remainingRange: defaultRange
      },
      {
        pos: {x: state.pos.x, y: state.pos.y},
        direction: dir3,
        moveBullet,
        damage,
        remainingRange: defaultRange
      },
      ...state.playerBullets
    ]
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
    let perpendicular = {x: -. bullet.direction.y, y: bullet.direction.x};
    let perpendicularSize =
      sqrt(perpendicular.x *. perpendicular.x +. perpendicular.y *. perpendicular.y);
    let perpendicular = {
      x: perpendicular.x /. perpendicularSize,
      y: perpendicular.y /. perpendicularSize
    };
    let norm = cos(bullet.remainingRange /. 10.) *. 4.;
    let offset = {x: perpendicular.x *. norm, y: perpendicular.y *. norm};
    let totalOffset = add(bullet.direction, offset);
    {
      ...bullet,
      pos: add(bullet.pos, totalOffset),
      remainingRange: bullet.remainingRange -. Utils.magf((totalOffset.x, totalOffset.y))
    }
  };
  {
    ...state,
    numberOfBulletsFired: state.numberOfBulletsFired + 3,
    playerBullets: [
      {
        pos: {x: state.pos.x, y: state.pos.y},
        direction: dir1,
        moveBullet,
        damage,
        remainingRange: defaultRange
      },
      {
        pos: {x: state.pos.x, y: state.pos.y},
        direction: dir2,
        moveBullet,
        damage,
        remainingRange: defaultRange
      },
      {
        pos: {x: state.pos.x, y: state.pos.y},
        direction: dir3,
        moveBullet,
        damage,
        remainingRange: defaultRange
      },
      ...state.playerBullets
    ]
  }
};

let makeLaserFire =
    (bulletSpeed, damage, state, deltaTime, direction: Reprocessing_Events.keycodeT) => {
  let bulletSpeed = bulletSpeed *. deltaTime;
  let dir =
    switch direction {
    | Up => {x: 0., y: (-1.0)}
    | Down => {x: 0., y: 1.0}
    | Left => {x: (-1.0), y: 0.}
    | Right => {x: 1.0, y: 0.}
    | _ => assert false
    };
  let spacing = 1.5;
  let rec recur = (acc, i) =>
    if (i < 0) {
      acc
    } else {
      recur(
        [
          {
            pos: {
              x: state.pos.x -. mulConst(dir, float_of_int(i) *. spacing).x,
              y: state.pos.y -. mulConst(dir, float_of_int(i) *. spacing).y
            },
            direction: mulConst(dir, bulletSpeed),
            moveBullet,
            damage,
            remainingRange: defaultRange
          },
          ...acc
        ],
        i - 1
      )
    };
  let newBullets = recur([], 10);
  {
    ...state,
    numberOfBulletsFired: state.numberOfBulletsFired + 1,
    playerBullets: newBullets @ state.playerBullets
  }
};

let makeBurstFire =
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
  {
    ...state,
    numberOfBulletsFired: state.numberOfBulletsFired + 3,
    playerBullets: [
      {
        pos: {x: state.pos.x, y: state.pos.y},
        direction: dir2,
        moveBullet,
        damage,
        remainingRange: defaultRange
      },
      {
        pos: add(add({x: state.pos.x, y: state.pos.y}, dir2), dir2),
        direction: dir2,
        moveBullet,
        damage,
        remainingRange: defaultRange
      },
      {
        pos: add(add(add(add({x: state.pos.x, y: state.pos.y}, dir2), dir2), dir2), dir2),
        direction: dir2,
        moveBullet,
        damage,
        remainingRange: defaultRange
      },
      ...state.playerBullets
    ]
  }
};

let makeUziFire = (bulletSpeed, otherSpeed, damage) => {
  let otherNoise = ref(0.);
  (state, deltaTime, direction: Reprocessing_Events.keycodeT) => {
    otherNoise :=
      Utils.constrain(
        ~amt=otherNoise^ +. Utils.randomf((-2000.) *. deltaTime, 2000. *. deltaTime),
        ~low=otherSpeed *. (-1.),
        ~high=otherSpeed
      );
    let bulletSpeed = bulletSpeed *. deltaTime;
    let otherSpeed = otherNoise^ *. deltaTime;
    let dir =
      switch direction {
      | Up => {x: -. otherSpeed, y: -. bulletSpeed}
      | Down => {x: otherSpeed, y: bulletSpeed}
      | Left => {x: -. bulletSpeed, y: otherSpeed}
      | Right => {x: bulletSpeed, y: -. otherSpeed}
      | _ => assert false
      };
    let newBullet = {
      pos: {x: state.pos.x, y: state.pos.y},
      direction: dir,
      moveBullet,
      damage,
      remainingRange: defaultRange
    };
    {
      ...state,
      numberOfBulletsFired: state.numberOfBulletsFired + 1,
      playerBullets: [newBullet, ...state.playerBullets]
    }
  }
};

let makeShotgunFire =
    (
      bulletSpeed,
      otherSpeed,
      maxBullets,
      damage,
      state,
      deltaTime,
      direction: Reprocessing_Events.keycodeT
    ) => {
  let otherSpeed = otherSpeed *. deltaTime;
  let bulletSpeed = bulletSpeed *. deltaTime;
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
          {
            pos: {x: state.pos.x, y: state.pos.y},
            direction: dir,
            moveBullet,
            damage,
            remainingRange: 100. +. Utils.randomf(0., 50.)
          },
          ...acc
        ],
        i - 1
      )
    };
  let newBullets = recur([], Utils.random(max(1, maxBullets - 3), maxBullets + 1));
  {
    ...state,
    numberOfBulletsFired: state.numberOfBulletsFired + List.length(newBullets),
    playerBullets: newBullets @ state.playerBullets
  }
};

let generateGun: unit => gunT = {
  let keyCount = ref(0);
  let keySet = ref([]);
  let getNextGunKey: unit => keyToggleT =
    () => {
      keyCount := keyCount^ + 1;
      switch keyCount^ {
      | 1 => {primaryKey: Num_1, modifier: false}
      | 2 => {primaryKey: Num_2, modifier: false}
      | 3 => {primaryKey: Num_3, modifier: false}
      | 4 => {primaryKey: Num_4, modifier: false}
      | 5 => {primaryKey: Num_5, modifier: false}
      | 6 => {primaryKey: Num_6, modifier: false}
      | 7 => {primaryKey: Num_7, modifier: false}
      | 8 => {primaryKey: Num_8, modifier: false}
      | 9 => {primaryKey: Num_9, modifier: false}
      | _ =>
        let key = ref(Utils.random(0, 44));
        while (List.mem(key^, keySet^)) {
          key := Utils.random(0, 44)
        };
        keySet := [key^, ...keySet^];
        switch key^ {
        | 0 => {primaryKey: T, modifier: false}
        | 1 => {primaryKey: Y, modifier: false}
        | 2 => {primaryKey: U, modifier: false}
        | 3 => {primaryKey: I, modifier: false}
        | 4 => {primaryKey: O, modifier: false}
        | 5 => {primaryKey: P, modifier: false}
        | 6 => {primaryKey: K, modifier: false}
        | 7 => {primaryKey: J, modifier: false}
        | 8 => {primaryKey: H, modifier: false}
        | 9 => {primaryKey: G, modifier: false}
        | 10 => {primaryKey: Z, modifier: false}
        | 11 => {primaryKey: C, modifier: false}
        | 12 => {primaryKey: V, modifier: false}
        | 13 => {primaryKey: B, modifier: false}
        | 14 => {primaryKey: N, modifier: false}
        | 15 => {primaryKey: M, modifier: false}
        | 16 => {primaryKey: Comma, modifier: false}
        | 17 => {primaryKey: Period, modifier: false}
        | 18 => {primaryKey: T, modifier: true}
        | 19 => {primaryKey: Y, modifier: true}
        | 20 => {primaryKey: U, modifier: true}
        | 21 => {primaryKey: I, modifier: true}
        | 22 => {primaryKey: O, modifier: true}
        | 23 => {primaryKey: P, modifier: true}
        | 24 => {primaryKey: K, modifier: true}
        | 25 => {primaryKey: J, modifier: true}
        | 26 => {primaryKey: H, modifier: true}
        | 27 => {primaryKey: G, modifier: true}
        | 28 => {primaryKey: Z, modifier: true}
        | 29 => {primaryKey: C, modifier: true}
        | 30 => {primaryKey: V, modifier: true}
        | 31 => {primaryKey: B, modifier: true}
        | 32 => {primaryKey: N, modifier: true}
        | 33 => {primaryKey: M, modifier: true}
        | 34 => {primaryKey: Comma, modifier: true}
        | 35 => {primaryKey: Period, modifier: true}
        | 36 => {primaryKey: Num_1, modifier: true}
        | 37 => {primaryKey: Num_2, modifier: true}
        | 38 => {primaryKey: Num_3, modifier: true}
        | 39 => {primaryKey: Num_4, modifier: true}
        | 40 => {primaryKey: Num_5, modifier: true}
        | 41 => {primaryKey: Num_6, modifier: true}
        | 42 => {primaryKey: Num_7, modifier: true}
        | 43 => {primaryKey: Num_8, modifier: true}
        | 44 => {primaryKey: Num_9, modifier: true}
        | _ => assert false
        }
      }
    };
  () => {
    let keyToggle = getNextGunKey();
    let maxAmmunition = Utils.randomf(0., 1.);
    let damage = Utils.randomf(0., 1.);
    let fireRate = Utils.randomf(0., 1.);
    let gunRank = damage +. fireRate;
    /*print_endline(
        Printf.sprintf(
          "rank: %f, damage: %f, fireRate: %f, maxAmunition: %f",
          gunRank,
          damage,
          fireRate,
          maxAmmunition
        )
      );*/
    let (kind, fire, fireRate, maxAmmunition, soundName) =
      switch (Utils.random(0, 8)) {
      | 0 => (
          Pistol,
          makeDefaultFire(bulletSpeed, Utils.lerpf(200., 2000., damage)),
          Utils.lerpf(0.5, 0.3, fireRate),
          Utils.lerp(1, 10, maxAmmunition),
          "machinegun_singleshot"
        )
      | 1 => (
          AlienGun2,
          makeTripleShotGunFire(
            bulletSpeed,
            Utils.randomf(50., 200.),
            Utils.lerpf(400., 700., damage)
          ),
          Utils.lerpf(0.7, 0.5, fireRate),
          Utils.lerp(1, 10, maxAmmunition),
          "shotgun"
        )
      | 2 => (
          Rifle,
          makeBurstFire(bulletSpeed, Utils.lerpf(200., 900., damage)),
          Utils.lerpf(0.7, 0.5, fireRate),
          Utils.lerp(1, 6, maxAmmunition),
          "machinegun_threeshots"
        )
      | 3 => (
          Shotgun,
          makeShotgunFire(
            bulletSpeed +. 300.,
            Utils.randomf(50., 200.),
            8,
            Utils.lerpf(100., 1000., damage)
          ),
          Utils.lerpf(2.0, 1.2, fireRate),
          Utils.lerp(2, 6, maxAmmunition),
          "shotgun"
        )
      | 4 => (
          Machinegun,
          makeDefaultFire(bulletSpeed, Utils.lerpf(100., 400., damage)),
          Utils.lerpf(0.2, 0.06, fireRate),
          Utils.lerp(5, 30, maxAmmunition),
          "machinegun_singleshot"
        )
      | 5 => (
          Uzi,
          makeUziFire(bulletSpeed, Utils.randomf(100., 500.), Utils.lerpf(50., 200., damage)),
          Utils.lerpf(0.1, 0.03, fireRate),
          Utils.lerp(20, 50, maxAmmunition),
          "machinegun_singleshot"
        )
      | 6 => (
          LaserGun,
          makeLaserFire(bulletSpeed -. 200., Utils.lerpf(100., 300., damage)),
          Utils.lerpf(1.5, 0.5, fireRate),
          Utils.lerp(2, 10, maxAmmunition),
          "laser"
        )
      | _ => (
          AlienGun1,
          makeSineFire(
            bulletSpeed -. 200.,
            Utils.randomf(50., 200.),
            Utils.lerpf(400., 1000., damage)
          ),
          Utils.lerpf(0.7, 0.5, fireRate),
          Utils.lerp(1, 10, maxAmmunition),
          "aliengun_threeshots"
        )
      };
    let color =
      if (gunRank > 0. && gunRank < 0.1) {
        Utils.color(188, 191, 187, 255)
      } else if (gunRank > 0.1 && gunRank < 1.1) {
        Utils.color(62, 245, 21, 255)
      } else if (gunRank > 1.1 && gunRank < 1.7) {
        Utils.color(47, 119, 214, 255)
      } else if (gunRank > 1.7 && gunRank < 1.9) {
        Utils.color(173, 28, 221, 255)
      } else {
        Utils.color(247, 133, 12, 255)
      };
    {
      ammunition: maxAmmunition,
      maxAmmunition,
      fireRate,
      lastShotTime: 0.,
      keyToggle,
      soundName,
      fire,
      kind,
      color
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
    | {primaryKey: Num_1} => "1"
    | {primaryKey: Num_2} => "2"
    | {primaryKey: Num_3} => "3"
    | {primaryKey: Num_4} => "4"
    | {primaryKey: Num_5} => "5"
    | {primaryKey: Num_6} => "6"
    | {primaryKey: Num_7} => "7"
    | {primaryKey: Num_8} => "8"
    | {primaryKey: Num_9} => "9"
    | {primaryKey: T} => "T"
    | {primaryKey: Y} => "Y"
    | {primaryKey: U} => "U"
    | {primaryKey: I} => "I"
    | {primaryKey: O} => "O"
    | {primaryKey: P} => "P"
    | {primaryKey: H} => "H"
    | {primaryKey: G} => "G"
    | {primaryKey: J} => "J"
    | {primaryKey: K} => "K"
    | {primaryKey: L} => "L"
    | {primaryKey: Z} => "Z"
    | {primaryKey: C} => "C"
    | {primaryKey: V} => "V"
    | {primaryKey: B} => "B"
    | {primaryKey: N} => "N"
    | {primaryKey: M} => "M"
    | {primaryKey: Comma} => ","
    | {primaryKey: Period} => "."
    | _ => failwith("Fuck")
    };
  if (! gun.keyToggle.modifier) {
    Draw.text(state.mainFont, body, (int_of_float(x), int_of_float(y) + 10), env)
  } else {
    Draw.text(state.mainFont, "+ " ++ body, (int_of_float(x), int_of_float(y) + 10), env)
  }
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
    let monsterKind =
      switch (Utils.random(0, 3)) {
      | 0 => Normal1Z
      | 1 => Normal2Z
      | _ => Normal3Z
      };
    let (maxHealth, enemySpeed, damage) = (35., 25., 100.);
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
      | 1 => (BigZ, 300., 15., 300.)
      | _ => (TallZ, 35., 110., 60.)
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
    kind: Obj.magic(Utils.random(0, 8))
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

let soundNames = [
  "emptygun",
  "reload",
  "machinegun_singleshot",
  "machinegun_threeshots",
  "laser",
  "aliengun_threeshots",
  "shotgun"
];

let playSound = (name, state, env) =>
  switch (StringMap.find(name, state.sounds)) {
  | s => Env.playSound(s, env)
  | exception Not_found => print_endline("Couldn't find sound " ++ name)
  };

let setup = (env) => {
  Env.size(~width=1280, ~height=720, env);
  let loadSound = (soundMap: StringMap.t(soundT), soundName: string) =>
    StringMap.add(
      soundName,
      Env.loadSound(Printf.sprintf("assets/sounds/%s.wav", soundName), env),
      soundMap
    );
  {
    pos: {x: 400., y: 400.},
    facingLeft: true,
    moving: false,
    equippedGun: (-1),
    guns: [],
    playerBullets: [],
    achievements: generateAchievements(),
    crates: [],
    mainFont: Draw.loadFont(~filename="assets/molot/font.fnt", env),
    mainSpriteSheet: Draw.loadImage(~filename="assets/spritesheet.png", ~isPixel=true, env),
    sounds: List.fold_left(loadSound, StringMap.empty, soundNames),
    enemies: [
      {
        pos: {x: 100., y: 250.},
        damage: 100.,
        kind: Normal1Z,
        health: 100.,
        maxHealth: 100.,
        speed: 70.,
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

let drawForest = (state, env) => {
  Draw.fill(Utils.color(~r=43, ~g=82, ~b=69, ~a=255), env);
  for (i in 0 to mapSize) {
    Draw.rectf(~pos=(float_of_int(i) *. 63., (-25.)), ~height=(-64.), ~width=65., env);
    Draw.subImagef(
      state.mainSpriteSheet,
      ~pos=(float_of_int(i) *. 64., 25.),
      ~height=(-64.),
      ~width=64.,
      ~texPos=(540, 0),
      ~texWidth=64,
      ~texHeight=64,
      env
    )
  }
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
  /* Draw.background(Utils.color(~r=100, ~g=100, ~b=100, ~a=255), env); */
  Draw.background(Utils.color(~r=43, ~g=82, ~b=69, ~a=255), env);
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
          playSound("reload", state, env);
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
    | [gun, ...guns] =>
      foldOverGuns(
        Env.keyPressed(gun.keyToggle.primaryKey, env)
        && (gun.keyToggle.modifier ? Env.key(LeftShift, env) : ! Env.key(LeftShift, env)) ?
          {...state, equippedGun: i} : state,
        guns,
        i + 1
      )
    };
  let state = foldOverGuns(state, state.guns, 0);
  let fireGun = (state) => {
    ...state,
    guns:
      List.mapi(
        (i, gun) =>
          if (i === state.equippedGun) {
            {...gun, ammunition: max(gun.ammunition - 1, 0), lastShotTime: state.elapsedTime}
          } else {
            gun
          },
        state.guns
      )
  };
  let state =
    if (state.equippedGun >= 0) {
      let curGun = List.nth(state.guns, state.equippedGun);
      if (state.elapsedTime -. curGun.lastShotTime > curGun.fireRate && curGun.ammunition > 0) {
        let (state, fired) =
          List.fold_left(
            ((s, f), dir) => Env.key(dir, env) ? (curGun.fire(s, dt, dir), true) : (s, f),
            (state, false),
            directions
          );
        if (fired) {
          playSound(curGun.soundName, state, env);
          fireGun(state)
        } else {
          state
        }
      } else if (state.elapsedTime
                 -. curGun.lastShotTime > curGun.fireRate
                 && curGun.ammunition === 0) {
        if (List.exists((dir) => Env.key(dir, env), directions)) {
          playSound("emptygun", state, env);
          fireGun(state)
        } else {
          state
        }
      } else {
        state
      }
    } else {
      state
    };
  /** Handle player facing/moving */
  let state =
    if (Env.key(D, env)) {
      {...state, facingLeft: false, moving: true}
    } else if (Env.key(A, env)) {
      {...state, facingLeft: true, moving: true}
    } else if (Env.key(W, env)) {
      {...state, moving: true}
    } else if (Env.key(S, env)) {
      {...state, moving: true}
    } else {
      {...state, moving: false}
    };
  let state =
    if (Env.key(Right, env)) {
      {...state, facingLeft: false}
    } else if (Env.key(Left, env)) {
      {...state, facingLeft: true}
    } else {
      state
    };
  let state = {...state, elapsedTime: state.elapsedTime +. Env.deltaTime(env)};
  let state = {
    ...state,
    playerBullets: List.map((bullet) => bullet.moveBullet(bullet), state.playerBullets)
  };
  let state = {
    ...state,
    playerBullets: List.filter((bullet) => bullet.remainingRange > 0., state.playerBullets)
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
            | Normal1Z
            | Normal2Z
            | Normal3Z
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
    if (List.length(state.guns) > 0 && List.for_all((gun) => gun.ammunition === 0, state.guns)) {
      playSound("reload", state, env);
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
              ~texPos=(474, 0),
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
              ~texPos=(408, 0),
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
  let allThings = List.map((v) => Enemy(v), state.enemies);
  let allThings = [Player(state.pos), ...allThings];
  let allThings = allThings @ List.map((c) => Crate(c), state.crates);
  /* Draw the enemies */
  let sortedAllThings =
    List.sort(
      (thing1: orderT, thing2: orderT) => {
        let pos1 =
          switch thing1 {
          | Crate(c) => c.pos
          | Player(p) => p
          | Enemy(e) => e.pos
          };
        let pos2 =
          switch thing2 {
          | Crate(c) => c.pos
          | Player(p) => p
          | Enemy(e) => e.pos
          };
        if (pos1.y > pos2.y) {
          1
        } else if (pos1.y < pos2.y) {
          (-1)
        } else {
          0
        }
      },
      allThings
    );
  List.iter(
    ({pos, direction: _}) => {
      Draw.fill(Constants.black, env);
      Draw.rectf(~pos=(pos.x, pos.y), ~width=5., ~height=5., env)
    },
    state.playerBullets
  );
  let drawEnemy = (enemy: enemyT) =>
    if (enemy.pos.x > -. fringePos
        && enemy.pos.x < mapSizePx
        +. 30.
        && enemy.pos.y > -. fringePos
        && enemy.pos.y < mapSizePx
        +. 30.) {
      let animList = enemyTexPos(enemy.kind);
      let animLen = List.length(animList);
      let animSpeed = 0.2;
      let texPos = List.nth(animList, truncate(state.elapsedTime /. animSpeed) mod animLen);
      let (healthBarOffsetX, healthBarOffsetY) =
        switch enemy.kind {
        | Normal1Z
        | Normal2Z
        | Normal3Z
        | BigZ => ((-5.), 0.)
        | TallZ => (2., (-5.))
        };
      if (enemy.pos.x > state.pos.x) {
        Draw.subImagef(
          state.mainSpriteSheet,
          ~pos=(enemy.pos.x -. 25., enemy.pos.y -. 32.),
          ~width=46.,
          ~height=64.,
          ~texPos,
          ~texWidth=46,
          ~texHeight=64,
          env
        )
      } else {
        Draw.subImagef(
          state.mainSpriteSheet,
          ~pos=(enemy.pos.x -. 23. +. 45., enemy.pos.y -. 32.),
          ~width=(-46.),
          ~height=64.,
          ~texPos,
          ~texWidth=46,
          ~texHeight=64,
          env
        )
      };
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
    };
  let drawCrate = (crate: crateT) => {
    Draw.subImagef(
      state.mainSpriteSheet,
      ~pos=(crate.pos.x -. 20., crate.pos.y -. 20.),
      ~width=40.,
      ~height=40.,
      ~texPos=(1590, 0),
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
  };
  List.iter(
    (thing) =>
      switch thing {
      | Crate(c) => drawCrate(c)
      | Enemy(e) => drawEnemy(e)
      | Player(p) =>
        let texPos =
          if (state.moving) {
            if (truncate(state.stepTaken /. 20.) mod 2 == 1) {
              (128, 0)
            } else {
              (224, 0)
            }
          } else {
            (180, 0)
          };
        if (state.facingLeft) {
          Draw.subImagef(
            state.mainSpriteSheet,
            ~pos=(p.x -. 20., p.y -. 32.),
            ~width=40.,
            ~height=64.,
            ~texPos,
            ~texWidth=40,
            ~texHeight=64,
            env
          )
        } else {
          Draw.subImagef(
            state.mainSpriteSheet,
            ~pos=(p.x +. 26., p.y -. 32.),
            ~width=(-40.),
            ~height=64.,
            ~texPos,
            ~texWidth=40,
            ~texHeight=64,
            env
          )
        }
      },
    sortedAllThings
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
  let defaultSpacing = 90.;
  let padding = 16.;
  let boundsTopLeft = {x: padding, y: padding};
  let boundsBottomRight = {
    x: float_of_int(Env.width(env)) -. padding,
    y: float_of_int(Env.height(env)) -. padding
  };
  let width = boundsBottomRight.x -. boundsTopLeft.x;
  let height = boundsBottomRight.y -. boundsTopLeft.y;
  let numX = floor(width /. defaultSpacing);
  let numY = floor(height /. defaultSpacing);
  let diffX = width -. numX *. defaultSpacing;
  let diffY = height -. numY *. defaultSpacing;
  let squareSizeX = defaultSpacing +. diffX /. numX;
  let squareSizeY = defaultSpacing +. diffY /. numY;
  let boundsTopLeft = {x: padding, y: padding +. squareSizeY};
  let boundsBottomRight = {x: boundsBottomRight.x -. squareSizeX, y: boundsBottomRight.y};
  ignore @@
  List.fold_left(
    ({pos: {x, y}, i} as acc, gun) => {
      let (newDirection, newBottomRight, newTopLeft) =
        switch acc.direction {
        | {x: 1., y: 0.} when x +. squareSizeX > acc.boundsBottomRight.x => (
            {x: 0., y: 1.0},
            {...acc.boundsBottomRight, x: acc.boundsBottomRight.x -. squareSizeX},
            acc.boundsTopLeft
          )
        | {x: 0., y: 1.0} when y +. squareSizeY > acc.boundsBottomRight.y => (
            {x: (-1.), y: 0.0},
            {...acc.boundsBottomRight, y: acc.boundsBottomRight.y -. squareSizeY},
            acc.boundsTopLeft
          )
        | {x: (-1.), y: 0.0} when x -. squareSizeX < acc.boundsTopLeft.x => (
            {x: 0.0, y: (-1.0)},
            acc.boundsBottomRight,
            {...acc.boundsTopLeft, x: acc.boundsTopLeft.x +. squareSizeX}
          )
        | {x: 0.0, y: (-1.0)} when y -. squareSizeY < acc.boundsTopLeft.y => (
            {x: 1., y: 0.},
            acc.boundsBottomRight,
            {...acc.boundsTopLeft, y: acc.boundsTopLeft.y +. squareSizeY}
          )
        | _ => (acc.direction, acc.boundsBottomRight, acc.boundsTopLeft)
        };
      /*Draw.fill(Utils.color(255, 255, 0, 255), env);
        Draw.rectf(~pos=(x, y), ~width=squareSizeX, ~height=squareSizeY, env);
        Draw.fill(Utils.color(0, 0, 0, 255), env);
        Draw.rectf(
          ~pos=(x +. 2., y +. 2.),
          ~width=squareSizeX -. 4.,
          ~height=squareSizeY -. 4.,
          env
        );*/
      let centeredX = x +. squareSizeX /. 2. -. 40.;
      let centeredY = y +. squareSizeY /. 2. -. 40.;
      if (length - i - 1 === state.equippedGun) {
        Draw.fill(Utils.color(255, 255, 0, 255), env);
        Draw.rectf(~pos=(centeredX, centeredY), ~width=80., ~height=80., env)
      };
      Draw.fill(gun.color, env);
      Draw.rectf(~pos=(centeredX +. 5., centeredY +. 5.), ~width=70., ~height=70., env);
      Draw.subImagef(
        state.mainSpriteSheet,
        ~pos=(centeredX +. 10., centeredY),
        ~width=64.,
        ~height=64.,
        ~texPos=gunTexPos(gun.kind),
        ~texWidth=64,
        ~texHeight=64,
        env
      );
      drawKey(centeredX +. 10., centeredY +. 22., gun, state, env);
      drawHealthBar(
        centeredX +. 5. +. 35.,
        centeredY +. 64.,
        10.,
        68.,
        float_of_int(gun.ammunition),
        float_of_int(gun.maxAmmunition),
        Utils.color(220, 220, 0, 255),
        env
      );
      {
        direction: newDirection,
        boundsTopLeft: newTopLeft,
        boundsBottomRight: newBottomRight,
        pos: {x: x +. newDirection.x *. squareSizeX, y: y +. newDirection.y *. squareSizeY},
        i: i + 1
      }
    },
    {
      pos: {x: padding +. squareSizeX *. 3., y: padding},
      i: 0,
      boundsTopLeft,
      boundsBottomRight,
      direction: {x: 1., y: 0.}
    },
    List.rev(state.guns)
  );
  state
};

run(~setup, ~draw, ());
