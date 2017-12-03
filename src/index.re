open Reprocessing;

let playerSpeed = 200.;

let mapSize = 20;

let mapSizePx = float_of_int(mapSize * 64);

let bulletSpeed = 600.;

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

type enemyT = {
  maxHealth: float,
  health: float,
  pos: vec2T,
  speed: float
};

type gunT = {
  amunition: int,
  color: colorT,
  keyToggle: Reprocessing_Common.KeySet.elt,
  fire: (stateT, float, Reprocessing_Common.KeySet.elt) => stateT,
  damage: float
}
and achievementT = {
  gun: gunT,
  state: achievementStateT,
  condition: (stateT, glEnvT) => bool
}
and stateT = {
  pos: vec2T,
  guns: list(gunT),
  equippedGun: int,
  playerBullets: list(bulletT),
  achievements: list(achievementT),
  mainFont: fontT,
  mainSpriteSheet: imageT,
  enemies: list(enemyT),
  enemiesKilled: int,
  numberOfBulletsFired: int,
  damageDone: float,
  stepTaken: float,
  elapsedTime: float
};

let add = (v1, v2) => {x: v1.x +. v2.x, y: v1.y +. v2.y};

let rec defaultGun = {
  amunition: 10,
  damage: 400.,
  color: Utils.color(155, 155, 0, 255),
  keyToggle: Num_1,
  fire: (state, deltaTime, direction) => {
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
              {...gun, amunition: max(gun.amunition - 1, 0)}
            } else {
              gun
            },
          state.guns
        ),
      playerBullets:
        List.nth(state.guns, state.equippedGun).amunition > 0 ?
          [
            {
              pos: {x: state.pos.x, y: state.pos.y},
              direction: dir,
              moveBullet,
              time: 0.,
              damage: defaultGun.damage
            },
            ...state.playerBullets
          ] :
          state.playerBullets
    }
  }
};

let rec gunWithSpread = {
  amunition: 10,
  damage: 400.,
  color: Utils.color(0, 255, 0, 255),
  keyToggle: Num_2,
  fire: (state, deltaTime, direction) => {
    let otherSpeed = 100. *. deltaTime;
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
              {...gun, amunition: max(gun.amunition - 1, 0)}
            } else {
              gun
            },
          state.guns
        ),
      playerBullets:
        List.nth(state.guns, state.equippedGun).amunition > 0 ?
          [
            {
              pos: {x: state.pos.x, y: state.pos.y},
              direction: dir1,
              moveBullet,
              time: 0.,
              damage: gunWithSpread.damage
            },
            {
              pos: {x: state.pos.x, y: state.pos.y},
              direction: dir2,
              moveBullet,
              time: 0.,
              damage: gunWithSpread.damage
            },
            {
              pos: {x: state.pos.x, y: state.pos.y},
              direction: dir3,
              moveBullet,
              time: 0.,
              damage: gunWithSpread.damage
            },
            ...state.playerBullets
          ] :
          state.playerBullets
    }
  }
};

let rec gunWithSine = {
  amunition: 10,
  damage: 400.,
  color: Utils.color(0, 155, 155, 255),
  keyToggle: Num_3,
  fire: (state, deltaTime, direction) => {
    let otherSpeed = 100. *. deltaTime;
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
              {...gun, amunition: max(gun.amunition - 1, 0)}
            } else {
              gun
            },
          state.guns
        ),
      playerBullets:
        List.nth(state.guns, state.equippedGun).amunition > 0 ?
          [
            {
              pos: {x: state.pos.x, y: state.pos.y},
              direction: dir1,
              moveBullet,
              time: 0.,
              damage: gunWithSine.damage
            },
            {
              pos: {x: state.pos.x, y: state.pos.y},
              direction: dir2,
              moveBullet,
              time: 0.,
              damage: gunWithSine.damage
            },
            {
              pos: {x: state.pos.x, y: state.pos.y},
              direction: dir3,
              moveBullet,
              time: 0.,
              damage: gunWithSine.damage
            },
            ...state.playerBullets
          ] :
          state.playerBullets
    }
  }
};

let rec gunWithTrail = {
  amunition: 10,
  damage: 400.,
  color: Utils.color(0, 100, 100, 255),
  keyToggle: Num_4,
  fire: (state, deltaTime, direction) => {
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
              {...gun, amunition: max(gun.amunition - 1, 0)}
            } else {
              gun
            },
          state.guns
        ),
      playerBullets:
        List.nth(state.guns, state.equippedGun).amunition > 0 ?
          [
            {
              pos: {x: state.pos.x, y: state.pos.y},
              direction: dir2,
              moveBullet,
              time: 0.,
              damage: gunWithTrail.damage
            },
            {
              pos: add(add({x: state.pos.x, y: state.pos.y}, dir2), dir2),
              direction: dir2,
              moveBullet,
              time: 0.,
              damage: gunWithTrail.damage
            },
            {
              pos: add(add(add(add({x: state.pos.x, y: state.pos.y}, dir2), dir2), dir2), dir2),
              direction: dir2,
              moveBullet,
              time: 0.,
              damage: gunWithTrail.damage
            },
            ...state.playerBullets
          ] :
          state.playerBullets
    }
  }
};

let achievement1 = {
  gun: gunWithSpread,
  state: Locked,
  condition: (state, _env) => state.numberOfBulletsFired >= 10
};

let achievement2 = {
  gun: gunWithSine,
  state: Locked,
  condition: (_state, env) => Env.keyPressed(C, env)
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
    | _ => assert false
    };
  Draw.text(state.mainFont, body, (int_of_float(x), int_of_float(y) + 10), env)
};

let spawnEnemies = (state) =>
  if (Utils.random(0, 10) === 0) {
    let pos =
      switch (Utils.random(0, 4)) {
      | 0 => {x: Utils.randomf(0., mapSizePx), y: (-30.)}
      | 1 => {x: mapSizePx +. 30., y: Utils.randomf(0., mapSizePx)}
      | 2 => {x: Utils.randomf(0., mapSizePx), y: mapSizePx +. 30.}
      | 3 => {x: (-30.), y: Utils.randomf(0., mapSizePx)}
      | _ => assert false
      };
    let enemy = {pos, health: 100., maxHealth: 100., speed: 100.};
    {...state, enemies: [enemy, ...state.enemies]}
  } else {
    state
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
    pos: {x: 50., y: 50.},
    equippedGun: 0,
    guns: [defaultGun],
    playerBullets: [],
    achievements: [achievement1, achievement2],
    mainFont: Draw.loadFont(~filename="assets/font/font.fnt", env),
    mainSpriteSheet: Draw.loadImage(~filename="assets/spritesheet.png", ~isPixel=true, env),
    enemies: [{health: 100., maxHealth: 100., pos: {x: 200., y: 200.}, speed: 30.}],
    enemiesKilled: 0,
    numberOfBulletsFired: 0,
    damageDone: 0.,
    stepTaken: 0.,
    elapsedTime: 0.
  }
};

let draw = (state, env) => {
  Draw.background(Utils.color(~r=199, ~g=217, ~b=229, ~a=255), env);
  Draw.fill(Utils.color(~r=41, ~g=166, ~b=244, ~a=255), env);
  Draw.rectMode(Corner, env);
  let prevPos = state.pos;
  let state = {
    let state =
      Env.key(A, env) ?
        {...state, pos: {x: state.pos.x -. playerSpeed *. Env.deltaTime(env), y: state.pos.y}} :
        state;
    let state =
      if (state.pos.x < 0.
          || state.pos.x > mapSizePx
          || state.pos.y < 0.
          || state.pos.y > mapSizePx) {
        {...state, pos: prevPos}
      } else {
        state
      };
    let prevPos = state.pos;
    let state =
      Env.key(D, env) ?
        {...state, pos: {x: state.pos.x +. playerSpeed *. Env.deltaTime(env), y: state.pos.y}} :
        state;
    let state =
      if (state.pos.x < 0.
          || state.pos.x > mapSizePx
          || state.pos.y < 0.
          || state.pos.y > mapSizePx) {
        {...state, pos: prevPos}
      } else {
        state
      };
    let prevPos = state.pos;
    let state =
      Env.key(W, env) ?
        {...state, pos: {x: state.pos.x, y: state.pos.y -. playerSpeed *. Env.deltaTime(env)}} :
        state;
    let state =
      if (state.pos.x < 0.
          || state.pos.x > mapSizePx
          || state.pos.y < 0.
          || state.pos.y > mapSizePx) {
        {...state, pos: prevPos}
      } else {
        state
      };
    let prevPos = state.pos;
    let state =
      Env.key(S, env) ?
        {...state, pos: {x: state.pos.x, y: state.pos.y +. playerSpeed *. Env.deltaTime(env)}} :
        state;
    let state =
      if (state.pos.x < 0.
          || state.pos.x > mapSizePx
          || state.pos.y < 0.
          || state.pos.y > mapSizePx) {
        {...state, pos: prevPos}
      } else {
        state
      };
    state
  };
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
  let curGun = List.nth(state.guns, state.equippedGun);
  let state = Env.keyPressed(Up, env) ? curGun.fire(state, Env.deltaTime(env), Up) : state;
  let state = Env.keyPressed(Down, env) ? curGun.fire(state, Env.deltaTime(env), Down) : state;
  let state = Env.keyPressed(Left, env) ? curGun.fire(state, Env.deltaTime(env), Left) : state;
  let state = Env.keyPressed(Right, env) ? curGun.fire(state, Env.deltaTime(env), Right) : state;
  let state = {
    ...state,
    elapsedTime: state.elapsedTime +. Env.deltaTime(env),
    stepTaken: state.stepTaken +. Utils.distf((prevPos.x, prevPos.y), (state.pos.x, state.pos.y))
  };
  /*print_string(
    Format.sprintf
      ("Print: %f\n")
      (state.stepTaken)
  );*/
  let state = spawnEnemies(state);
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
          {
            ...state,
            guns: [achievement.gun, ...state.guns],
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
          let dx = (state.pos.x -. enemy.pos.x) /. size *. enemy.speed *. Env.deltaTime(env);
          let dy = (state.pos.y -. enemy.pos.y) /. size *. enemy.speed *. Env.deltaTime(env);
          {...enemy, pos: {x: enemy.pos.x +. dx, y: enemy.pos.y +. dy}}
        },
        state.enemies
      )
  };
  /* TODO: bullet health? */
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
  Draw.translate(
    -. state.pos.x +. float_of_int(Env.width(env)) /. 2.,
    -. state.pos.y +. float_of_int(Env.height(env)) /. 2.,
    env
  );
  for (i in 0 to mapSize) {
    for (j in 0 to mapSize) {
      Draw.subImagef(
        state.mainSpriteSheet,
        ~pos=(float_of_int(i) *. 63., float_of_int(j) *. 64.),
        ~height=64.,
        ~width=64.,
        ~texPos=(266, 0),
        ~texWidth=64,
        ~texHeight=64,
        env
      )
    }
  };
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
    (enemy: enemyT) => {
      Draw.subImagef(
        state.mainSpriteSheet,
        ~pos=(enemy.pos.x -. 20., enemy.pos.y -. 32.),
        ~width=40.,
        ~height=64.,
        ~texPos=(585, 0),
        ~texWidth=40,
        ~texHeight=64,
        env
      );
      drawHealthBar(
        enemy.pos.x +. 5.,
        enemy.pos.y -. 35.,
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
  List.iter(
    ({pos, direction: _}) => {
      Draw.fill(Constants.black, env);
      Draw.rectf(~pos=(pos.x, pos.y), ~width=5., ~height=5., env)
    },
    state.playerBullets
  );
  Draw.popMatrix(env);
  ignore @@
  List.fold_left(
    ((x, y, i), gun) => {
      Draw.fill(gun.color, env);
      Draw.rectf(~pos=(x +. 25., y +. 5.), ~width=40., ~height=40., env);
      if (i === state.equippedGun) {
        Draw.fill(Utils.color(255, 0, 0, 255), env);
        Draw.rectf(~pos=(x +. 35., y +. 15.), ~width=20., ~height=20., env)
      };
      Draw.text(
        state.mainFont,
        string_of_int(gun.amunition),
        (int_of_float(x) + 70, int_of_float(y) + 10),
        env
      );
      drawKey(x, y, gun, state, env);
      (x, y +. 50., i + 1)
    },
    (10., 20., 0),
    state.guns
  );
  state
};

run(~setup, ~draw, ());
