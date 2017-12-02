open Reprocessing;

let playerSpeed = 4.;

let bulletSpeed = 6.;

type vec2T = {
  x: float,
  y: float
};

type bulletT = {
  pos: vec2T,
  direction: vec2T,
  time: float,
  moveBullet: bulletT => vec2T
};

type achievementStateT =
  | Locked
  | Unlocked;

type gunT = {
  amunition: int,
  color: colorT,
  keyToggle: Reprocessing_Common.KeySet.elt,
  fire: (stateT, Reprocessing_Common.KeySet.elt) => stateT
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
  mainFont: fontT
};

let add = (v1, v2) => {x: v1.x +. v2.x, y: v1.y +. v2.y};

let defaultGun = {
  amunition: 10,
  color: Utils.color(155, 155, 0, 255),
  keyToggle: Num_1,
  fire: (state, direction) => {
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
            {pos: {x: state.pos.x, y: state.pos.y}, direction: dir, moveBullet, time: 0.},
            ...state.playerBullets
          ] :
          state.playerBullets
    }
  }
};

let gunWithSpread = {
  amunition: 10,
  color: Utils.color(0, 255, 0, 255),
  keyToggle: Num_2,
  fire: (state, direction) => {
    let otherSpeed = 2.;
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
            {pos: {x: state.pos.x, y: state.pos.y}, direction: dir1, moveBullet, time: 0.},
            {pos: {x: state.pos.x, y: state.pos.y}, direction: dir2, moveBullet, time: 0.},
            {pos: {x: state.pos.x, y: state.pos.y}, direction: dir3, moveBullet, time: 0.},
            ...state.playerBullets
          ] :
          state.playerBullets
    }
  }
};

let gunWithSine = {
  amunition: 10,
  color: Utils.color(0, 155, 155, 255),
  keyToggle: Num_3,
  fire: (state, direction) => {
    let otherSpeed = 2.;
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
      /*let perpendicular = bullet.direction;*/
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
            {pos: {x: state.pos.x, y: state.pos.y}, direction: dir1, moveBullet, time: 0.},
            {pos: {x: state.pos.x, y: state.pos.y}, direction: dir2, moveBullet, time: 0.},
            {pos: {x: state.pos.x, y: state.pos.y}, direction: dir3, moveBullet, time: 0.},
            ...state.playerBullets
          ] :
          state.playerBullets
    }
  }
};

let gunWithTrail = {
  amunition: 10,
  color: Utils.color(0, 100, 100, 255),
  keyToggle: Num_4,
  fire: (state, direction) => {
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
            {pos: {x: state.pos.x, y: state.pos.y}, direction: dir2, moveBullet, time: 0.},
            {
              pos: add(add({x: state.pos.x, y: state.pos.y}, dir2), dir2),
              direction: dir2,
              moveBullet,
              time: 0.
            },
            {
              pos: add(add(add(add({x: state.pos.x, y: state.pos.y}, dir2), dir2), dir2), dir2),
              direction: dir2,
              moveBullet,
              time: 0.
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
  condition: (state, env) => Env.keyPressed(B, env)
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

let setup = (env) => {
  Env.size(~width=1280, ~height=720, env);
  {
    pos: {x: 50., y: 50.},
    equippedGun: 0,
    guns: [defaultGun],
    playerBullets: [],
    achievements: [achievement1],
    mainFont: Draw.loadFont(~filename="assets/font/font.fnt", ~isPixel=true, env)
  }
};

let draw = (state, env) => {
  Draw.background(Utils.color(~r=199, ~g=217, ~b=229, ~a=255), env);
  Draw.fill(Utils.color(~r=41, ~g=166, ~b=244, ~a=255), env);
  Draw.rectMode(Corner, env);
  let state =
    Env.key(A, env) ? {...state, pos: {x: state.pos.x -. playerSpeed, y: state.pos.y}} : state;
  let state =
    Env.key(D, env) ? {...state, pos: {x: state.pos.x +. playerSpeed, y: state.pos.y}} : state;
  let state =
    Env.key(W, env) ? {...state, pos: {x: state.pos.x, y: state.pos.y -. playerSpeed}} : state;
  let state =
    Env.key(S, env) ? {...state, pos: {x: state.pos.x, y: state.pos.y +. playerSpeed}} : state;
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
  let state = Env.keyPressed(Up, env) ? curGun.fire(state, Up) : state;
  let state = Env.keyPressed(Down, env) ? curGun.fire(state, Down) : state;
  let state = Env.keyPressed(Left, env) ? curGun.fire(state, Left) : state;
  let state = Env.keyPressed(Right, env) ? curGun.fire(state, Right) : state;
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
  Draw.rectf(~pos=(state.pos.x, state.pos.y), ~width=30., ~height=30., env);
  List.iter(
    ({pos, direction: _}) => {
      Draw.fill(Utils.color(~r=41, ~g=166, ~b=244, ~a=255), env);
      Draw.rectf(~pos=(pos.x, pos.y), ~width=5., ~height=5., env)
    },
    state.playerBullets
  );
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
