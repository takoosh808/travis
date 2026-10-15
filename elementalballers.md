# Elemental Ballers

Lightweight pseudo-3D basketball prototype built with Phaser 3, TypeScript, and Vite.

## Development

Install Docker with Docker Compose, then run from the repository root:

```sh
docker compose up --build
```

Open http://localhost:5173. Source is mounted into the container; Vite reloads changes automatically. Polling supports Docker Desktop file sharing. Dependencies live in a named volume and are synchronized from the lockfile on startup.

Stop with `Ctrl+C`, then `docker compose down`. To also remove the dependency volume, use `docker compose down -v`.

Without Docker, use Node.js 22.12+ or 24+:

```sh
npm ci
npm run dev
```

## Validation

```sh
docker compose exec game npm run typecheck
docker compose exec game npm run build
```

The same npm commands work locally after `npm ci`. Build includes the TypeScript check and outputs production assets to `dist/`. Production nginx packaging is a later milestone.

## Current milestone

A fixed 960×540 scene scales to fit the window with pixel-art rendering. A shallow perspective court has a hoop centered on each left/right baseline, a Base Ninja placeholder, and a loose basketball you can pick up and dribble.

- A/D: move left/right.
- W/S: move toward the back/front of the court.
- Shift: sprint in any direction.
- Space: jump (press again after landing; holding does not repeat).
- E: pick up a nearby loose ball while within reach of the floor.
- F: hold to charge a shot, then release near the green timing mark. Facing left/right selects that basket.

Diagonal movement is normalized. The player stays inside the floor boundaries, can move while airborne, and changes size with floor depth. Jump height moves the ninja above its floor shadow; floor depth controls draw order. The carried ball bounces beside the ninja, switches sides with facing, and is held while airborne. Its shadow stays on the floor. A compact prompt shows pickup availability and possession. Shots use a release-time probability roll based on timing, distance, movement, sprinting, and airborne movement. The ball automatically arcs to the selected rim: timing changes probability, not aim. Made baskets score 2 or 3 based on floor distance; the training scoreboard tracks points at each basket. Both makes and misses drop, bounce, and become available for E pickup. Passing, defenders, layups, dunks, and airborne rebounds are not implemented yet. All artwork uses generated shapes, with no external assets or physics engine.

`src/game/config/gameConfig.ts` defines the canvas. `courtConfig.ts` defines the floor and projection; `gameBalance.ts` holds movement and jump settings. `src/game/entities/Player.ts` owns player state and movement; `src/game/input/InputManager.ts` maps keys to actions. `src/game/entities/Basketball.ts` owns pickup, possession, and dribble rendering. `src/game/scenes/MatchScene.ts` draws the scene and orchestrates updates.

Backboards have projected faces and thickness, elliptical rims, and tapered nets, sharing the ball’s projection and rim coordinates. `ShootingSystem.ts` handles charging, outcome selection, and scoring; `shotChance.ts` holds the probability calculation; `ShotHud.ts` renders the meter and scoreboard. Balance values live in `gameBalance.ts`. All shots currently show OPEN because there is no defender.

Next: airborne rebound pickup, then a simple defender and shot contests. See the project context and instructions for design constraints.
