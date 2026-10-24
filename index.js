/**
 * Host half of the DSH·Mine workbench bundle.
 *
 * The work is entirely in the browser: the Client module owns the brand,
 * dashboard, settings section and preference store. The bundle still needs a
 * Host row so the plugin manager can install and inventory it.
 *
 * @module dsh-mine-workbench
 */

/**
 * Activate the bundle.
 *
 * @param {import('@deepseek-ai/cordis').Context} ctx
 * @returns {void}
 */
export function apply(_ctx) {
  // The visible workbench is the Client bundle. Nothing to do on the Host.
}
