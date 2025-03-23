# Metroid Dread Randomizer Tracker

## How to Use

Select options, then press "Open Tracker". This tracker is controlled with both the left and the right mouse buttons.

### Options

- Progressive Beam: check the box if this preset uses a progressive pickup structure that goes from Power Beam -> Wide Beam -> Plasma Beam -> Wave Beam. If turned off, you will have to find all beams individually.
- Progressive Charge: check the box if this preset uses a progressive pickup structure that goes from No Charge -> Charge Beam -> Diffusion Beam. If turned off, you will have to find both charge upgrades individually.
- Progressive Bomb: check the box if this preset uses a progressive pickup structure that goes from No Bombs -> Morph Ball Bombs -> Cross Bombs. If turned off, you will have to find both bomb upgrades individually.
- Progressive Missile: check the box if this preset uses a progressive pickup structure that goes from Missiles -> Super Missiles -> Ice Missiles. If turned off, you will have to find both missile upgrades individually.
- Progressive Spin: check the box if this preset uses a progressive pickup structure that goes from No Jump Upgrades -> Spin Boost -> Space Jump. If turned off, you will have to find both jump upgrades individually.
- Progressive Suit: check the box if this preset uses a progressive pickup structure that goes from Power Suit -> Varia Suit -> Gravity Suit. If turned off, you will have to find both suit upgrades individually.
- Speed Booster Has Upgrades: check this box if you can obtain Speed Booster upgrades in this preset.
- Flash Shift Has Upgrades: check this box if you can obtain Flash Shift upgrades in this preset.
- Start with Pulse Radar: check this box if this preset starts with Pulse Radar already obtained.
- All Major Bosses Have DNA: check this box if this preset has 12 Metroid DNA pieces, one for each major boss.

### Major Items

Left-click on an item to toggle between obtained and not obtained. For progressive items, left-click to increase the progression by one, or right-click to decrease it by one.

If you get a hint from a Network Station, left-click in the top-left corner to cycle through ZDR's major areas to reflect where the hint said the item was. (You can cycle in reverse by clicking the right mouse button instead.) Alternatively, hover over the item and press the keyboard key associated with the first letter of the area name (e.g. <kbd>A</kbd> for Artaria or <kbd>G</kbd> for Ghavoran).

If you get a Speed Booster or Flash Shift upgrade, left-click in the bottom-right corner to increment your upgrade count (right-click to decrement it).

### Major Bosses

Left-click on a boss to toggle between active and defeated. Right-click on a boss to assign it a DNA.

## Build Requirements

- Node.js 20.x

## How to build

Clone the repository using your preferred git source control tool and run `npm install`, then `npm run dev`.
