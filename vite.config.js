import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Serves api/order.js during `npm run dev`.
 *
 * Vercel runs that file as a serverless function in production, but Vite knows
 * nothing about /api — without this the delivery form cannot be exercised
 * locally at all, it would just 404 and fall through to the backup channel.
 *
 * If TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID are unset (the normal local case)
 * the outbound call is stubbed once at startup and the message is printed to
 * this terminal instead, so you can read exactly what the admin group would
 * receive. Production is untouched: `apply: "serve"` keeps this out of builds.
 */
const devOrderApi = () => ({
  name: 'dev-order-api',
  apply: 'serve',
  configureServer(server) {
    const dryRun = !process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID

    if (dryRun) {
      process.env.TELEGRAM_BOT_TOKEN ||= 'dev-dry-run'
      process.env.TELEGRAM_CHAT_ID ||= 'dev-dry-run'
      const realFetch = globalThis.fetch
      globalThis.fetch = async (url, init) => {
        if (!String(url).includes('api.telegram.org')) return realFetch(url, init)
        const { text } = JSON.parse(init.body)
        server.config.logger.info(
          `\n─── [dev] Telegram (не отправлено, нет токена) ───\n${text}\n───\n`
        )
        return { ok: true, json: async () => ({ ok: true }) }
      }
    }

    server.middlewares.use('/api/order', async (req, res) => {
      const chunks = []
      for await (const chunk of req) chunks.push(chunk)
      try {
        req.body = chunks.length ? JSON.parse(Buffer.concat(chunks).toString()) : {}
      } catch {
        req.body = {}
      }
      // The handler is written against Vercel's express-like res helpers.
      res.status = (code) => ((res.statusCode = code), res)
      res.json = (payload) => {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(payload))
        return res
      }

      try {
        const { default: handler } = await server.ssrLoadModule('/api/order.js')
        await handler(req, res)
      } catch (error) {
        server.config.logger.error(`[dev-order-api] ${error.stack ?? error.message}`)
        res.status(500).json({ ok: false, error: 'dev_handler_failed' })
      }
    })
  },
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), devOrderApi()],
})
