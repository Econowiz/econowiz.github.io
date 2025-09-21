import { chromium } from 'playwright';

async function testContentRendering() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  console.log('🔍 Testing content rendering across different projects...\n');
  
  // Test projects with different content formats
  const testProjects = [
    {
      name: 'Intelligent Financial Close',
      url: 'http://localhost:5174/#/project/intelligent-financial-close',
      expectedFormats: ['bullet points with dashes', 'section headings']
    },
    {
      name: 'M&A Valuation',
      url: 'http://localhost:5174/#/project/ma-valuation', 
      expectedFormats: ['bullet points with stars (**)', 'section headings']
    },
    {
      name: 'Cost Optimization',
      url: 'http://localhost:5174/#/project/cost-optimization',
      expectedFormats: ['bullet points with dashes', 'section headings']
    }
  ];
  
  for (const project of testProjects) {
    console.log(`\n📋 Testing: ${project.name}`);
    console.log(`🔗 URL: ${project.url}`);
    
    try {
      await page.goto(project.url, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000); // Wait for content to load
      
      // Check for section headings
      const sectionHeadings = await page.$$eval('h2.card-title', elements => 
        elements.map(el => ({ text: el.textContent.trim(), fontSize: getComputedStyle(el).fontSize }))
      );
      
      // Check for list labels  
      const listLabels = await page.$$eval('h3.small-heading', elements =>
        elements.map(el => ({ text: el.textContent.trim(), fontSize: getComputedStyle(el).fontSize }))
      );
      
      // Check for body paragraphs
      const bodyParagraphs = await page.$$eval('p.body-normal', elements =>
        elements.map(el => ({ text: el.textContent.trim().substring(0, 50) + '...', fontSize: getComputedStyle(el).fontSize }))
      );
      
      // Check for bullet points
      const bulletPoints = await page.$$eval('ul.body-small li', elements =>
        elements.map(el => ({ text: el.textContent.trim().substring(0, 40) + '...', fontSize: getComputedStyle(el).fontSize }))
      );
      
      console.log(`✅ Section Headings (${sectionHeadings.length}):`);
      sectionHeadings.forEach(h => console.log(`   - "${h.text}" (${h.fontSize})`));
      
      console.log(`✅ List Labels (${listLabels.length}):`);
      listLabels.forEach(l => console.log(`   - "${l.text}" (${l.fontSize})`));
      
      console.log(`✅ Body Paragraphs (${bodyParagraphs.length}):`);
      bodyParagraphs.slice(0, 2).forEach(p => console.log(`   - "${p.text}" (${p.fontSize})`));
      
      console.log(`✅ Bullet Points (${bulletPoints.length}):`);
      bulletPoints.slice(0, 3).forEach(b => console.log(`   - "${b.text}" (${b.fontSize})`));
      
      // Check for font size consistency
      const bodyFontSizes = [...new Set(bodyParagraphs.map(p => p.fontSize))];
      const bulletFontSizes = [...new Set(bulletPoints.map(b => b.fontSize))];
      
      console.log(`\n🎯 Font Size Analysis:`);
      console.log(`   Body paragraphs: ${bodyFontSizes.join(', ')}`);
      console.log(`   Bullet points: ${bulletFontSizes.join(', ')}`);
      
      if (bodyFontSizes.length === 1) {
        console.log(`   ✅ Body text font sizes are consistent`);
      } else {
        console.log(`   ❌ Body text font sizes are inconsistent!`);
      }
      
    } catch (error) {
      console.log(`❌ Error testing ${project.name}: ${error.message}`);
    }
  }
  
  console.log('\n🏁 Content rendering test completed!');
  await browser.close();
}

// Run the test
testContentRendering().catch(console.error);
