import { env } from '@sentre/senhub'
import manifest from './manifest.config'
import register from './register.config'

const configs = {
  manifest: manifest[env],
  register: register[env],
}

/**
 * Module exports
 */
export default configs
