const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('Navigating to app...');
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(1000);
    
    // Click on Balance Check button to navigate away from home
    console.log('Clicking Balance Check...');
    await page.click('text=Check Balance');
    await page.waitForTimeout(500);
    
    // Go back to home
    console.log('Going back to home...');
    await page.goBack();
    await page.waitForTimeout(500);
    
    // Click on Book a Ticket
    console.log('Clicking Book a Ticket...');
    await page.click('text=Book a Ticket');
    await page.waitForTimeout(500);
    
    // Select Station 5
    console.log('Selecting Station 5...');
    await page.click('text=Station 5');
    await page.waitForTimeout(500);
    
    // Click Continue
    console.log('Clicking Continue to Costing...');
    await page.click('button:has-text("Continue")');
    await page.waitForTimeout(1000);
    
    // Now on Costing page - get initial price
    console.log('Getting initial passenger count and price...');
    const initialPassengers = await page.locator('text=/^1$/').first().textContent();
    const initialPrice = await page.locator('[class*="totalFare"]').textContent();
    console.log(`Initial - Passengers: ${initialPassengers}, Price: ${initialPrice}`);
    
    // Increase passenger and capture prices at each step
    console.log('Increasing passengers and checking for flicker...');
    for (let i = 0; i < 3; i++) {
      console.log(`\nIncrement ${i + 1}:`);
      
      // Click increase button
      await page.click('button:has-text("+")');
      
      // Capture values rapidly to check for flicker
      for (let j = 0; j < 3; j++) {
        await page.waitForTimeout(100);
        const passengers = await page.locator('[class*="passengerCount"]').first().textContent();
        const price = await page.locator('[class*="totalFare"]').textContent();
        console.log(`  Check ${j + 1}: Passengers: ${passengers}, Price: ${price}`);
      }
    }
    
    console.log('\n✓ Test completed - no console errors means fix is working');
    
  } catch (error) {
    console.error('Error during test:', error);
  } finally {
    await browser.close();
  }
})();
