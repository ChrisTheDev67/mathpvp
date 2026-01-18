// Supabase Edge Function: Daily Winner Email
// Sends an email with the Battle Royale winners for all grades at midnight Pacific Time

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
const ADMIN_EMAIL = 'chris.vkim@icloud.com'

const GRADES = ['1-2', '3-5', '6-9', '10-12']

interface WinnerData {
  nickname: string
  score: number
  grade: string
  played_at: string
}

Deno.serve(async (req) => {
  try {
    // Create Supabase client with service role for full access
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!)

    // Get today's date range (Pacific Time)
    const now = new Date()
    const todayStart = new Date(now)
    todayStart.setHours(0, 0, 0, 0)

    const yesterdayStart = new Date(todayStart)
    yesterdayStart.setDate(yesterdayStart.getDate() - 1)

    // Query for all scores from yesterday
    const { data: scores, error } = await supabase
      .from('lottery_scores')
      .select('nickname, score, grade, played_at')
      .gte('played_at', yesterdayStart.toISOString())
      .lt('played_at', todayStart.toISOString())
      .order('score', { ascending: false })

    if (error) {
      throw new Error(`Database error: ${error.message}`)
    }

    const dateStr = yesterdayStart.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    // Process winners for each grade
    let winnersHtml = ''

    for (const grade of GRADES) {
      // Find top score for this grade
      const gradeScores = scores?.filter(s => s.grade === grade) || []
      const winner = gradeScores.length > 0 ? gradeScores[0] : null // Already ordered by score desc

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
      `
    }

    // Send email via Resend
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Battle Royale <onboarding@resend.dev>', // Should use verified domain in prod
        to: ADMIN_EMAIL,
        subject: `🏆 Battle Royale Results - ${dateStr}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1e293b;">
            <h1 style="color: #6366f1; text-align: center; margin-bottom: 10px;">🏆 Daily Results</h1>
            <p style="text-align: center; color: #64748b; margin-top: 0; margin-bottom: 30px;">${dateStr}</p>
            
            ${winnersHtml}
            
            <p style="text-align: center; color: #cbd5e1; font-size: 12px; margin-top: 40px;">
              This is an automated message from Chris's Math Games
            </p>
          </div>
        `
      })
    })

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text()
      throw new Error(`Resend API error: ${errorData}`)
    }

    const emailResult = await emailResponse.json()
    console.log('Email sent successfully:', emailResult)

    return new Response(JSON.stringify({
      success: true,
      emailId: emailResult.id
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    })

  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    })
  }
})
