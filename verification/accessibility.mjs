import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome',headless:true});const page=await browser.newPage({viewport:{width:1280,height:900}});
try{await page.goto('http://localhost:4173');await page.keyboard.press('Tab');assert.equal(await page.locator(':focus').textContent(),'Skip to workspace');await page.keyboard.press('Enter');assert.equal(await page.locator(':focus').getAttribute('id'),'main');
await page.locator('[data-action="demo"]').first().click();await page.locator('#plan-form button').click();await page.locator('[data-action="build-start"]').click();await page.locator('[data-action="cancel-build"]').click();await page.getByText('Build paused. Your work is safe.').waitFor();await page.locator('[data-action="build-start"]').click();await page.locator('.sample-app').waitFor();
await page.locator('[data-action="about"]').first().click();await page.keyboard.press('Escape');assert.equal(await page.locator('#modal').evaluate(x=>x.open),false);
await page.evaluate(()=>document.documentElement.style.fontSize='32px');await page.screenshot({path:'verification/06-text-enlargement.png',fullPage:true});const size=await page.evaluate(()=>({client:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));console.log(JSON.stringify({keyboardSkip:true,dialogEscape:true,buildCancelRetry:true,text200Percent:size}));await fs.writeFile('verification/accessibility-results.json',JSON.stringify({keyboardSkip:true,dialogEscape:true,buildCancelRetry:true,text200Percent:size,limitations:'Targeted smoke checks, not a WCAG certification or screen-reader audit.'},null,2));assert(size.scroll<=size.client+1);
}finally{await browser.close();}
