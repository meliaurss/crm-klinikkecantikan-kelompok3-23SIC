import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts"

serve(async (req) => {
  try {
    const { user_email, user_name } = await req.json()

    const client = new SmtpClient()
    
    // Konfigurasi koneksi ke Gmail kamu
    await client.connectTLS({
      hostname: "smtp.gmail.com",
      port: 465,
      username: "rahmaindahsiarani@gmail.com", // GANTI DENGAN GMAIL KAMU
      password: "123rose-",  // GANTI DENGAN APP PASSWORD 16 DIGIT
    })

    // Isi email yang akan terkirim
    await client.send({
      from: "The Rose Clinic <rahmaindahsiarani@gmail.com>", // GANTI DENGAN GMAIL KAMU
      to: user_email,
      subject: "Reservasi Berhasil - The Rose Clinic",
      content: `Halo ${user_name}!\n\nReservasi kamu di The Rose Clinic telah berhasil kami terima. Sampai jumpa di klinik!`,
    })

    await client.close()

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    })
  }
})