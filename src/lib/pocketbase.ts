import PocketBase from "pocketbase";
import type { Record } from "pocketbase";

import { writable } from "svelte/store";

const pb = new PocketBase("https://choppy.pro:443")

const currentUser = writable(pb.authStore.model);

pb.authStore.onChange((auth) => {
    console.log("authStore changed", auth);
    currentUser.set(pb.authStore.model);
});

export { PocketBase, Record, pb, currentUser }
