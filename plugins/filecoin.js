import { FilecoinNumber } from '@glif/filecoin-number'
import Vue from 'vue'
Vue.prototype.atto2Fil = function (atto) {
  const filecoinNumber = new FilecoinNumber(atto, 'attofil')
  return filecoinNumber.toFil()
}
