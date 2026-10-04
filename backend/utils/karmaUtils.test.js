import { test } from 'node:test';
import assert from 'node:assert/strict';
import { addKarma, calculateLevel, calculateProgressToNextLevel, getTitle } from './karmaUtils.js';

test('levels, progress and titles follow the thresholds', () => {
  assert.equal(calculateLevel(0), 1);
  assert.equal(calculateLevel(199), 1);
  assert.equal(calculateLevel(200), 2);
  assert.equal(calculateLevel(2_000_000), 11);
  assert.equal(calculateProgressToNextLevel(50), 25);
  assert.equal(calculateProgressToNextLevel(300), 50);
  assert.equal(calculateProgressToNextLevel(2_000_000), 100);
  assert.equal(getTitle(0), 'Cannon Fodder Cultist');
  assert.equal(getTitle(400), "Dagon's Dishwasher");
  assert.equal(getTitle(2_000_000), 'Supreme Spookster');
});

test('addKarma updates points, level, progress and title together', () => {
  const user = { awards: { karmaPoints: 190, level: 1, progress: 95, title: '' } };
  addKarma(user, 110);
  assert.deepEqual(user.awards, { karmaPoints: 300, level: 2, progress: 50, title: 'Tentacle-Tickler Trainee' });
});
