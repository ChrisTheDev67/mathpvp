// Test script to send winner email immediately
// Run with: node test-email.mjs YOUR_RESEND_API_KEY

const RESEND_API_KEY = process.argv[2];
const ADMIN_EMAIL = 'chris.vkim@icloud.com';
const GRADES = ['1-2', '3-5', '6-9', '10-12'];

if (!RESEND_API_KEY) {
  console.log('Usage: node test-email.mjs YOUR_RESEND_API_KEY');
  console.log('Get your free API key at https://resend.com');
  process.exit(1);
}

const today = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

// Sample winner data for testing
// Some grades have winners, some don't (to test "no winner" message)
const scores = [
  { nickname: 'TinyTiger', score: 200, grade: '1-2' },
  { nickname: 'MathWhiz', score: 350, grade: '3-5' },
  // No winner for 6-9 to test that case
  { nickname: 'CalculusKing', score: 500, grade: '10-12' }
];

console.log('📧 Sending test email to', ADMIN_EMAIL, '...');

// Build HTML content
let winnersHtml = '';

for (const grade of GRADES) {
  const gradeScores = scores.filter(s => s.grade === grade);
  const winner = gradeScores.length > 0 ? gradeScores[0] : null;

  winnersHtml += `
    <div style="margin-bottom: 25px; padding: 20px; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
      <h2 style="color: #6366f1; margin: 0 0 15px 0; font-size: 20px; border-bottom: 2px solid #e0e7ff; padding-bottom: 10px;">
        Grade ${grade}
      </h2>
      ${winner ? `
        <div style="display: flex; align-items: center; justify-content: center;">
          <div style="font-size: 36px; margin-right: 15px;">🥇</div>
          <div style="text-align: left;">
            <h3 style="color: #1e293b; margin: 0; font-size: 22px;">${winner.nickname}</h3>
            <p style="color: #64748b; margin: 5px 0 0 0; font-size: 16px;">Score: <strong style="color: #0891b2;">${winner.score}</strong></p>
          </div>
        </div>
      ` : `
        <p style="text-align: center; color: #94a3b8; font-style: italic; margin: 10px 0;">
          No people won this grade
        </p>
      `}
    </div>
  `;
}

const response = await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${RESEND_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    from: 'Battle Royale <onboarding@resend.dev>', // Note: This only works if sending to your own verified email or if using verified domain
    to: ADMIN_EMAIL,
    subject: `🏆 Battle Royale Results (TEST) - ${today}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1e293b;">
        <h1 style="color: #6366f1; text-align: center; margin-bottom: 10px;">🏆 Daily Results (TEST)</h1>
        <p style="text-align: center; color: #64748b; margin-top: 0; margin-bottom: 30px;">${today}</p>
        
        ${winnersHtml}
        
        <p style="text-align: center; color: #cbd5e1; font-size: 12px; margin-top: 40px;">
          This is a TEST email from Chris's Math Games
        </p>
      </div>
    `
  })
});

if (response.ok) {
  const result = await response.json();
  console.log('✅ Email sent successfully!');
  console.log('📬 Check your inbox at', ADMIN_EMAIL);
} else {
  const error = await response.text();
  console.log('❌ Error:', error);
}
