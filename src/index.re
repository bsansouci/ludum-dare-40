open Reprocessing;

let animatingAchievementMaxTime = 3.2;

let fringePos = 30.;

let playerSpeed = 150.;

let mapSize = 10;

let mapSizePx = float_of_int(mapSize * 64);

let bulletSpeed = 400.;

let defaultRange = 400.;

let scale = 2.;

let directions: list(Reprocessing_Events.keycodeT) = [Up, Down, Left, Right];

let invulnerabilityTime = 1.0;

let deathCountdown = 1.0;

/* let invulnerabilityTime = 1.0; */
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

let enemyTexPos = (kind, isDead) =>
  switch (kind, isDead) {
  | (Normal1Z, false) => [(917, 0), (965, 0)]
  | (Normal2Z, false) => [(1206, 0), (1254, 0)]
  | (Normal3Z, false) => [(1348, 0), (1396, 0)]
  | (BigZ, false) => [(1062, 0), (1110, 0)]
  | (TallZ, false) => [(1493, 0), (1541, 0)]
  | (Normal1Z, true) => [(1904, 0)]
  | (Normal2Z, true) => [(2094, 0)] /* TODO: replace with special death anims? */
  | (Normal3Z, true) => [(2189, 0)]
  | (BigZ, true) => [(2000, 0)]
  | (TallZ, true) => [(2288, 0)]
  };

type enemyT = {
  maxHealth: float,
  health: float,
  pos: vec2T,
  error: vec2T,
  speed: float,
  damage: float,
  deathCountdown: float,
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
  | Uzi => (1655, (-3))
  };

type crateT = {
  pos: vec2T,
  kind: gunKindT
};

type keyToggleT = {
  primaryKey: Reprocessing_Events.keycodeT,
  modifier: bool
};

type rankT =
  | Poor
  | Common
  | Rare
  | Epic
  | Legendary;

type statsT = {
  normalEnemiesKilled: int,
  bigEnemiesKilled: int,
  tallEnemiesKilled: int,
  numberOfBulletsFired: int,
  damageDone: float,
  stepTaken: float,
  numberOfShotgunShots: int,
  numberOfWeaponSwaps: int
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
  rank: rankT,
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
  mutable health: float,
  mutable invulnCountdown: float,
  playerBullets: list(bulletT),
  achievements: list(achievementT),
  crates: list(crateT),
  mainFont: fontT,
  mainSpriteSheet: imageT,
  sounds: StringMap.t((soundT, float)),
  enemies: list(enemyT),
  waveNum: int,
  nextWaveCountdown: float,
  elapsedTime: float,
  animatingAchievementTime: float,
  animatingAchievement: option(achievementT),
  animatingWaveNumberTime: float,
  running: bool,
  shiftIcon: imageT,
  stats: statsT
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
    stats: {...state.stats, numberOfBulletsFired: state.stats.numberOfBulletsFired + 1},
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
    stats: {...state.stats, numberOfBulletsFired: state.stats.numberOfBulletsFired + 3},
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
    stats: {...state.stats, numberOfBulletsFired: state.stats.numberOfBulletsFired + 3},
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
    stats: {...state.stats, numberOfBulletsFired: state.stats.numberOfBulletsFired + 1},
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
    stats: {...state.stats, numberOfBulletsFired: state.stats.numberOfBulletsFired + 3},
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
      stats: {...state.stats, numberOfBulletsFired: state.stats.numberOfBulletsFired + 1},
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
    stats: {
      ...state.stats,
      numberOfBulletsFired: state.stats.numberOfBulletsFired + List.length(newBullets),
      numberOfShotgunShots: state.stats.numberOfShotgunShots + 1
    },
    playerBullets: newBullets @ state.playerBullets
  }
};

let generateGun = {
  let keyCount = ref(0);
  let keySet = ref([]);
  let totalNumberOfKeys = 61;
  let getNextGunKey: unit => option(keyToggleT) =
    () =>
      if (List.length(keySet^) >= totalNumberOfKeys) {
        None
      } else {
        keyCount := keyCount^ + 1;
        let ret =
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
            let key = ref(Utils.random(0, totalNumberOfKeys));
            while (List.mem(key^, keySet^)) {
              key := Utils.random(0, totalNumberOfKeys)
            };
            keySet := [key^, ...keySet^];
            switch key^ {
            | 0 => {primaryKey: Q, modifier: false}
            | 1 => {primaryKey: E, modifier: false}
            | 2 => {primaryKey: R, modifier: false}
            | 3 => {primaryKey: T, modifier: false}
            | 4 => {primaryKey: Y, modifier: false}
            | 5 => {primaryKey: U, modifier: false}
            | 6 => {primaryKey: O, modifier: false}
            | 7 => {primaryKey: P, modifier: false}
            | 8 => {primaryKey: OpenBracket, modifier: false}
            | 9 => {primaryKey: CloseBracket, modifier: false}
            | 10 => {primaryKey: F, modifier: false}
            | 11 => {primaryKey: G, modifier: false}
            | 12 => {primaryKey: H, modifier: false}
            | 13 => {primaryKey: J, modifier: false}
            | 14 => {primaryKey: K, modifier: false}
            | 15 => {primaryKey: L, modifier: false}
            | 16 => {primaryKey: Semicolon, modifier: false}
            | 17 => {primaryKey: Num_9, modifier: true}
            | 18 => {primaryKey: Z, modifier: false}
            | 19 => {primaryKey: X, modifier: false}
            | 20 => {primaryKey: C, modifier: false}
            | 21 => {primaryKey: V, modifier: false}
            | 22 => {primaryKey: B, modifier: false}
            | 23 => {primaryKey: N, modifier: false}
            | 24 => {primaryKey: M, modifier: false}
            | 25 => {primaryKey: Comma, modifier: false}
            | 26 => {primaryKey: Period, modifier: false}
            | 27 => {primaryKey: Q, modifier: true}
            | 28 => {primaryKey: E, modifier: true}
            | 29 => {primaryKey: R, modifier: true}
            | 30 => {primaryKey: T, modifier: true}
            | 31 => {primaryKey: Y, modifier: true}
            | 32 => {primaryKey: U, modifier: true}
            | 33 => {primaryKey: O, modifier: true}
            | 34 => {primaryKey: P, modifier: true}
            | 35 => {primaryKey: OpenBracket, modifier: true}
            | 36 => {primaryKey: CloseBracket, modifier: true}
            | 37 => {primaryKey: F, modifier: true}
            | 38 => {primaryKey: G, modifier: true}
            | 39 => {primaryKey: H, modifier: true}
            | 40 => {primaryKey: J, modifier: true}
            | 41 => {primaryKey: K, modifier: true}
            | 42 => {primaryKey: L, modifier: true}
            | 43 => {primaryKey: Semicolon, modifier: true}
            | 44 => {primaryKey: Num_8, modifier: true}
            | 45 => {primaryKey: Z, modifier: true}
            | 46 => {primaryKey: X, modifier: true}
            | 47 => {primaryKey: C, modifier: true}
            | 48 => {primaryKey: V, modifier: true}
            | 49 => {primaryKey: B, modifier: true}
            | 50 => {primaryKey: N, modifier: true}
            | 51 => {primaryKey: M, modifier: true}
            | 52 => {primaryKey: Comma, modifier: true}
            | 53 => {primaryKey: Period, modifier: true}
            | 54 => {primaryKey: Num_1, modifier: true}
            | 55 => {primaryKey: Num_2, modifier: true}
            | 56 => {primaryKey: Num_3, modifier: true}
            | 57 => {primaryKey: Num_4, modifier: true}
            | 58 => {primaryKey: Num_5, modifier: true}
            | 59 => {primaryKey: Num_6, modifier: true}
            | 60 => {primaryKey: Num_7, modifier: true}
            | _ => assert false
            }
          };
        Some(ret)
      };
  (state) =>
    switch (getNextGunKey()) {
    | None => state.guns
    | Some(keyToggle) =>
      let maxAmmunition = Utils.randomf(0., 1.);
      let (damage, fireRate) =
        if (state.waveNum < 3) {
          (Utils.randomf(0., 0.7), Utils.randomf(0., 0.7))
        } else {
          (Utils.randomf(0., 1.), Utils.randomf(0., 1.))
        };
      let gunRank = damage +. fireRate;
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
              Utils.lerpf(200., 1200., damage)
            ),
            Utils.lerpf(0.7, 0.5, fireRate),
            Utils.lerp(1, 10, maxAmmunition),
            "shotgun"
          )
        | 2 => (
            Rifle,
            makeBurstFire(bulletSpeed, Utils.lerpf(200., 1200., damage)),
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
            makeLaserFire(bulletSpeed -. 200., Utils.lerpf(50., 250., damage)),
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
      let (rank, color) =
        if (gunRank > 0. && gunRank < 0.1) {
          (Poor, Utils.color(188, 191, 187, 255))
        } else if (gunRank > 0.1 && gunRank < 1.1) {
          (Common, Utils.color(62, 245, 21, 255))
        } else if (gunRank > 1.1 && gunRank < 1.7) {
          (Rare, Utils.color(47, 119, 214, 255))
        } else if (gunRank > 1.7 && gunRank < 1.9) {
          (Epic, Utils.color(173, 28, 221, 255))
        } else {
          (Legendary, Utils.color(247, 133, 12, 255))
        };
      [
        {
          ammunition: maxAmmunition,
          maxAmmunition,
          fireRate,
          lastShotTime: 0.,
          keyToggle,
          soundName,
          fire,
          kind,
          color,
          rank
        },
        ...state.guns
      ]
    }
};

let generateAchievements = () => {
  let rec loop = (acc, i) =>
    if (i <= 0) {
      [
        {
          state: Locked,
          condition: (state, _env) => state.stats.stepTaken >= 800.,
          message: "You walked your first 100 steps!"
        },
        ...acc
      ]
    } else {
      loop(
        [
          {
            state: Locked,
            condition: (state, _env) => state.stats.stepTaken >= 10000. *. float_of_int(i),
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
            condition: (state, _env) => state.stats.numberOfBulletsFired >= 100 * i,
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
      acc
    } else {
      loop(
        [
          {
            state: Locked,
            condition: (state, _env) => state.stats.numberOfWeaponSwaps >= 10 * Utils.pow(2, i),
            message: Printf.sprintf("You swapped guns more than %d times!", 10 * Utils.pow(2, i))
          },
          ...acc
        ],
        i - 1
      )
    };
  let achievements = loop(achievements, 15);
  let rec loop = (acc, i) =>
    if (i <= 0) {
      acc
    } else {
      loop(
        [
          {
            state: Locked,
            condition: (state, _env) => state.stats.numberOfShotgunShots >= 10 * i,
            message: Printf.sprintf("You fired the shotgun %d times!", 10 * i)
          },
          ...acc
        ],
        i - 1
      )
    };
  let achievements = loop(achievements, 15);
  let rec loop = (acc, i) =>
    if (i <= 0) {
      [
        {
          state: Locked,
          condition: (state, _env) => state.stats.normalEnemiesKilled >= 1,
          message: "You killed your first zombie!"
        },
        {
          state: Locked,
          condition: (state, _env) => state.stats.tallEnemiesKilled >= 1,
          message: "You killed your first Runner!"
        },
        {
          state: Locked,
          condition: (state, _env) => state.stats.bigEnemiesKilled >= 1,
          message: "You killed your first Biggy!"
        },
        ...acc
      ]
    } else {
      loop(
        [
          {
            state: Locked,
            condition: (state, _env) => state.stats.normalEnemiesKilled >= Utils.pow(2, i),
            message: Printf.sprintf("You killed %d zombies!", Utils.pow(2, i))
          },
          {
            state: Locked,
            condition: (state, _env) => state.stats.bigEnemiesKilled >= Utils.pow(2, i),
            message: Printf.sprintf("You killed %d Biggies!", Utils.pow(2, i))
          },
          {
            state: Locked,
            condition: (state, _env) => state.stats.tallEnemiesKilled >= Utils.pow(2, i),
            message: Printf.sprintf("You killed %d Runners!", Utils.pow(2, i))
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
    | {primaryKey: Q} => "Q"
    | {primaryKey: E} => "E"
    | {primaryKey: R} => "R"
    | {primaryKey: T} => "T"
    | {primaryKey: Y} => "Y"
    | {primaryKey: U} => "U"
    | {primaryKey: O} => "O"
    | {primaryKey: P} => "P"
    | {primaryKey: OpenBracket} => "["
    | {primaryKey: CloseBracket} => "]"
    | {primaryKey: F} => "F"
    | {primaryKey: G} => "G"
    | {primaryKey: H} => "H"
    | {primaryKey: J} => "J"
    | {primaryKey: K} => "K"
    | {primaryKey: L} => "L"
    | {primaryKey: Semicolon} => ";"
    | {primaryKey: Z} => "Z"
    | {primaryKey: X} => "X"
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
    Draw.subImage(
      state.shiftIcon,
      (int_of_float(x) - 2, int_of_float(y) + 17),
      17,
      17,
      (0, 0),
      277,
      277,
      env
    );
    Draw.text(state.mainFont, " " ++ body, (int_of_float(x) + 6, int_of_float(y) + 10), env)
  }
};

let generateWave = (state) => {
  let enemyCount = Utils.random(10, 15);
  let rec list_init = (acc, f, i) =>
    if (i <= 0) {
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
      error: {x: 0., y: 0.},
      deathCountdown
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
      error: {x: 0., y: 0.},
      deathCountdown
    }
  };
  let enemies = list_init(state.enemies, makeEnemy, enemyCount);
  let startWaveForMiniBosses = 2;
  let enemies =
    if (state.waveNum == startWaveForMiniBosses) {
      list_init(enemies, makeMiniBosses, 2)
    } else if (state.waveNum > startWaveForMiniBosses) {
      let n = max(0, Utils.random(0, state.waveNum));
      list_init(enemies, makeMiniBosses, n)
    } else {
      enemies
    };
  let crateCount = state.waveNum > startWaveForMiniBosses - 1 ? Utils.random(0, 2) : 0;
  let makeCrate = () => {
    pos: {x: Utils.randomf(50., mapSizePx -. 50.), y: Utils.randomf(50., mapSizePx -. 50.)},
    kind: Obj.magic(Utils.random(0, 8))
  };
  {
    ...state,
    enemies,
    crates: list_init(state.crates, makeCrate, crateCount),
    waveNum: state.waveNum + 1,
    nextWaveCountdown: 60.,
    animatingWaveNumberTime: 3.
  }
};

let drawHealthBar = (x, y, h, w, health, maxHealth, color, ~border=2., env) => {
  let xOffset = w /. 2.;
  let halfBorder = border /. 2.;
  /*let (border, border2) = border ? (1., 2.) : (0., 0.);*/
  /*let border2 = 0.;*/
  Draw.fill(Constants.black, env);
  Draw.rectf(
    ~pos=(x -. xOffset -. halfBorder, y -. halfBorder),
    ~width=w +. border,
    ~height=h +. border,
    env
  );
  let healthW = Utils.remapf(~value=health, ~low1=0., ~high1=maxHealth, ~low2=0., ~high2=w);
  Draw.fill(color, env);
  Draw.rectf(~pos=(x -. xOffset, y), ~width=healthW, ~height=h, env)
};

let soundNames = [
  ("emptygun", 1.0),
  ("reload", 1.0),
  ("machinegun_singleshot", 0.4),
  ("machinegun_threeshots", 0.4),
  ("laser", 0.3),
  ("aliengun_threeshots", 1.0),
  ("shotgun", 1.0),
  ("theme", 0.9),
  ("hurt", 1.0),
  ("achievement", 1.0),
  ("zombie_one", 1.0),
  ("zombie_two", 1.0),
  ("zombie_three", 1.0),
  ("new_wave", 1.0)
];

let playSound = (name, sounds, ~loop=false, env) =>
  switch (StringMap.find(name, sounds)) {
  | (s, volume) => Env.playSound(s, ~loop, ~volume, env)
  | exception Not_found => print_endline("Couldn't find sound " ++ name)
  };

let setup = (env) => {
  Env.size(~width=1120, ~height=650, env);
  let loadSound = (soundMap: StringMap.t((soundT, float)), (soundName: string, volume)) =>
    StringMap.add(
      soundName,
      (Env.loadSound(Printf.sprintf("assets/sounds/%s.wav", soundName), env), volume),
      soundMap
    );
  let sounds = List.fold_left(loadSound, StringMap.empty, soundNames);
  playSound("theme", sounds, ~loop=true, env);
  {
    pos: {x: 400., y: 400.},
    facingLeft: true,
    moving: false,
    equippedGun: (-1),
    guns: [],
    health: 50.,
    invulnCountdown: 0.,
    playerBullets: [],
    achievements: generateAchievements(),
    crates: [],
    mainFont: Draw.loadFont(~filename="assets/molot/font.fnt", env),
    mainSpriteSheet: Draw.loadImage(~filename="assets/spritesheet.png", ~isPixel=true, env),
    shiftIcon: Draw.loadImage(~filename="assets/shift_icon.png", env),
    sounds,
    enemies: [
      {
        pos: {x: 100., y: 250.},
        damage: 100.,
        kind: Normal1Z,
        health: 100.,
        maxHealth: 100.,
        speed: 70.,
        error: {x: 5., y: 5.},
        deathCountdown
      }
    ],
    stats: {
      normalEnemiesKilled: 0,
      bigEnemiesKilled: 0,
      tallEnemiesKilled: 0,
      numberOfBulletsFired: 0,
      damageDone: 0.,
      stepTaken: 0.,
      numberOfShotgunShots: 0,
      numberOfWeaponSwaps: 0
    },
    elapsedTime: 0.,
    animatingAchievementTime: 0.,
    animatingAchievement: None,
    animatingWaveNumberTime: 0.,
    waveNum: 0,
    nextWaveCountdown: 10.,
    running: true
  }
};

let drawForest = (state, env) => {
  Draw.fill(Utils.color(~r=43, ~g=82, ~b=69, ~a=255), env);
  for (i in 1 to mapSize - 2) {
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
  };
  let maxX = float_of_int(mapSize - 1) *. 63.;
  for (i in 0 to mapSize - 2) {
    Draw.pushMatrix(env);
    Draw.translate(maxX +. 7., float_of_int(i) *. 64. +. 22., env);
    Draw.rotate(-. Constants.pi /. 2., env);
    Draw.rectf(~pos=(0., 125.), ~height=(-64.), ~width=65., env);
    Draw.subImagef(
      state.mainSpriteSheet,
      ~pos=(0., 0.),
      ~height=64.,
      ~width=(-65.),
      ~texPos=(540, 0),
      ~texWidth=64,
      ~texHeight=64,
      env
    );
    Draw.popMatrix(env)
  };
  Draw.rectf(
    ~pos=(maxX +. 67., float_of_int(mapSize - 1) *. 64. +. 22.),
    ~height=(-64.),
    ~width=65.,
    env
  );
  Draw.rectf(
    ~pos=(maxX +. 67., float_of_int(mapSize) *. 64. +. 22.),
    ~height=(-64.),
    ~width=65.,
    env
  );
  Draw.rectf(
    ~pos=(maxX +. 67., float_of_int(mapSize + 1) *. 64. +. 22.),
    ~height=(-64.),
    ~width=65.,
    env
  );
  Draw.pushMatrix(env);
  Draw.translate(maxX +. 9., (-41.), env);
  Draw.rotate(Constants.pi *. 3. /. 2., env);
  Draw.subImagef(
    state.mainSpriteSheet,
    ~pos=(0., 0.),
    ~height=64.,
    ~width=(-64.),
    ~texPos=(276, 0),
    ~texWidth=64,
    ~texHeight=64,
    env
  );
  Draw.popMatrix(env);
  for (i in 1 to mapSize - 2) {
    Draw.rectf(~pos=(float_of_int(i) *. 63., 20. +. mapSizePx), ~height=64., ~width=65., env);
    Draw.subImagef(
      state.mainSpriteSheet,
      ~pos=(float_of_int(i) *. 64., (-44.) +. mapSizePx),
      ~height=64.,
      ~width=64.,
      ~texPos=(540, 0),
      ~texWidth=64,
      ~texHeight=64,
      env
    )
  };
  Draw.rectf(~pos=(0., 20. +. mapSizePx), ~height=64., ~width=65., env);
  Draw.rectf(~pos=((-64.), 20. +. mapSizePx), ~height=64., ~width=65., env);
  Draw.rectf(~pos=((-64.), 20. +. mapSizePx -. 64.), ~height=64., ~width=65., env);
  Draw.subImagef(
    state.mainSpriteSheet,
    ~pos=(mapSizePx -. 1., (-42.) +. mapSizePx),
    ~height=64.,
    ~width=(-64.),
    ~texPos=(276, 0),
    ~texWidth=64,
    ~texHeight=64,
    env
  );
  for (i in 0 to mapSize - 2) {
    Draw.pushMatrix(env);
    Draw.translate(64., float_of_int(i) *. 64. +. 22., env);
    Draw.rotate(Constants.pi /. 2., env);
    Draw.rectf(~pos=(0., 125.), ~height=(-64.), ~width=65., env);
    Draw.subImagef(
      state.mainSpriteSheet,
      ~pos=(0., 0.),
      ~height=64.,
      ~width=65.,
      ~texPos=(540, 0),
      ~texWidth=64,
      ~texHeight=64,
      env
    );
    Draw.popMatrix(env)
  };
  Draw.pushMatrix(env);
  Draw.translate(64., (-41.), env);
  Draw.rotate(-. Constants.pi *. 3. /. 2., env);
  Draw.subImagef(
    state.mainSpriteSheet,
    ~pos=(0., 0.),
    ~height=64.,
    ~width=64.,
    ~texPos=(276, 0),
    ~texWidth=64,
    ~texHeight=64,
    env
  );
  Draw.popMatrix(env);
  Draw.subImagef(
    state.mainSpriteSheet,
    ~pos=(0., (-42.) +. mapSizePx),
    ~height=64.,
    ~width=64.,
    ~texPos=(276, 0),
    ~texWidth=64,
    ~texHeight=64,
    env
  );
  Draw.rectf(~pos=((-64.), (-32.)), ~height=64., ~width=65., env);
  Draw.rectf(~pos=((-64.), (-32.) -. 64.), ~height=64., ~width=65., env);
  Draw.rectf(~pos=(0., (-32.) -. 64.), ~height=64., ~width=65., env)
  /*Draw.rectf(~pos=(-64., 20. +. mapSizePx), ~height=64., ~width=65., env);*/
  /*Draw.rectf(~pos=(-64., 20. +. mapSizePx -. 64.), ~height=64., ~width=65., env);*/
};

let backgroundTileGrid = {
  let grid = Array.make_matrix(mapSize, mapSize, 0);
  for (_ in 0 to 300) {
    let x = Utils.random(0, mapSize);
    let y = Utils.random(0, mapSize);
    grid[x][y] = Utils.random(1, 4)
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

let rec handleGunSwitching = (state, guns, i, env) =>
  switch guns {
  | [] => state
  | [gun, ...guns] =>
    handleGunSwitching(
      Env.keyPressed(gun.keyToggle.primaryKey, env)
      && (gun.keyToggle.modifier ? Env.key(LeftShift, env) : ! Env.key(LeftShift, env)) ?
        {
          ...state,
          equippedGun: i,
          stats: {
            ...state.stats,
            numberOfWeaponSwaps:
              i != state.equippedGun ?
                state.stats.numberOfWeaponSwaps + 1 : state.stats.numberOfWeaponSwaps
          }
        } :
        state,
      guns,
      i + 1,
      env
    )
  };

let draw = (state, env) => {
  let dt = Env.deltaTime(env);
  Draw.background(Utils.color(~r=43, ~g=82, ~b=69, ~a=255), env);
  Draw.fill(Utils.color(~r=41, ~g=166, ~b=244, ~a=255), env);
  Draw.rectMode(Corner, env);
  let state = Env.keyPressed(Escape, env) ? {...state, running: ! state.running} : state;
  let state =
    if (state.running && state.health > 0.) {
      let offset = {x: 0., y: 0.};
      let numZombies = List.length(state.enemies);
      if (Random.float(1.) +. float_of_int(numZombies) *. 0.00005 > 0.995) {
        let num =
          switch (Random.int(3)) {
          | 0 => "one"
          | 1 => "two"
          | _ => "three"
          };
        playSound("zombie_" ++ num, state.sounds, env)
      };
      if (state.invulnCountdown > 0.) {
        state.invulnCountdown = max(0., state.invulnCountdown -. dt)
      } else {
        List.iter(
          (e: enemyT) =>
            if (state.invulnCountdown <= 0.
                && e.health >= 1.
                && Utils.intersectRectRect(
                     ~rect1Pos=(state.pos.x -. 20., state.pos.y -. 20.),
                     ~rect1W=40.,
                     ~rect1H=40.,
                     ~rect2Pos=(e.pos.x -. 20., e.pos.y -. 20.),
                     ~rect2W=40.,
                     ~rect2H=40.
                   )) {
              state.invulnCountdown = invulnerabilityTime;
              state.health = max(state.health -. e.damage *. dt, 0.);
              playSound("hurt", state.sounds, env)
            },
          state.enemies
        )
      };
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
            stats: {...state.stats, stepTaken: state.stats.stepTaken +. playerSpeedDt}
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
              playSound("reload", state.sounds, env);
              {
                ...state,
                guns:
                  List.map(
                    (gun) =>
                      gun.kind === crate.kind ? {...gun, ammunition: gun.maxAmmunition} : gun,
                    state.guns
                  )
              }
            } else {
              {...state, crates: [crate, ...state.crates]}
            },
          {...state, crates: []},
          state.crates
        );
      let state = handleGunSwitching(state, state.guns, 0, env);
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
              playSound(curGun.soundName, state.sounds, env);
              fireGun(state)
            } else {
              state
            }
          } else if (state.elapsedTime
                     -. curGun.lastShotTime > curGun.fireRate
                     && curGun.ammunition === 0) {
            if (List.exists((dir) => Env.key(dir, env), directions)) {
              playSound("emptygun", state.sounds, env);
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
              playSound("achievement", state.sounds, env);
              /*let state = {...state, guns: generateGun(state)};*/
              /*let state = {...state, guns: generateGun(state)};
              let state = {...state, guns: generateGun(state)};
              let state = {...state, guns: generateGun(state)};
              let state = {...state, guns: generateGun(state)};
              let state = {...state, guns: generateGun(state)};
              let state = {...state, guns: generateGun(state)};
              let state = {...state, guns: generateGun(state)};
              let state = {...state, guns: generateGun(state)};*/
              {
                ...state,
                guns: generateGun(state),
                equippedGun: state.equippedGun + 1,
                animatingAchievementTime: animatingAchievementMaxTime,
                animatingAchievement: Some(achievement),
                running: false,
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
              enemy.health >= 1. ?
                {
                  ...enemy,
                  pos: {
                    x: enemy.pos.x +. dx +. enemy.error.x *. dt,
                    y: enemy.pos.y +. dy +. enemy.error.y *. dt
                  },
                  error
                } :
                enemy
            },
            state.enemies
          )
      };
      let state =
        List.fold_left(
          (state, bullet: bulletT) => {
            let rec hurtEnemies = (acc, enemies: list(enemyT)) =>
              switch enemies {
              | [] => (false, acc)
              | [e, ...rest] =>
                if (e.health > 1.
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
                    acc
                    @ [{...e, health: e.health -. bullet.damage *. Env.deltaTime(env)}, ...rest]
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
              stats: {
                ...state.stats,
                damageDone:
                  didHit ?
                    state.stats.damageDone +. bullet.damage *. Env.deltaTime(env) :
                    state.stats.damageDone
              },
              playerBullets: bullets,
              enemies
            }
          },
          {...state, playerBullets: []},
          state.playerBullets
        );
      let state =
        if (List.length(state.guns) > 0 && List.for_all((gun) => gun.ammunition === 0, state.guns)) {
          playSound("reload", state.sounds, env);
          {...state, guns: List.map((gun) => {...gun, ammunition: gun.maxAmmunition}, state.guns)}
        } else {
          state
        };
      let state = {...state, nextWaveCountdown: state.nextWaveCountdown -. Env.deltaTime(env)};
      let state =
        if (state.nextWaveCountdown <= 0. || List.length(state.enemies) === 0) {
          playSound("new_wave", state.sounds, env);
          generateWave(state)
        } else {
          state
        };
      /* Increase death timers */
      let state = {
        ...state,
        enemies:
          List.map(
            (e: enemyT) => e.health < 1. ? {...e, deathCountdown: e.deathCountdown -. dt} : e,
            state.enemies
          )
      };
      /* Do some math for stats */
      let state =
        List.fold_left(
          (state, enemy: enemyT) =>
            if (enemy.deathCountdown <= 0.) {
              switch enemy.kind {
              | Normal1Z
              | Normal2Z
              | Normal3Z => {
                  ...state,
                  stats: {...state.stats, normalEnemiesKilled: state.stats.normalEnemiesKilled + 1}
                }
              | BigZ => {
                  ...state,
                  stats: {...state.stats, bigEnemiesKilled: state.stats.bigEnemiesKilled + 1}
                }
              | TallZ => {
                  ...state,
                  stats: {...state.stats, tallEnemiesKilled: state.stats.tallEnemiesKilled + 1}
                }
              }
            } else {
              {...state, enemies: [enemy, ...state.enemies]}
            },
          {...state, enemies: []},
          state.enemies
        );
      state
    } else {
      state
    };
  let state =
    if (state.animatingAchievement == None) {
      state
    } else if (state.animatingAchievementTime -. Env.deltaTime(env) <= 0.) {
      {...state, animatingAchievement: None, animatingAchievementTime: 0.}
    } else {
      {...state, animatingAchievementTime: state.animatingAchievementTime -. Env.deltaTime(env)}
    };
  let state =
    if (state.animatingWaveNumberTime > 0.) {
      {
        ...state,
        animatingWaveNumberTime: max(0., state.animatingWaveNumberTime -. Env.deltaTime(env))
      }
    } else {
      state
    };
  Draw.pushMatrix(env);
  Draw.scale(scale, scale, env);
  Draw.translate(
    -. state.pos.x +. float_of_int(Env.width(env)) /. (2. *. scale),
    -. state.pos.y +. float_of_int(Env.height(env)) /. (2. *. scale),
    env
  );
  for (y in 0 to mapSize - 1) {
    for (x in 0 to mapSize - 1) {
      let id = backgroundTileGrid[y][x];
      let texPos =
        switch id {
        | 0 => (474, 0)
        | 1 => (408, 0)
        | 2 => (1722, 0)
        | _ => (1788, 0)
        };
      Draw.subImagef(
        state.mainSpriteSheet,
        ~pos=(float_of_int(x) *. 63., float_of_int(y) *. 64.),
        ~height=64.,
        ~width=64.,
        ~texPos,
        ~texWidth=64,
        ~texHeight=64,
        env
      )
    }
  };
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
      let animList = enemyTexPos(enemy.kind, enemy.health < 1.);
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
      if (enemy.health < 1.) {
        Draw.tint(
          Utils.color(255, 255, 255, int_of_float(enemy.deathCountdown /. deathCountdown *. 255.)),
          env
        )
      };
      if (enemy.pos.x > state.pos.x || enemy.health < 1.) {
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
      if (enemy.health >= 1.) {
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
      Draw.noTint(env)
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
      ~pos=(crate.pos.x -. 16., crate.pos.y -. 16. +. yOffset),
      ~width=32.,
      ~height=32.,
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
            if (truncate(state.stats.stepTaken /. 20.) mod 2 == 1) {
              (128, 0)
            } else {
              (224, 0)
            }
          } else {
            (180, 0)
          };
        if (state.invulnCountdown > 0.) {
          Draw.tint(
            Utils.color(
              200,
              100,
              100,
              truncate(sin(state.invulnCountdown *. 10.) *. 100. +. 155.)
            ),
            env
          )
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
        };
        Draw.noTint(env)
      },
    sortedAllThings
  );
  drawForest(state, env);
  Draw.popMatrix(env);
  let length = List.length(state.guns);
  drawHealthBar(
    160.,
    35.,
    30.,
    250.,
    state.health,
    50.,
    Utils.color(220, 0, 0, 255),
    ~border=5.,
    env
  );
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
    let threshold = 1.0;
    let startX = float_of_int((Env.width(env) - 50) / 2);
    let startY = 200.;
    let endX = 50.;
    let endY = 70.;
    let t = state.animatingWaveNumberTime;
    let (x, y) =
      if (t > threshold) {
        (startX, startY)
      } else {
        (
          Utils.remapf(t, 0., threshold, endX, startX),
          Utils.remapf(t, 0., threshold, endY, startY)
        )
      };
    Draw.text(
      ~font=state.mainFont,
      ~body=Printf.sprintf("Wave %d", state.waveNum),
      ~pos=(int_of_float(x), int_of_float(y)),
      env
    );
    if (t <= 0.) {
      Draw.text(
        ~font=state.mainFont,
        ~body=Printf.sprintf("Next wave in %d", truncate(state.nextWaveCountdown)),
        ~pos=(50, 100),
        env
      )
    }
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
  let getNextGunIterator = (acc: gunIterationT) => {
    let x = acc.pos.x;
    let y = acc.pos.y;
    let (newDirection, newBottomRight, newTopLeft) =
      switch acc.direction {
      | {x: 1., y: 0.} when x +. squareSizeX > acc.boundsBottomRight.x => (
          {x: 0., y: 1.0},
          {...acc.boundsBottomRight, x: acc.boundsBottomRight.x -. squareSizeX},
          acc.boundsTopLeft
        )
      | {x: 0., y: 1.0} when y +. squareSizeY +. 10. > acc.boundsBottomRight.y => (
          {x: (-1.), y: 0.0},
          {...acc.boundsBottomRight, y: acc.boundsBottomRight.y -. squareSizeY},
          acc.boundsTopLeft
        )
      | {x: (-1.), y: 0.0} when x -. squareSizeX +. 10. < acc.boundsTopLeft.x => (
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
    {
      ...acc,
      direction: newDirection,
      boundsTopLeft: newTopLeft,
      boundsBottomRight: newBottomRight,
      pos: {x: x +. newDirection.x *. squareSizeX, y: y +. newDirection.y *. squareSizeY}
    }
  };
  let gunsLength = List.length(state.guns);
  let lastGunIterator =
    List.fold_left(
      ({pos: {x, y}, i} as acc, gun) =>
        if (state.animatingAchievement == None || i < gunsLength - 1) {
          let centeredX = x +. squareSizeX /. 2. -. 40.;
          let centeredY = y +. squareSizeY /. 2. -. 40.;
          if (length - i - 1 === state.equippedGun) {
            Draw.fill(Utils.color(255, 255, 0, 255), env);
            Draw.rectf(~pos=(centeredX, centeredY), ~width=80., ~height=80., env)
          };
          /*Draw.fill(Utils.color(55, 55, 55, 150), env);
            Draw.rectf(~pos=(centeredX +. 3., centeredY +. 3.), ~width=74., ~height=74., env);*/
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
            11.,
            70.,
            float_of_int(gun.ammunition),
            float_of_int(gun.maxAmmunition),
            Utils.color(220, 220, 0, 255),
            ~border=0.,
            env
          );
          let newAcc = getNextGunIterator(acc);
          {...newAcc, i: i + 1}
        } else {
          acc
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
  let state =
    switch state.animatingAchievement {
    | None => state
    | Some(achievement) =>
      /* Still handle gun switching! */
      let state = handleGunSwitching(state, state.guns, 0, env);
      let width = 550.;
      let height = 300.;
      let opacity = 255;
      let x = float_of_int(Env.width(env)) /. 2.;
      let y = float_of_int(Env.height(env)) /. 2.;
      let threshold1 = 2.8;
      let threshold2 = 1.;
      let t = state.animatingAchievementTime;
      let (width, height, opacity, opacity2) =
        if (state.animatingAchievementTime > threshold1) {
          let width =
            Utils.remapf(t, threshold1, animatingAchievementMaxTime, width, width -. 100.);
          let height =
            Utils.remapf(t, threshold1, animatingAchievementMaxTime, height, height -. 100.);
          let opacity =
            int_of_float(Utils.remapf(t, threshold1, animatingAchievementMaxTime, 255., 155.));
          (width, height, opacity, opacity)
        } else if (t > threshold2) {
          (width, height, opacity, opacity)
        } else {
          let opacity = int_of_float(Utils.remapf(t, 0., threshold2, 0., 255.));
          (width, height, opacity, 255)
        };
      Draw.fill(Utils.color(70, 70, 20, opacity), env);
      Draw.stroke(Utils.color(30, 30, 20, opacity), env);
      Draw.rectf(~pos=(x -. width /. 2., y -. height /. 2.), ~width, ~height, env);
      let gun = List.hd(state.guns);
      let kindName =
        switch gun.rank {
        | Poor => "POOR"
        | Common => "COMMON"
        | Rare => "RARE"
        | Epic => "EPIC"
        | Legendary => "LEGENDARY"
        };
      Draw.tint(Utils.color(255, 255, 255, opacity), env);
      Draw.text(
        ~font=state.mainFont,
        ~body=Printf.sprintf("Unlocked achievement"),
        ~pos=(int_of_float(x -. 130.), int_of_float(y -. 130.)),
        env
      );
      Draw.tint(
        Utils.color(
          int_of_float(gun.color.r *. 255.),
          int_of_float(gun.color.g *. 255.),
          int_of_float(gun.color.b *. 255.),
          opacity
        ),
        env
      );
      Draw.text(
        ~font=state.mainFont,
        ~body=Printf.sprintf("Quality: %s", kindName),
        ~pos=(int_of_float(x -. 80.), int_of_float(y -. 100.)),
        env
      );
      Draw.tint(Utils.color(255, 255, 255, opacity), env);
      let startGunSize = 128.;
      let endGunSize = 64.;
      let startX = x -. (startGunSize +. 12.) /. 2.;
      let startY = y -. 50.;
      Draw.text(
        ~font=state.mainFont,
        ~body=achievement.message,
        ~pos=(int_of_float(x -. width /. 2. +. 20.), int_of_float(y +. 100.)),
        env
      );
      let it = lastGunIterator;
      let endX = it.pos.x +. squareSizeX /. 2. -. 40.;
      let endY = it.pos.y +. squareSizeY /. 2. -. 40.;
      let centeredX =
        if (t > threshold1) {
          startX
        } else if (t > threshold2) {
          startX
        } else {
          Utils.remapf(t, 0., threshold2, endX, startX)
        };
      let (centeredY, gunSize) =
        if (t > threshold1) {
          (startY, startGunSize)
        } else if (t > threshold2) {
          (startY, startGunSize)
        } else {
          (
            Utils.remapf(t, 0., threshold2, endY, startY),
            Utils.remapf(t, 0., threshold2, endGunSize, startGunSize)
          )
        };
      Draw.noStroke(env);
      if (0 == state.equippedGun) {
        Draw.fill(Utils.color(255, 255, 0, 255), env);
        Draw.rectf(~pos=(centeredX, centeredY), ~width=gunSize +. 16., ~height=gunSize +. 16., env)
      };
      Draw.fill(gun.color, env);
      Draw.rectf(
        ~pos=(centeredX +. 5., centeredY +. 5.),
        ~width=gunSize +. 6.,
        ~height=gunSize +. 6.,
        env
      );
      Draw.tint(Utils.color(255, 255, 255, opacity2), env);
      Draw.subImagef(
        state.mainSpriteSheet,
        ~pos=(centeredX +. 10., centeredY),
        ~width=gunSize,
        ~height=gunSize,
        ~texPos=gunTexPos(gun.kind),
        ~texWidth=64,
        ~texHeight=64,
        env
      );
      drawKey(centeredX +. 10., centeredY +. gunSize -. 42., gun, state, env);
      drawHealthBar(
        centeredX +. 8. +. gunSize /. 2.,
        centeredY +. gunSize,
        11.,
        gunSize +. 6.,
        float_of_int(gun.ammunition),
        float_of_int(gun.maxAmmunition),
        Utils.color(220, 220, 0, 255),
        ~border=0.,
        env
      );
      Draw.noTint(env);
      t > 0.4 ? state : {...state, running: true}
    };
  if (! state.running && state.animatingAchievement == None) {
    let gameoverW = 160;
    let gameoverH = 100;
    let windowX = (Env.width(env) - gameoverW) / 2;
    let windowY = (Env.height(env) - gameoverH) / 2 - 100;
    Draw.fill(Constants.black, env);
    Draw.rect(~pos=(windowX - 2, windowY - 2), ~width=gameoverW + 4, ~height=gameoverH + 4, env);
    Draw.fill(Utils.color(244, 167, 66, 255), env);
    Draw.rect(~pos=(windowX, windowY), ~width=gameoverW, ~height=gameoverH, env);
    Draw.text(~font=state.mainFont, ~body="PAUSED", ~pos=(windowX + 38, windowY + 36), env)
  };
  let maxNumberOfGunsToFillScreen = 69;
  if (state.health <= 0. || List.length(state.guns) >= maxNumberOfGunsToFillScreen) {
    let gameoverW = 300;
    let gameoverH = 300;
    Draw.fill(Utils.color(244, 167, 66, 255), env);
    Draw.stroke(Utils.color(86, 56, 16, 255), env);
    let windowX = (Env.width(env) - gameoverW) / 2;
    let windowY = (Env.height(env) - gameoverH) / 2;
    Draw.rect(~pos=(windowX, windowY), ~width=gameoverW, ~height=gameoverH, env);
    if (List.length(state.guns) >= maxNumberOfGunsToFillScreen) {
      Draw.tint(Utils.color(58, 232, 27, 255), env);
      Draw.text(
        ~font=state.mainFont,
        ~body="Congratulations",
        ~pos=(windowX + 47, windowY + 20),
        env
      );
      Draw.text(~font=state.mainFont, ~body="You Win!", ~pos=(windowX + 95, windowY + 50), env);
      Draw.noTint(env)
    } else {
      Draw.tint(Utils.color(232, 58, 27, 255), env);
      Draw.text(~font=state.mainFont, ~body="Game Over", ~pos=(windowX + 80, windowY + 40), env);
      Draw.noTint(env)
    };
    Draw.text(
      ~font=state.mainFont,
      ~body="You made it to",
      ~pos=(windowX + 54, windowY + 110),
      env
    );
    Draw.text(
      ~font=state.mainFont,
      ~body=Printf.sprintf("wave %d!", state.waveNum),
      ~pos=(windowX + 105, windowY + 140),
      env
    );
    let buttonX = windowX + 85;
    let buttonY = windowY + 200;
    let buttonW = 120;
    let buttonH = 50;
    Draw.fill(Utils.color(101, 198, 55, 255), env);
    Draw.stroke(Utils.color(86, 56, 16, 255), env);
    Draw.rect(~pos=(buttonX, buttonY), ~width=buttonW, ~height=buttonH, env);
    Draw.text(~font=state.mainFont, ~body="restart", ~pos=(buttonX + 10, buttonY + 10), env);
    Draw.noStroke(env);
    let (mx, my) = Env.mouse(env);
    if (Env.mousePressed(env)
        && mx > buttonX
        && mx < buttonX
        + buttonW
        && my > buttonY
        && my < buttonY
        + buttonH) {
      {
        ...state,
        pos: {x: 400., y: 400.},
        facingLeft: true,
        moving: false,
        equippedGun: (-1),
        guns: [],
        health: 50.,
        invulnCountdown: 0.,
        playerBullets: [],
        achievements: generateAchievements(),
        crates: [],
        enemies: [
          {
            pos: {x: 100., y: 250.},
            damage: 100.,
            kind: Normal1Z,
            health: 100.,
            maxHealth: 100.,
            speed: 70.,
            error: {x: 5., y: 5.},
            deathCountdown
          }
        ],
        stats: {
          normalEnemiesKilled: 0,
          bigEnemiesKilled: 0,
          tallEnemiesKilled: 0,
          numberOfBulletsFired: 0,
          damageDone: 0.,
          stepTaken: 0.,
          numberOfShotgunShots: 0,
          numberOfWeaponSwaps: 0
        },
        elapsedTime: 0.,
        animatingAchievementTime: 0.,
        animatingAchievement: None,
        waveNum: 0,
        nextWaveCountdown: 10.,
        running: true
      }
    } else {
      state
    }
  } else {
    state
  }
};

run(~setup, ~draw, ());
