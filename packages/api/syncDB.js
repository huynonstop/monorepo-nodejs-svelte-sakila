import { sync as syncActor } from "./actor/actor.model.js";
import { sync as syncCustomer } from "./customer/customer.model.js";

export default Promise.all([syncActor(), syncCustomer()]);
