import PocketBase from "pocketbase";

import { writable } from "svelte/store";

export const pb = new PocketBase("https://choppy.pro:443")

export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange((auth) => {
    console.log("authStore changed", auth);
    currentUser.set(pb.authStore.model);
});

export enum DashboardViews {
    Jobs,
    Printers,
    Account
};

export enum LoginViews {
    Login,
    Signup,
    Forgot
};