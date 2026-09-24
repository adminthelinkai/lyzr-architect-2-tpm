import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const click=async action=>page.locator(`[data-action="${action}"]`).first().click();
const nav=async route=>{await page.locator(`nav a[href="#${route}"]`).click();};
const text=async value=>{await page.getByText(value,{exact:false}).first().waitFor();};
try{
 await page.goto('http://localhost:4173');await page.screenshot({path:'verification/01-home-desktop.png',fullPage:true});
 await click('demo');await page.locator('#plan-form button[type="submit"]').click();await click('build-start');await page.locator('.sample-app').waitFor();
 await page.locator('#change-request').fill('Add Teams alerts');await page.locator('#chat-form button[type="submit"]').click();await page.screenshot({path:'verification/02-change-impact-desktop.png',fullPage:true});await click('apply');await text('Team alerts on');
 await nav('test');await page.locator('#test-form button').click();await text('Knowledge connection is missing.');
 await nav('data');for(const key of ['knowledge','teams']){await page.locator(`[data-action="connect"][data-key="${key}"]`).click();if(key==='teams'){await click('deny');await text('Permission denied.');await page.locator('[data-action="connect"][data-key="teams"]').click();}await click('grant');}
 await nav('test');await page.locator('#test-form button').click();await text('Passed');await nav('deploy');await page.locator('#release-scenario').selectOption('fail');await page.locator('#deploy-form button').click();await text('Release paused.');await click('retry-deploy');await text('Your demo release is ready.');await page.screenshot({path:'verification/03-release-desktop.png',fullPage:true});
 await nav('build');await page.locator('#change-request').fill('Set response to 12 hours');await page.locator('#chat-form button').click();await click('apply');await nav('test');await page.locator('#test-form button').click();await nav('deploy');await page.locator('#deploy-form button').click();await text('Your demo release is ready.');await click('rollback');await click('confirm-rollback');await nav('build');assert.match(await page.locator('.sample-stats').innerText(),/24/);
 await page.reload();await page.locator('.sample-app').waitFor();assert.match(await page.locator('.sample-stats').innerText(),/24/);
 await nav('home');await click('import');await page.locator('#import-json').fill('invalid');await page.locator('#import-form button').click();await text('This is not valid JSON');assert.equal(await page.locator('#import-json').inputValue(),'invalid');await click('load-sample');await page.locator('#import-form button').click();await text('MODEL_API_KEY');
 await page.locator('[data-action="work-tab"][data-value="code"]').click();const config=JSON.parse(await page.locator('#config-json').inputValue());config.reviewBelow=90;await page.locator('#config-json').fill(JSON.stringify(config,null,2));await page.locator('#config-form button').click();await click('apply');
 await nav('github');await click('github-connect');await click('authorize-github');await click('conflict');assert.equal(await page.locator('[data-action="sync"]').isDisabled(),true);await click('resolve-remote');await click('sync');await page.screenshot({path:'verification/04-developer-github.png',fullPage:true});
 await nav('data');for(const key of ['knowledge','model']){await page.locator(`[data-action="connect"][data-key="${key}"]`).click();await click('grant');}await nav('test');await page.locator('#scenario').selectOption('timeout');await page.locator('#test-form button').click();await text('sample provider timed out');await page.locator('#scenario').selectOption('suite');await page.locator('#test-form button').click();await nav('deploy');await page.locator('#deploy-form button').click();await text('Your demo release is ready.');
 await page.setViewportSize({width:390,height:844});await nav('build');await page.locator('[data-action="mode"][data-value="guided"]').click();await page.screenshot({path:'verification/05-workspace-mobile.png',fullPage:true});
 const overflow=[];for(const route of ['home','templates','plan','build','structure','agents','data','test','github','deploy','history','settings']){await nav(route);const geometry=await page.evaluate(()=>({width:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));if(geometry.scroll>geometry.width+1)overflow.push({route,...geometry});}
 await nav('settings');await click('reset');await click('confirm-reset');await page.locator('#new-project').waitFor();await page.reload();assert.equal(await page.locator('.project-card').count(),0);
 await page.keyboard.press('Tab');
 const result={date:new Date().toISOString(),browser:'Isolated local Chrome (headless fallback; in-app browser failed to start)',journeys:['A: plan → build → impact → missing/denied connections → test → failed release → retry → second release → rollback → reload','B: invalid import → sample import → code edit → conflict recovery → timeout → retry suite → release'],viewports:['1440×1000','390×844'],pageErrors:errors,horizontalOverflow:overflow,resetVerified:true};
 await fs.writeFile('verification/browser-results.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));assert.deepEqual(errors,[]);assert.deepEqual(overflow,[]);
}finally{await browser.close();}
