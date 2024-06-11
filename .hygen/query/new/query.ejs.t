---
to: "../packages/nefrolink-base/queries/<%- collection %>Queries.js"
---
import { getFirestore, collection, where, query } from 'firebase/firestore'
import { FireCollection } from 'nextbone-firestore'
import { timestampConverter } from '../firebaseUtils.js'

const db = getFirestore()

export class <%- h.capitalize(collection) %>Query extends FireCollection {
  query(ref, { paramValue }) {
    let result = ref
    // result = query(result, where('paramField', '==', paramValue))
   
    return result
  }

  ref({ customerId }) {
    if (customerId) {
      return collection(db, `customers/${this.customerId}/<%- collection %>`).withConverter(
        timestampConverter
      )
    }
  }
}